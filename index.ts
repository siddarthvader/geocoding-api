import express from "express";

import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { z } from "zod";
import { Prisma, PrismaClient } from "@prisma/client";

const t = initTRPC.create();
const prisma = new PrismaClient();

interface ChatMessage {
  user: string;
  message: string;
}

const messages: ChatMessage[] = [
  { user: "user1", message: "Hello" },
  { user: "user2", message: "Hi" },
];

const appRouter = t.router({
  batchGeoCode: t.procedure
    .input((val: unknown) => {
      if (Array.isArray(val)) {
        return val;
      }
      throw new Error("Invalid input Type");
    })
    .query(async (req) => {
      const { input } = req;
      const geojson = await prisma.geojson.findMany({
        where: {
          iso_name: {
            in: input,
          },
        },
      });

      return geojson;
    }),
});

export type AppRouter = typeof appRouter;

const app = express();
app.use(cors());
const port = 8080;

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from api-server");
});

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
