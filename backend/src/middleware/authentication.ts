import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export interface Bindings {
    DATABASE_URL: string,
    JWT_SECRET: string,
}

// middleware for authentication
export async function authenticationMiddleware(c: Context, next: Next) {
    const token = c.req.header('Authorization');
    console.log('middleware is hit');
    try {
        if (!token) {
            c.status(400);
            return c.json({ msg: "error unauthorized , empty token is sent signin once again" });
        }
        const jwt = token.split(' ')[1];

        const payload = await verify(jwt, c.env.JWT_SECRET);

        if (!payload) {
            c.status(400);
            return c.json({ msg: "error unauthorized , token is expired or invalid" });
        }
        console.log("UserId", payload.UserId);
        await next();
    } catch (error) {
        return c.json({
            msg: "Authentication is failed",
        });
    }
}
