import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import dotenv from "dotenv";

import path from "path";
import swaggerUi from "swagger-ui-express";

import batchGeocoding from "./routes/batch-geocodig";

import swaggerDocument from "./swagger.json";

const app: Express = express();
const port = process.env.SERVER_PORT;

dotenv.config();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

app.options("*", cors());

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

app.post("/batch-geocode", batchGeocoding);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
