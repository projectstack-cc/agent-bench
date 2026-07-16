#!/usr/bin/env python3
"""
Obsidian Vault Scraper Agent
==============================
Read-only. Constrained. Auditable.

PURPOSE:
    Recursively scan a source directory (e.g., ~/.dev/) for .md files and
    memory files, then copy them into a structured Obsidian vault organized
    by project. Zero write access to source. Dry-run by default.

SAFETY LOCKS (hardcoded, non-configurable):
    - READ_ONLY_MODE: True (source is never modified)
    - ALLOWED_EXTENSIONS: {'.md'}
    - MAX_FILE_SIZE_MB: 5
    - EXCLUDED_DIRS: {'.git', 'node_modules', '.next', 'dist', 'build', 
                      'coverage', '.vercel', '.turbo', '.cache', 'venv', 
                      '.venv', '__pycache__', '.pytest_cache', '.idea', 
                      '.vscode', 'out', '.svelte-kit'}
    - EXCLUDED_FILE_PATTERNS: {'package-lock', 'yarn.lock', 'pnpm-lock',
                               '.env', 'secrets', 'private_key', 'token'}
    - MEMORY_FILE_PATTERNS: {'memory', 'memories', 'session_memory', 
                             'chat_history', 'conversations'}
    - DRY_RUN: True (must explicitly set to False to execute)

USAGE:
    python obsidian_scraper.py --source ~/.dev --vault ~/Obsidian/Vault --execute

OUTPUT:
    - Structured vault: Vault/ProjectName/path/to/file.md
    - Manifest: Vault/.scraper/manifest_YYYYMMDD_HHMMSS.json
    - Log: Vault/.scraper/log_YYYYMMDD_HHMMSS.txt
"""

import argparse
import hashlib
import json
import logging
import os
import shutil
import sys
from datetime import datetime
from pathlib import Path
from typing import Set, List, Dict, Any

# =============================================================================
# HARD-CODED SAFETY CONSTRAINTS (modify only by editing this script)
# =============================================================================

READ_ONLY_MODE = True  # Source filesystem is NEVER modified
ALLOWED_EXTENSIONS: Set[str] = {'.md'}
MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB

EXCLUDED_DIRS: Set[str] = {
    '.git', 'node_modules', '.next', 'dist', 'build', 'coverage',
    '.vercel', '.turbo', '.cache', 'venv', '.venv', '__pycache__',
    '.pytest_cache', '.idea', '.vscode', 'out', '.svelte-kit',
    '.serverless', '.parcel-cache', '.nuxt', '.output'
}

EXCLUDED_FILE_PATTERNS: Set[str] = {
    'package-lock', 'yarn.lock', 'pnpm-lock', '.env', '.env.local',
    '.env.production', '.env.development', 'secrets', 'private_key',
    'token', 'api_key', 'password', 'credential', 'id_rsa', 'id_ed25519'
}

MEMORY_FILE_PATTERNS: Set[str] = {
    'memory', 'memories', 'session_memory', 'chat_history', 
    'conversations', 'memory_space', 'mem_space', 'agent_memory'
}

# Files that match memory patterns but aren't .md will be flagged for review
MEMORY_EXTENSIONS: Set[str] = {'.md', '.txt', '.json'}

# =============================================================================


