import { AnthropicProvider } from "@/services/ai-service/providers/anthropic/anthropic-ai-provider";
import { RequestBody } from "@/types";
import { Response } from "express";
import twilio from "twilio";

const askClaudeHandler = async (
  req: RequestBody<{ from: string; message: string }>,
  res: Response
) => {
  console.log("Handling SMS");
  try {
    const anthropic = new AnthropicProvider();
    const twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    // Get message details from Twilio request
    const incomingMessage = req.body.message;
    const fromNumber = req.body.from;

    // Get response from Claude
    const completion = await anthropic.generateResponse({
      messages: [{ role: "user", content: incomingMessage }],
      config: {
        model: "claude-3-sonnet-20240229",
        maxTokens: 1024,
        temperature: 0.5,
        systemPrompt:
          "You are a virtual assistant who receives text messages from a user and responds with text messages.",
      },
    });

    const responseText = completion.text;

    // Send Claude's response back via Twilio

    await twilioClient.messages.create({
      body: responseText,
      to: fromNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    // Send TwiML response to Twilio
    const twiml = new twilio.twiml.MessagingResponse();
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  } catch (error) {
    console.error("Error handling SMS:", error);
    res.status(500).send("Error processing message");
  }
};

export default askClaudeHandler;
