import { Hono } from "hono";
import { Bindings } from "../middleware/authentication";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
export const DietRouter = new Hono<{
    Bindings: Bindings
}>()



DietRouter.get("/alldiets", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const alldiets = await prisma.diet.findMany({
            where: { id: { not: 6 } }
        });
        c.status(200);
        return c.json({
            msg: "success",
            alldiets: alldiets
        })
    } catch (error) {
        console.error(error);
        c.status(400);
        return c.json({
            msg: "unexpected error"
        });

    }
});