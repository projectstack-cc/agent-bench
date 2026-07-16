#!/usr/bin/env python3
"""
CEO Prompt Assembler
====================
Builds agent prompts from your Obsidian vault for paste into Cline.

USAGE:
    python ceo.py --task "Build login page" --agent frontend --project tapin
    python ceo.py --task "Research QR apps" --agent research --copy
    python ceo.py --task "Review code" --agent qa-critic --input-file Card.tsx --project tapin

CONFIG:
    Edit VAULT_PATH below to match your Obsidian vault location.
"""

import argparse
import json
import os
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from typing import List, Optional

# =============================================================================
# HARDCODED CONFIGURATION
# =============================================================================

VAULT_PATH = Path(r"C:\Users\scook\OneDrive\Documents\Obsidian Vault")
AGENTS_DIR = VAULT_PATH / "Agents"
PROJECTS_DIR = VAULT_PATH / "Projects"
PROMPTS_DIR = VAULT_PATH / "Prompts"

# ERP Firewall
ERP_PROJECT_NAME = "xpanda-ops-platform"
ERP_AGENT_PREFIXES = ["xpanda-", "erp-"]

# Challenge triggers
CHALLENGE_KEYWORDS = [
    "rewrite everything", "start over", "scrap it", "burn it down",
    "6 month", "6-month", "massive refactor", "full redesign",
    "just use ai", "ai will handle it", "skip tests", "skip auth",
    "no one will notice", "temporary fix", "quick and dirty",
]

# =============================================================================


class CEOAssembler:
    def __init__(self):
        self.vault = VAULT_PATH.resolve()
        self.timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

        if not self.vault.exists():
            print(f"[ERROR] Vault not found: {self.vault}")
            print("Edit VAULT_PATH in ceo.py to match your Obsidian vault location.")
            sys.exit(1)

        PROMPTS_DIR.mkdir(parents=True, exist_ok=True)

    def list_agents(self) -> List[str]:
        agents = []
        if AGENTS_DIR.exists():
            for f in AGENTS_DIR.glob("*.md"):
                agents.append(f.stem)
        return sorted(agents)

    def list_projects(self) -> List[str]:
        projects = []
        if PROJECTS_DIR.exists():
            for d in PROJECTS_DIR.iterdir():
                if d.is_dir():
                    projects.append(d.name)
        return sorted(projects)

    def load_agent(self, agent_name: str) -> Optional[str]:
        agent_file = AGENTS_DIR / f"{agent_name}.md"
        if not agent_file.exists():
            return None
        return agent_file.read_text(encoding="utf-8")

    def load_project_context(self, project_name: str) -> str:
        project_dir = PROJECTS_DIR / project_name
        if not project_dir.exists():
            return ""

        context_parts = []

        for filename in ["prd.md", "api-contract.md", "decisions.md", "conventions.md", "README.md"]:
            f = project_dir / filename
            if f.exists():
                label = filename.replace(".md", "").replace("-", " ").title()
                content = f.read_text(encoding="utf-8")
                context_parts.append(f"## {label}\n{content}")

        return "\n\n".join(context_parts)

    def check_firewall(self, agent_name: str, project_name: str) -> tuple[bool, str]:
        is_erp_project = ERP_PROJECT_NAME.lower() in project_name.lower()
        is_erp_agent = any(agent_name.lower().startswith(p) for p in ERP_AGENT_PREFIXES)

        if is_erp_project and not is_erp_agent:
            return False, (
                f"[BLOCKED] '{agent_name}' cannot access ERP project '{project_name}'.\n"
                f"Use an ERP agent (xpanda-*) or choose a non-ERP project."
            )

        if is_erp_agent and not is_erp_project:
            return False, (
                f"[BLOCKED] ERP agent '{agent_name}' is restricted to ERP projects.\n"
                f"Use a general agent for '{project_name}'."
            )

        return True, ""

    def check_challenges(self, task: str) -> List[str]:
        challenges = []
        task_lower = task.lower()

        for keyword in CHALLENGE_KEYWORDS:
            if keyword in task_lower:
                challenges.append(f"Triggered: '{keyword}'")

        return challenges

    def build_prompt(self, agent_name: str, task: str, project_name: str,
                     input_file: Optional[str] = None) -> str:

        agent_def = self.load_agent(agent_name)
        if not agent_def:
            available = ", ".join(self.list_agents())
            return f"[ERROR] Agent '{agent_name}' not found. Available: {available}"

        project_ctx = self.load_project_context(project_name) if project_name != "general" else ""

        input_content = ""
        if input_file:
            input_path = Path(input_file)
            if input_path.exists():
                input_content = f"\n## Input\n```\n{input_path.read_text(encoding='utf-8')}\n```"
            else:
                input_content = f"\n[WARNING] File not found: {input_file}"

        parts = [
            f"# CEO Dispatch",
            f"**Agent:** {agent_name}",
            f"**Project:** {project_name}",
            f"**Task:** {task}",
            f"**Time:** {self.timestamp}",
            "",
            "---",
            "",
            "# Agent Definition",
            agent_def,
        ]

        if project_ctx:
            parts.extend([
                "",
                "---",
                "",
                "# Project Context",
                project_ctx,
            ])

        if input_content:
            parts.extend([
                "",
                "---",
                "",
                input_content,
            ])

        parts.extend([
            "",
            "---",
            "",
            "# Your Task",
            task,
            "",
            "Execute per your agent definition. Deliver the specified output.",
        ])

        return "\n".join(parts)

    def copy_to_clipboard(self, text: str):
        """Copy text to Windows clipboard."""
        try:
            subprocess.run(["powershell", "-command", f"Set-Clipboard -Value @'{text}@'"], 
                         check=True, capture_output=True)
            return True
        except Exception:
            # Fallback: try clip.exe with echo
            try:
                subprocess.run(["cmd", "/c", "echo", text], 
                             stdout=subprocess.PIPE)
                return True
            except Exception:
                return False

    def run(self, task: str, agent_name: str, project_name: str = "general",
            input_file: Optional[str] = None, output_file: Optional[str] = None,
            copy: bool = False, no_challenge: bool = False):

        print("=" * 50)
        print("CEO PROMPT ASSEMBLER")
        print("=" * 50)
        print(f"Agent:  {agent_name}")
        print(f"Project: {project_name}")
        print(f"Task:   {task[:60]}{'...' if len(task) > 60 else ''}")
        print("=" * 50)
        print()

        # Validate agent
        available = self.list_agents()
        if agent_name not in available:
            print(f"[ERROR] Agent '{agent_name}' not found.")
            print(f"Available: {', '.join(available)}")
            return

        # Firewall
        allowed, msg = self.check_firewall(agent_name, project_name)
        if not allowed:
            print(msg)
            return

        # Challenges
        challenges = self.check_challenges(task)
        if challenges and not no_challenge:
            print("[CHALLENGE DETECTED]")
            for c in challenges:
                print(f"  - {c}")
            print()
            resp = input("Continue? (yes/no): ")
            if resp.lower() != "yes":
                print("Aborted.")
                return
            print()

        # Build prompt
        prompt = self.build_prompt(agent_name, task, project_name, input_file)

        # Output
        if output_file:
            out_path = PROMPTS_DIR / output_file
            out_path.write_text(prompt, encoding="utf-8")
            print(f"[OK] Prompt written: {out_path}")
            print(f"     Size: {len(prompt):,} chars")
        else:
            # Default: write to timestamped file
            default_file = PROMPTS_DIR / f"prompt-{self.timestamp}-{agent_name}.md"
            default_file.write_text(prompt, encoding="utf-8")
            print(f"[OK] Prompt written: {default_file}")
            print(f"     Size: {len(prompt):,} chars")

        # Copy to clipboard
        if copy:
            if self.copy_to_clipboard(prompt):
                print("[OK] Copied to clipboard")
            else:
                print("[WARN] Could not copy to clipboard. Prompt saved to file.")

        print()
        print("Paste into Cline and run.")


