"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
exports.dataSourceOptions = {
    type: (process.env.DB_TYPE || "sqlite"),
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USERNAME || "user",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "database.sqlite",
    entities: [path.join(__dirname, "/**/*.entity{.ts,.js}")],
    migrations: [path.join(__dirname, "/database/migrations/*.{ts,.js}")],
    synchronize: false,
    logging: true,
};
const AppDataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = AppDataSource;
//# sourceMappingURL=data-source.js.map