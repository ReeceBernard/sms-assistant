import { AIResponse, ProviderConfig } from "@/types/AIMessage";
import Anthropic from "@anthropic-ai/sdk";
import { MessageParam } from "@anthropic-ai/sdk/resources";

export const Claude35Sonnet = "claude-3-5-sonnet-20240620";

export class AnthropicProvider {
  private client: Anthropic;
  private defaultMaxTokens = 1024;

  constructor() {
    this.client = new Anthropic(); // DEFAULT USES ENV VARS;
  }

  async generateResponse({
    messages,
    config,
  }: {
    messages: MessageParam[];
    config: ProviderConfig;
  }): Promise<AIResponse> {
    const response = await this.client.messages.create({
      messages,
      model: config.model,
      temperature: config.temperature,
      max_tokens: config.maxTokens ?? this.defaultMaxTokens,
      system: config.systemPrompt,
    });

    const content = response.content[0];
    let message = "";
    switch (content.type) {
      case "text":
        message = content.text;
        break;
      default:
        throw new Error("Unsupported response type");
    }

    return {
      text: message,
      tokens: response.usage.output_tokens,
      model: config.model,
      provider: "anthropic",
    };
  }
}