def main():
    parser = argparse.ArgumentParser(
        description="CEO Prompt Assembler - Build agent prompts for Cline",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
EXAMPLES:
    python ceo.py -t "Build login page" -a frontend -p tapin
    python ceo.py -t "Research QR apps" -a research --copy
    python ceo.py -t "Review code" -a qa-critic -i Card.tsx -p tapin
    python ceo.py -t "Design mechanic" -a ue-dev -p tiny-world -o my-prompt.md

FLAGS:
    -t, --task        The task to dispatch (required)
    -a, --agent       Agent to use (required)
    -p, --project     Project context (default: general)
    -i, --input-file  File to include as input context
    -o, --output-file Custom output filename (saved to Prompts/)
    --copy            Copy prompt to clipboard
    --no-challenge    Skip challenge prompts
    --list-agents     List available agents
    --list-projects   List available projects
        """
    )
    parser.add_argument("-t", "--task", help="Task to dispatch")
    parser.add_argument("-a", "--agent", help="Agent to route to")
    parser.add_argument("-p", "--project", default="general", help="Project context")
    parser.add_argument("-i", "--input-file", help="Input file for context")
    parser.add_argument("-o", "--output-file", help="Custom output filename")
    parser.add_argument("--copy", action="store_true", help="Copy to clipboard")
    parser.add_argument("--no-challenge", action="store_true", help="Skip challenges")
    parser.add_argument("--list-agents", action="store_true", help="List agents")
    parser.add_argument("--list-projects", action="store_true", help="List projects")

    args = parser.parse_args()

    ceo = CEOAssembler()

    if args.list_agents:
        print("Agents:")
        for a in ceo.list_agents():
            print(f"  - {a}")
        return

    if args.list_projects:
        print("Projects:")
        for p in ceo.list_projects():
            print(f"  - {p}")
        return

    if not args.task or not args.agent:
        parser.print_help()
        return

    ceo.run(
        task=args.task,
        agent_name=args.agent,
        project_name=args.project,
        input_file=args.input_file,
        output_file=args.output_file,
        copy=args.copy,
        no_challenge=args.no_challenge,
    )


if __name__ == "__main__":
    main()
