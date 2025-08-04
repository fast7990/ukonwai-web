export interface AIChatParams {
  model: string
  max_tokens?: number
  stream?: boolean
  systemPrompt?: string
  messages: {
    role: string
    content: string
  }[]
}
export interface AIChatMessage {
  id: string
  role: string
  content: string
}