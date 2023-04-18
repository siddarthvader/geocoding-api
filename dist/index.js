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
const ROOT_FOLDER = path_1.default.join(__dirname, "..");
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/public", express_1.default.static(path_1.default.join(ROOT_FOLDER, "public")));
app.options("*", (0, cors_1.default)());
const options = {
    customCssUrl: "/public/swagger-ui.css",
    customSiteTitle: "Batch GeoCoding API - Swagger",
};
app.post("/batch-geocode", batch_geocodig_1.default);
app.use("/", swagger_ui_express_1.default.serve);
app.get("/", swagger_ui_express_1.default.setup(swagger_json_1.default, options));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
exports.default = app;
