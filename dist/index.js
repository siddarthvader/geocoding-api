"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const port = process.env.SERVER_PORT;
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static("public"));
app.options("*", (0, cors_1.default)());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.get("/", (req, res) => {
    // res.sendFile("index.html", { root: path.join(__dirname, "public") });
    res.json({ message: "hello world" });
});
app.post("/batch-geocode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.body is..", req.body);
    const { geo_locations } = req.body;
    // console.log("geo_locations are...", geo_locations);
    const geojson = yield prisma.geojson.findMany({
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
    // res.header("Access-Control-Allow-Origin", "*");
    res.status(200);
    res.json(geojson);
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
exports.default = app;
