// API Provider interface — Phase 5 implementation.
// Each provider streams completion responses.

export interface APIProvider {
  name: string
  models: string[]
  complete(
    prompt: string,
    model: string,
    onChunk: (text: string) => void,
  ): Promise<string>
}

// Stub provider for Phase 0-4 (no API calls yet)
export class StubProvider implements APIProvider {
  name = 'stub'
  models = ['stub-model']

  async complete(
    _prompt: string,
    _model: string,
    _onChunk: (text: string) => void,
  ): Promise<string> {
    throw new Error('API providers not yet configured (Phase 5). Use Copy to paste into Cline.')
  }
}
