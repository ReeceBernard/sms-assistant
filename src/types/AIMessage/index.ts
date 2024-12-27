export interface AIMessage {
  body: string;
  from: string;
  to: string;
  timestamp: Date;
}

export interface ProviderConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
}

export interface AIResponse {
  text: string;
  tokens: number;
  model: string;
  provider: string;
  toolCalls?: ToolCall[];
}

export interface ToolCall {
  id: string;
  type: string;
  params: Record<string, any>;
}
