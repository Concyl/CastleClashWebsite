import {pgTable, text, uuid} from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt,userId } from "../schemaHelper"
import { UserTable } from "./user"
import { relations } from "drizzle-orm"

export const GearTable = pgTable("gear",{
    id,
    name: text().notNull(),
    userId: userId().notNull(),
    createdAt,
    updatedAt
})

export const GearRelationships = relations(GearTable, ({ one }) => ({
    user: one(UserTable, {
        fields: [GearTable.userId],
        references: [UserTable.id],
        relationName: "user_gear_relation"
    }),
}));