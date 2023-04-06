"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var countries_1 = require("../raw_geojson/countries");
// const prisma = new PrismaClient();
var data = countries_1.default.features.map(function (f) {
    var _a, _b;
    console.log(f);
    return {
        iso_name: ((_a = f === null || f === void 0 ? void 0 : f.properties) === null || _a === void 0 ? void 0 : _a.ISO_A3) || "",
        full_name: ((_b = f === null || f === void 0 ? void 0 : f.properties) === null || _b === void 0 ? void 0 : _b.ADMIN) || "",
        geojson: f.geometry,
        created_at: Date.now(),
        updated_at: Date
    };
});
// async function main() {
//   console.log(data);
//   await prisma.geojson.createMany({ data });
// }
// main()
//   .catch((e) => {
//     console.log(e);
//     process.exit(1);
//   })
//   .finally(() => {
//     prisma.$disconnect();
//   });