class ObsidianScraper:
    def __init__(self, source: Path, vault: Path, dry_run: bool = True):
        self.source = source.resolve()
        self.vault = vault.resolve()
        self.dry_run = dry_run
        self.timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

        # Statistics
        self.stats = {
            "scanned_files": 0,
            "scanned_dirs": 0,
            "skipped_dirs": 0,
            "skipped_files_ext": 0,
            "skipped_files_size": 0,
            "skipped_files_pattern": 0,
            "memory_files_found": 0,
            "copied_files": 0,
            "errors": 0,
            "bytes_total": 0
        }

        self.manifest: List[Dict[str, Any]] = []
        self.errors: List[str] = []

        # Setup logging
        self._setup_logging()

    def _setup_logging(self):
        log_dir = self.vault / ".scraper"
        log_dir.mkdir(parents=True, exist_ok=True)

        log_file = log_dir / f"log_{self.timestamp}.txt"

        logging.basicConfig(
            level=logging.INFO,
            format='[%(asctime)s] %(levelname)s: %(message)s',
            handlers=[
                logging.FileHandler(log_file, mode='w'),
                logging.StreamHandler(sys.stdout)
            ]
        )
        self.logger = logging.getLogger(__name__)
        self.logger.info("=" * 60)
        self.logger.info("OBSIDIAN SCRAPER AGENT INITIALIZED")
        self.logger.info(f"Source: {self.source}")
        self.logger.info(f"Vault:  {self.vault}")
        self.logger.info(f"Mode:   {'DRY RUN (preview only)' if self.dry_run else 'EXECUTE (will copy files)'}")
        self.logger.info(f"Read-only source protection: {'ENABLED' if READ_ONLY_MODE else 'DISABLED'}")
        self.logger.info("=" * 60)

    def _should_exclude_dir(self, dir_path: Path) -> bool:
        """Check if directory should be skipped."""
        return dir_path.name in EXCLUDED_DIRS

    def _should_exclude_file(self, file_path: Path) -> bool:
        """Check if file should be skipped based on name patterns."""
        name_lower = file_path.name.lower()
        stem_lower = file_path.stem.lower()

        # Check excluded patterns
        for pattern in EXCLUDED_FILE_PATTERNS:
            if pattern in name_lower:
                return True

        # Check extension
        if file_path.suffix.lower() not in ALLOWED_EXTENSIONS:
            return True

        return False

    def _is_memory_file(self, file_path: Path) -> bool:
        """Detect if file is a memory/session file."""
        stem_lower = file_path.stem.lower()
        return any(pattern in stem_lower for pattern in MEMORY_FILE_PATTERNS)

    def _get_file_hash(self, file_path: Path) -> str:
        """Compute SHA-256 hash of file content."""
        h = hashlib.sha256()
        with open(file_path, 'rb') as f:
            for chunk in iter(lambda: f.read(8192), b''):
                h.update(chunk)
        return h.hexdigest()

    def _resolve_project_name(self, file_path: Path) -> str:
        """Determine project name from file path relative to source."""
        try:
            rel_path = file_path.relative_to(self.source)
            parts = rel_path.parts
            if len(parts) > 0:
                return parts[0]
            return "uncategorized"
        except ValueError:
            return "uncategorized"

    def _compute_dest_path(self, file_path: Path) -> Path:
        """Compute destination path in vault, organized by project."""
        project = self._resolve_project_name(file_path)

        try:
            rel_path = file_path.relative_to(self.source)
            # If first part is project name, use it; otherwise nest under project
            if len(rel_path.parts) > 1:
                sub_path = Path(*rel_path.parts[1:])
            else:
                sub_path = file_path.name
        except ValueError:
            sub_path = file_path.name

        # Memory files go to a special folder within project
        if self._is_memory_file(file_path):
            return self.vault / project / "_memory" / sub_path

        return self.vault / project / sub_path

    def scan(self):
        """Recursively scan source directory."""
        self.logger.info(f"Beginning scan of: {self.source}")

        if not self.source.exists():
            self.logger.error(f"Source directory does not exist: {self.source}")
            self.errors.append(f"Source missing: {self.source}")
            return

        for root, dirs, files in os.walk(self.source):
            root_path = Path(root)
            self.stats["scanned_dirs"] += 1

            # Filter out excluded directories in-place
            dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]
            skipped_dirs = [d for d in dirs if self._should_exclude_dir(root_path / d)]
            self.stats["skipped_dirs"] += len(skipped_dirs)

            for file_name in files:
                file_path = root_path / file_name
                self.stats["scanned_files"] += 1

                # Skip by pattern
                if self._should_exclude_file(file_path):
                    if file_path.suffix.lower() not in ALLOWED_EXTENSIONS:
                        self.stats["skipped_files_ext"] += 1
                    else:
                        self.stats["skipped_files_pattern"] += 1
                    continue

                # Skip by size
                try:
                    size = file_path.stat().st_size
                    if size > MAX_FILE_SIZE_BYTES:
                        self.logger.warning(f"SKIPPED (size): {file_path} ({size / 1024 / 1024:.1f} MB)")
                        self.stats["skipped_files_size"] += 1
                        continue
                except OSError as e:
                    self.logger.error(f"Cannot stat file: {file_path} - {e}")
                    self.errors.append(f"Stat error: {file_path}")
                    continue

                # Memory file detection
                is_memory = self._is_memory_file(file_path)
                if is_memory:
                    self.stats["memory_files_found"] += 1

                # Compute destination
                dest_path = self._compute_dest_path(file_path)

                # Build manifest entry
                entry = {
                    "source": str(file_path),
                    "destination": str(dest_path),
                    "project": self._resolve_project_name(file_path),
                    "is_memory": is_memory,
                    "size_bytes": size,
                    "hash": self._get_file_hash(file_path) if not self.dry_run else "dry_run",
                    "action": "copy" if not self.dry_run else "would_copy"
                }
                self.manifest.append(entry)

                if self.dry_run:
                    self.logger.info(f"[PREVIEW] {file_path} -> {dest_path}")
                else:
                    self._execute_copy(file_path, dest_path, size)

        self.logger.info(f"Scan complete. Scanned {self.stats['scanned_files']} files in {self.stats['scanned_dirs']} directories.")

    def _execute_copy(self, source: Path, dest: Path, size: int):
        """Execute the actual file copy."""
        try:
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, dest)
            self.stats["copied_files"] += 1
            self.stats["bytes_total"] += size
            self.logger.info(f"[COPIED] {source} -> {dest}")
        except Exception as e:
            self.logger.error(f"[ERROR] Failed to copy {source}: {e}")
            self.errors.append(f"Copy error: {source} -> {e}")
            self.stats["errors"] += 1

    def write_manifest(self):
        """Write JSON manifest of all operations."""
        manifest_dir = self.vault / ".scraper"
        manifest_dir.mkdir(parents=True, exist_ok=True)

        manifest_data = {
            "timestamp": self.timestamp,
            "source": str(self.source),
            "vault": str(self.vault),
            "dry_run": self.dry_run,
            "stats": self.stats,
            "errors": self.errors,
            "files": self.manifest
        }

        manifest_path = manifest_dir / f"manifest_{self.timestamp}.json"

        with open(manifest_path, 'w', encoding='utf-8') as f:
            json.dump(manifest_data, f, indent=2, ensure_ascii=False)

        self.logger.info(f"Manifest written: {manifest_path}")

    def print_summary(self):
        """Print final summary to console."""
        print("\n" + "=" * 60)
        print("SCAN SUMMARY")
        print("=" * 60)
        print(f"Mode:           {'DRY RUN (no files copied)' if self.dry_run else 'EXECUTE (files copied)'}")
        print(f"Source:         {self.source}")
        print(f"Vault:          {self.vault}")
        print(f"Directories:    {self.stats['scanned_dirs']}")
        print(f"Files scanned:  {self.stats['scanned_files']}")
        print(f"Files copied:   {self.stats['copied_files']}")
        print(f"Memory files:   {self.stats['memory_files_found']}")
        print(f"Skipped (ext):  {self.stats['skipped_files_ext']}")
        print(f"Skipped (size): {self.stats['skipped_files_size']}")
        print(f"Skipped (pat):  {self.stats['skipped_files_pattern']}")
        print(f"Skipped (dirs): {self.stats['skipped_dirs']}")
        print(f"Errors:         {self.stats['errors']}")
        print(f"Total bytes:    {self.stats['bytes_total']:,}")
        print("=" * 60)

        if self.dry_run:
            print("\n[!] DRY RUN COMPLETE. No files were copied.")
            print("    To execute, re-run with --execute flag.")
            print("=" * 60)


