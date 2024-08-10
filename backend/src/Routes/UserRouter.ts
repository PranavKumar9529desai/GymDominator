import { Hono } from "hono"
import { Bindings } from "../middleware/authentication";
import { signinInput, SigninInput, signupInput, SignupInput } from "../zod/types";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "hono/adapter";
import { jwt, sign, verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";
export const UserRouter = new Hono<{
    Bindings: Bindings
}>();

UserRouter.get('/pranav', (c) => {
    return c.json({ msg: "you have reuested the user route" });
});

UserRouter.post('signup', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate())
        //  we check if it of does it have nice zod types
        const body: signupInput = await c.req.json();
        console.log(body);
        const isValidPayload = SignupInput.safeParse(body);
        if (!isValidPayload) {
            c.status(500);
            return c.json({ msg: "wrong input format" });
        }
        const newUser = await prisma.user.create({
            data: {
                name: body.username,
                email: body.email,
                password: body.password
            }
        });
        console.log(newUser);
        const payload = { jwttoken: body.email };
        console.log("the secret is ", c.env?.JWT_SECRET);
        const token = await sign(payload, c.env.JWT_SECRET);
        console.log("toeke is :", token);
        return c.json({ msg: "Success", token: token });

    } catch (error) {
        console.log(error);
        c.status(400);
        return c.json({ msg: "error" })
    }
});



UserRouter.post('signin', async (c) => {
    try {
        console.log("signin reuest ");
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate())
        //  we check if it of does it have nice zod types
        const body: signinInput = await c.req.json();
        console.log(body);
        const isValidPayload = SigninInput.safeParse(body);
        console.log("the secret is ", c.env?.JWT_SECRET);
        if (!isValidPayload) {
            c.status(500);
            return c.json({ msg: "wrong input format" });
        }
        const payload = { jwttoken: body.email };
        let token = await sign(payload, c.env.JWT_SECRET);

        const isUserexist = await prisma.user.findFirst({
            where: { email: body.email }
        });

        if (!isUserexist) {
            c.status(300);
            return c.json({ msg: "user doesn't exist " });
        }

        if (isUserexist.password == body.password) {
            c.status(200);
            return c.json({ msg: "sucess", token: token });
        }

        else {
            c.status(300);
            return c.json({ msg: "password is wrong" })
        }

    } catch (error) {
        console.log(error);
        c.status(400);
        return c.json({ msg: "error" })
    }
});


