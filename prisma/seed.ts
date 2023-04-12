import { Prisma, PrismaClient, geojson } from "@prisma/client";

import * as rawgeojson from "./../data/countries.json";

const prisma = new PrismaClient();

const data = rawgeojson?.features?.map((f) => {
  return {
    iso_name: f?.properties?.ISO_A3 || "",
    full_name: f?.properties?.ADMIN || "",
    geojson: f.geometry !== null ? f.geometry : Prisma.JsonNull,
    created_at: new Date(),
    updated_at: new Date(),
  };
});

async function main() {
  await prisma.geojson.createMany({ data, skipDuplicates: true });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
