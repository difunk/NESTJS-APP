// src/data-source.ts
import "reflect-metadata"; // Crucial for TypeORM entities/decorators
import { DataSource, DataSourceOptions } from "typeorm";
import * as path from "path";
import * as dotenv from "dotenv"; // If you're using .env files for config

dotenv.config(); // Load environment variables from .env

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
console.log(
  "Using production config:",
  process.env.NODE_ENV === "production" && process.env.DATABASE_URL
);

export const dataSourceOptions: DataSourceOptions = process.env.DATABASE_URL
  ? {
      // PostgreSQL config
      type: "postgres",
      url: process.env.DATABASE_URL,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
      entities: [path.join(__dirname, "/**/*.entity{.ts,.js}")],
      migrations: [path.join(__dirname, "/migrations/*.{ts,.js}")],
      synchronize: process.env.NODE_ENV !== "production", // Auto-sync in development only
      logging: true,
    }
  : {
      // SQLite config for development
      type: "sqlite",
      database: "database.sqlite",
      entities: [path.join(__dirname, "/**/*.entity{.ts,.js}")],
      migrations: [path.join(__dirname, "/migrations/*.{ts,.js}")],
      synchronize: true, // Auto-sync in development only
      logging: true,
    };

console.log("Using database type:", dataSourceOptions.type);

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
