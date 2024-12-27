import { NextFunction, Request, Response } from "express";
import twilio from "twilio";

export const validateSNSRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const twilioSignature = req.headers["x-twilio-signature"] as string;
  const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  console.log("Validating SNS request", twilioSignature, url, req.body);

  const isValid = twilio.validateRequest(
    process.env.TWILIO_AUTH_TOKEN!,
    twilioSignature,
    url,
    req.body
  );

  if (isValid) {
    next();
  } else {
    console.error("Invalid SNS signature");
    res.status(403).json({ error: "Invalid SNS signature" });
  }
};
