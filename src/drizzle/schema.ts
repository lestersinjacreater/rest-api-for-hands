import { pgTable, serial, varchar, timestamp, integer, boolean, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Role Enum
export const roleEnum = pgEnum("role", ["admin", "user", "superuser"]);

// Users Table
export const UsersTable = pgTable('users', {
  userid: serial('userid').primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }).notNull().default(''),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Auth Table
export const AuthTable = pgTable('auth', {
  authid: serial('authid').primaryKey(),
  userid: integer('user_id').references(() => UsersTable.userid, { onDelete: "cascade" }),
  password: varchar('password', { length: 255 }).notNull(),
  role: roleEnum('role').default('user'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Testimonials Table
export const TestimonialsTable = pgTable('testimonials', {
  testimonialid: serial('testimonialid').primaryKey(),
  userId: integer('user_id').references(() => UsersTable.userid),
  text: varchar('text', { length: 1000 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Updates Table
export const UpdatesTable = pgTable('updates', {
  updateid: serial('updateid').primaryKey(),
  userId: integer('user_id').references(() => UsersTable.userid),
  content: varchar('content', { length: 500 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const usersRelations = relations(UsersTable, ({ one, many }) => ({
  auth: one(AuthTable, {
    fields: [UsersTable.userid],
    references: [AuthTable.userid],
  }),
  testimonials: many(TestimonialsTable),
  updates: many(UpdatesTable),
}));

export const authRelations = relations(AuthTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [AuthTable.userid],
    references: [UsersTable.userid],
  }),
}));

// Types
export type TIUser = typeof UsersTable.$inferInsert;
export type TSUser = typeof UsersTable.$inferSelect;

export type TIAuth = typeof AuthTable.$inferInsert;
export type TSAuth = typeof AuthTable.$inferSelect;

export type TITestimonial = typeof TestimonialsTable.$inferInsert;
export type TSTestimonial = typeof TestimonialsTable.$inferSelect;

export type TIUpdate = typeof UpdatesTable.$inferInsert;
export type TSUpdate = typeof UpdatesTable.$inferSelect;