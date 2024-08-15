import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Bindings } from "../middleware/authentication";
export const RecipesRouter = new Hono<{
    Bindings: Bindings
}>()


RecipesRouter.get("allrecipes", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const alldiets = await prisma.recipes.findMany({
            where: { id: { not: 6 } }
        });
        c.status(200);
        return c.json({
            msg: "success",
            allrecipes: alldiets
        })
    } catch (error) {
        console.error(error);
        c.status(400);
        return c.json({
            msg: "unexpected error"
        });

    }
});