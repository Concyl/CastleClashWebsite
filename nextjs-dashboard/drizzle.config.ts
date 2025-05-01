import {defineConfig} from "drizzle-kit"
import { env } from "./data/env/server"

export default defineConfig ({
    out: "./app/drizzle/migrations",
    schema: "./app/drizzle/schema.ts",
    strict: true,
    verbose: true,
    dialect: "postgresql",
    dbCredentials: {
        password: env.DB_PASSWORD,
        user: env.DB_USER,
        database: env.DB_NAME,
        host: env.DB_HOST,
        ssl: false
    }
})