"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const rawgeojson = __importStar(require("./../data/countries.json"));
const prisma = new client_1.PrismaClient();
const data = (_a = rawgeojson === null || rawgeojson === void 0 ? void 0 : rawgeojson.features) === null || _a === void 0 ? void 0 : _a.map((f) => {
    var _a, _b;
    return {
        iso_name: ((_a = f === null || f === void 0 ? void 0 : f.properties) === null || _a === void 0 ? void 0 : _a.ISO_A3) || "",
        full_name: ((_b = f === null || f === void 0 ? void 0 : f.properties) === null || _b === void 0 ? void 0 : _b.ADMIN) || "",
        geojson: f.geometry !== null ? f.geometry : client_1.Prisma.JsonNull,
        created_at: new Date(),
        updated_at: new Date(),
    };
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.geojson.createMany({ data, skipDuplicates: true });
    });
}
main()
    .catch((e) => {
    console.log(e);
    process.exit(1);
})
    .finally(() => {
    prisma.$disconnect();
});
