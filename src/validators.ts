import { z } from 'zod';

// Auth schemas
export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export const registerUserSchema = z.object({
    username: z.string(),
    password: z.string(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    role: z.enum(["admin", "user", "superuser"]).default("user"),
});

// User schema
export const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    emailVerified: z.boolean().default(false),
    phoneVerified: z.boolean().default(false),
});

// Testimonial schema
export const testimonialSchema = z.object({
    userId: z.number(),
    text: z.string().min(1).max(1000),
});

// Update schema
export const updateSchema = z.object({
    userId: z.number(),
    content: z.string().min(1).max(500),
});
