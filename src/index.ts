import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"
import { logger } from 'hono/logger'
import { csrf } from 'hono/csrf'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { HTTPException } from 'hono/http-exception'
import { rateLimiter } from "hono-rate-limiter";
import { jwt } from 'hono/jwt';
import { readFile } from 'fs/promises';

import { userRouter } from './users/user.router'
import { authRouter } from './auth/auth.router'
import { testimonialRouter } from './testimonials/testimonial.router'
import { updateRouter } from './updates/update.router'

const app = new Hono()

// rate limiter
const limiter = rateLimiter({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 10, // Limit each IP to 10 requests per minute
  standardHeaders: "draft-6",
  keyGenerator: (c) => "<unique_key>",
});

//default routes
app.get('/', async (c) => {
    try {
        let html = await readFile('./index.html', 'utf-8');
        return c.html(html);
    } catch (err:any) {
        return c.text(err.message, 500);
    }
});

// middlewares
app.use(logger())
app.use(csrf())
app.use(trimTrailingSlash())
app.use(limiter)

// JWT Middleware for authentication
app.use('/api/*', jwt({
  secret: process.env.JWT_SECRET as string,
}));

// Routes
app.route("/", userRouter)        // User management
app.route("/", testimonialRouter) // Testimonials management
app.route("/", updateRouter)      // Updates management
app.route("/auth", authRouter)    // Authentication

// Default route for unmatched paths
app.all('*', (c) => {
  return c.text('Page not found', 404)
})

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT)
})

console.log(`Server is running on port ${process.env.PORT}`)