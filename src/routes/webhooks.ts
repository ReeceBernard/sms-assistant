import { validateSNSRequest } from "@/middleware/middleware";
import { Router } from "express";
import askClaudeHandler from "../api-handlers/askClaude";

const webhookRouter = Router();

webhookRouter.post("/sms", validateSNSRequest, askClaudeHandler);

export default webhookRouter;
