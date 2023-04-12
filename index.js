import express from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.use(cors());

app.post("/batch-geocode", async (req, res) => {
  console.log("req.body is..", req.body);
  const { geo_locations } = req.body;

  // console.log("geo_locations are...", geo_locations);
  const geojson = await prisma.geojson.findMany({
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
  res.json(geojson);
});

app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000")
);
