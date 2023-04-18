"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const batch_geocodig_1 = __importDefault(require("./routes/batch-geocodig"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const app = (0, express_1.default)();
const port = process.env.SERVER_PORT;
dotenv_1.default.config();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static("public"));
app.options("*", (0, cors_1.default)());
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: path_1.default.join(__dirname, "public") });
});
app.post("/batch-geocode", batch_geocodig_1.default);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
exports.default = app;
