import {
  pgTable,
  integer,
  text,
  smallserial,
  serial,
  date,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: smallserial("id").primaryKey(),
  email: text().unique().notNull(),
  name: text(),
  password: text().notNull(),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text().notNull(),
  type: text().notNull(),
  salary: integer().notNull(),
  description: text().notNull(),
  skills: text().notNull(),
  picture: text(),
  date: date("date").notNull(),
  userId: smallserial("user_id").references(() => users.id),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  name: text().notNull(),
  email: text().notNull(),
  photo: text(),
  cv: text().notNull(),
  jobId: integer("job_id").references(() => jobs.id),
});
