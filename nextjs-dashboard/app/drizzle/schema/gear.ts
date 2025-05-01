import {pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../schemaHelper"


export const GearTable = pgTable("gear",{
    id,
    name: text().notNull(),
    createdAt,
    updatedAt
})