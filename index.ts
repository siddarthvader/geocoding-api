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

const ROOT_FOLDER = path.join(__dirname, "..");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/public", express.static(path.join(ROOT_FOLDER, "public")));

app.options("*", cors());

const options = {
  customCssUrl: "/public/swagger-ui.css",
  customSiteTitle: "Batch GeoCoding API - Swagger",
};

app.post("/batch-geocode", batchGeocoding);

app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(swaggerDocument, options));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