def main():
    parser = argparse.ArgumentParser(
        description="Obsidian Vault Scraper - Read-only markdown collector",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
EXAMPLES:
    # Preview what would be copied (default)
    python obsidian_scraper.py --source ~/.dev --vault ~/Obsidian/Vault

    # Execute the copy
    python obsidian_scraper.py --source ~/.dev --vault ~/Obsidian/Vault --execute

    # Custom source and vault
    python obsidian_scraper.py -s /path/to/repos -v /path/to/vault -x
        """
    )
    parser.add_argument(
        "--source", "-s",
        required=True,
        help="Source directory containing project repositories"
    )
    parser.add_argument(
        "--vault", "-v", 
        required=True,
        help="Target Obsidian vault directory"
    )
    parser.add_argument(
        "--execute", "-x",
        action="store_true",
        help="ACTUALLY COPY FILES. Without this, runs in dry-run mode."
    )

    args = parser.parse_args()

    source = Path(args.source).expanduser().resolve()
    vault = Path(args.vault).expanduser().resolve()
    dry_run = not args.execute

    # Safety: prevent source == vault
    if source == vault or vault in source.parents or source in vault.parents:
        print("ERROR: Source and vault cannot overlap. Aborting.")
        sys.exit(1)

    scraper = ObsidianScraper(source, vault, dry_run=dry_run)
    scraper.scan()
    scraper.write_manifest()
    scraper.print_summary()


if __name__ == "__main__":
    main()
