import { PrismaClient, geojson } from "@prisma/client";

import { Request, Response } from "express";

const prisma = new PrismaClient();

type BatchGeocodeReq = {
  geo_locations: string[];
};

type BatchGeocodeRes = geojson[];

export default async function (
  req: Request<BatchGeocodeReq>,
  res: Response<BatchGeocodeRes>
) {
  console.log("req.body is..", req.body);
  const { geo_locations } = req.body;

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

  res.status(200);
  res.json(geojson);
}
