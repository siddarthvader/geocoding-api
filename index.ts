import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import dotenv from "dotenv";
import { PrismaClient, geojson } from "@prisma/client";
import path from "path";
const app: Express = express();
const port = process.env.SERVER_PORT;

const prisma = new PrismaClient();

dotenv.config();

app.use(bodyParser.json());
app.use("*", cors());
app.use(express.static("public"));

app.options("/batch-geocode", cors());

// alright then

type BatchGeocodeReq = {
  geo_locations: string[];
};

type BatchGeocodeRes = geojson[];

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

app.post(
  "/batch-geocode",
  async (req: Request<BatchGeocodeReq>, res: Response<BatchGeocodeRes>) => {
    console.log("req.body is..", req.body);
    const { geo_locations } = req.body;

    // console.log("geo_locations are...", geo_locations);
    const geojson: geojson[] = await prisma.geojson.findMany({
      where: {
        OR: [
          {
            full_name: {
              in: geo_locations,
            },
          },
          { iso_name: { in: geo_locations } },
        ],
      },
    });

    // console.log("geojson is...", geojson);
    res.status(200);
    res.json(geojson);
  }
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
