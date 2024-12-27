import dotenv from "dotenv";
import express from "express";
import webhookRouter from "./routes/webhooks";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/webhook", webhookRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
