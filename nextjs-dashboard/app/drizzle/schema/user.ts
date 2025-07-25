import { pgEnum, pgTable, text ,timestamp} from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../schemaHelper"
import { relations } from "drizzle-orm"
import { GearTable } from "./gear"

export const userRoles = ["user","admin"] as const
export type UserRole = (typeof userRoles)[number]
export const userRoleEnum = pgEnum("user_role", userRoles)

export const UserTable = pgTable("users", {
    id,
    clerkUserId: text().notNull().unique(),
    email: text().notNull(),
    name : text().notNull(),
    role: userRoleEnum().notNull().default("user"),
    deletedAt: timestamp({withTimezone: true}),
    createdAt,
    updatedAt
})

export const UserRelationships = relations(UserTable, ({many}) => ({
    gear: many(GearTable,{
        relationName: "user_gear_relation",
    }),
}))