import { Hono } from "hono";
import { Bindings } from "../middleware/authentication";
import { PrismaClient, MuscleGroupEnum } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { string } from "zod";

export const WorkoutsRouter = new Hono<{
    Bindings: Bindings
}>();

export interface MuscleGrp {
    name: string;
    img: string;
}

interface res {
    msg: string;
    muscleGrp: MuscleGrp[];
}

WorkoutsRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const MuscleGrp: MuscleGrp[] = await prisma.muscleGroup.findMany({
            where: { id: { not: 7 } },
            select: { name: true, img: true, Exercise: true }
        });
        // console.log(allWorkouts);
        c.status(200);
        return c.json({ msg: "success", muscleGrp: MuscleGrp });
    } catch (error) {
        c.status(400);
        console.log(error);
        return c.json({ msg: "error" });

    }
});

WorkoutsRouter.get('/:muscle', async (c) => {

    console.log("here is the rewew ");
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const muscle = c.req.param("muscle");
    console.log("muscle", muscle);
    const Muscle = muscle.toUpperCase();
    const muscleEnum = MuscleGroupEnum[Muscle as keyof typeof MuscleGroupEnum];


    try {
        const exercises = await prisma.exercise.findMany({
            where: { MuscleGroup : { name: muscleEnum } },
            select: { name: true, img: true, instructions: true, videolink: true }
        });
        console.log(exercises);
        c.status(200);
        return c.json({ msg: "success", Excercises: exercises });
    } catch (error) {
        console.log(error);

    }

})