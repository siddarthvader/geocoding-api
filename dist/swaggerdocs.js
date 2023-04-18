"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Batch GeoCoding Express API",
            version: "0.1.0",
            description: "An API giving your geojson data for geolocations (ISO:3166 supported)",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "SIddharth",
                url: "https://siddharthjain.in",
                email: "me@siddharthjain.in",
            },
        },
        servers: [
            {
                url: "https://www.geocoding-api.vercel.app",
            },
        ],
    },
    apis: ["/index.ts"],
};
exports.default = options;
