import { Hono } from "hono"
import { Bindings } from "../middleware/authentication";
import { signinInput, SigninInput, signupInput, SignupInput } from "../zod/types";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "hono/adapter";
import { decode, jwt, sign, verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";
import { string } from "zod";
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
export type DietType = "vegetarian" | "non-vegetarian";

interface UserhealthprofileType {
    fullname: string,
    contact: string,
    address: string,
    diet: DietType,
    height: number,
    weight: number
}

UserRouter.post("userhealthprofile", async (c) => {
    const token = c.req.header("Authorization");
    const body = await c.req.json()
    console.log("body is : ", body);
    const jwt = token?.split(" ")[1];
    if (jwt == undefined) {
        c.status(400)
        return c.json({ msg: "no token is send" })
    }
    const { header, payload } = decode(jwt);
    const email = payload.jwttoken;

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log("token and jwt ", payload);
    const user = await prisma.user.findFirst({
        where: { email: `${email}` },
        select: { id: true }
    });
    if (user == undefined) {
        c.status(400)
        return c.json({
            msg: 'hello '
        })
    }
    console.log(user);

    const date = new Date();
    const completionDate = new Date(date.getTime() + 150 * 24 * 60 * 60 * 1000);
    try {
        const userhealthprofile = await prisma.userHealthprofile.upsert({
            where: {
                userid: user.id
            },
            update: {
                fullname: body.fullName,
                contact: body.contactNumber,
                diet: body.dietPreference,
                weight: Number(body.weight),
                height: Number(body.height),
                address: body.address,
                userid: user.id
            },
            create: {
                fullname: body.fullName,
                contact: body.contactNumber,
                diet: body.dietPreference,
                weight: Number(body.weight),
                height: Number(body.height),
                address: body.address,
                userid: user.id
            }
        });
        //        prgress start 

        let userProgress = await prisma.userProgress.findFirst({
            where: { userid: user.id, enrolledDate: { lte: date } }
        });

        if (!userProgress) {
            userProgress = await prisma.userProgress.create({
                data: {
                    userid: user.id,
                    enrolledDate: date,
                    ComlpetionDate: completionDate,
                    progress1: 0n,
                    progress2: 0n,
                    progress3: 0n,

                }
            })
        };

        console.log(userProgress);


        console.log("the users health profile", userhealthprofile);
        c.status(200);
        return c.json({
            msg: "sucesss",
            "userhealthprofile": (userhealthprofile),
            // "progress": JSON.stringify(userProgress)
        });
    } catch (error) {
        console.log(error);
        c.status(300);
        return c.json({
            "msg": "error",
            "error": error
        })
    }
});

interface WorkoutplaceType {
    workoutplace: string,
    gymname?: string
}

UserRouter.post("workoutplace", async (c) => {
    const token = c.req.header("Authorization");
    const jwt = token?.split(" ")[1];
    if (jwt == undefined) {
        c.status(400)
        return c.json({ msg: "no toek is send " })
    }
    const { header, payload } = decode(jwt);
    const email = payload.jwttoken;
    const body = await c.req.json()
    console.log("body is here", body);

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log("token and jwt ", payload);
    const user = await prisma.user.findFirst({
        where: { email: `${email}` },
        select: { id: true }
    });
    if (user == undefined) {
        c.status(400)
        return c.json({
            msg: 'user with this email doesnt exist siginin again'
        })
    }
    console.log(user);
    try {
        const workoutplace = await prisma.workplacepreference.upsert({
            where: {
                userid: user.id
            },
            update: {
                workoutplace: body.workoutplace,
                gymname: body.gymname

            },
            create: {
                workoutplace: body.workoutplace,
                gymname: body.gymname,
                User: {
                    connect: {
                        id: user.id
                    }
                }

            }
        })
        console.log("the users health profile", workoutplace);
        c.status(200);
        return c.json({
            msg: "sucesss",
            "workoutplace": workoutplace
        })
    } catch (error) {
        console.log(error);
        c.status(300);
        return c.json({
            "msg": "error",
            "error": error
        })
    }
});

interface UserprogressInputType {
    UserCompletedThePlanInFrontned: boolean
}

UserRouter.post("completedtodaysprogress", async (c) => {
    const token = c.req.header("Authorization");
    const body: UserprogressInputType = await c.req.json()
    console.log("body is : ", body);
    const jwt = token?.split(" ")[1];
    if (jwt == undefined) {
        c.status(400)
        return c.json({ msg: "no token is send" })
    }
    const { header, payload } = decode(jwt);
    const email = payload.jwttoken;

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log("token and jwt ", payload);
    const user = await prisma.user.findFirst({
        where: { email: `${email}` },
        select: { id: true }
    });
    if (user == undefined) {
        c.status(400)
        return c.json({
            msg: 'user does not exist'
        })
    }
    console.log(user);
    const date = new Date();
    const tomarrow = new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000)
    const completionDate = new Date(date.getTime() + 150 * 24 * 60 * 60 * 1000);

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        let userProgress = await prisma.userProgress.findFirst({
            where: { userid: user.id, enrolledDate: { lte: date } }
        });

        if (!userProgress) {
            c.status(300);
            return c.json({ msg: "User doesn't exist signup once again" })
        }

        // Calculate the day number (0-indexed)
        const dayNumber = Math.floor((date.getTime() - userProgress.enrolledDate.getTime()) / (1000 * 60 * 60 * 24));

        // Determine which progress field to update
        let fieldToUpdate: 'progress1' | 'progress2' | 'progress3';
        let bitPosition: number;

        if (dayNumber < 64) {
            fieldToUpdate = 'progress1';
            bitPosition = dayNumber;
        } else if (dayNumber < 128) {
            fieldToUpdate = 'progress2';
            bitPosition = dayNumber - 64;
        } else if (dayNumber < 150) {
            fieldToUpdate = 'progress3';
            bitPosition = dayNumber - 128;
        } else {
            throw new Error('Date is outside the 150-day range');
        }

        if (body.UserCompletedThePlanInFrontned) {
            console.log("here is the contorl");
            const updatedprogress = await prisma.userProgress.update({
                where: { id: userProgress.id },
                data: {
                    [fieldToUpdate]: {
                        set: userProgress[fieldToUpdate] | (1n << BigInt(bitPosition)),
                    },
                },
            });
            console.log(updatedprogress);
        }
        console.log("fieldToUpdate", fieldToUpdate, "bitPosition", bitPosition);
        // Check if the bit is already set
        const isCompletedTodayPlan: boolean = (userProgress[fieldToUpdate] & (1n << BigInt(bitPosition))) !== 0n;
        console.log("isCompletedTodayPlan", isCompletedTodayPlan);
        c.status(200);
        return c.json({ msg: "sucesss", AlreadyCompletedTheplan: isCompletedTodayPlan });


    } catch (error) {
        c.status(300);
        return c.json({ msg: "error" })
    }
});

interface userProgressType {
    id: number;
    userid: number;
    enrolledDate: Date;
    ComlpetionDate: Date;
    progress1: bigint;
    progress2: bigint;
    progress3: bigint;
}

UserRouter.get("compltedDays", async (c) => {
    const token = c.req.header("Authorization");
    // const body: UserprogressInputType = await c.req.json()
    // console.log("body is : ", body);
    const jwt = token?.split(" ")[1];
    if (jwt == undefined) {
        c.status(400)
        return c.json({ msg: "no token is send" })
    }
    const { header, payload } = decode(jwt);
    const email = payload.jwttoken;

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log("token and jwt ", payload);
    const user = await prisma.user.findFirst({
        where: { email: `${email}` },
        select: { id: true }
    });
    console.log(user);
    if (user == undefined) {
        c.status(400)
        return c.json({
            msg: 'user does not exist'
        })
    }
    const date = new Date();

    try {
        let userProgress = await prisma.userProgress.findFirst({
            where: { userid: user.id, enrolledDate: { lte: date } }
        });

        if (!userProgress) {
            c.status(300);
            return c.json({ "msg": "user does not exist , signin once agin" })
        }

        let allcompletedDays: Date[] = await getCompletedDays(userProgress)
        function getCompletedDays(userProgress: userProgressType) {
            const completedDays = [];

            const { enrolledDate, progress1, progress2, progress3 } = userProgress;

            // Iterate through each progress field
            for (let i = 0; i < 3; i++) {
                const progressField = [progress1, progress2, progress3][i];

                // Iterate through each bit in the field
                for (let j = 0; j < 64; j++) {
                    const bit = progressField & (1n << BigInt(j));
                    if (bit !== 0n) {
                        // The bit is set, so the user completed the workout on that day
                        const completedDate = new Date(enrolledDate);
                        completedDate.setDate(enrolledDate.getDate() + (i * 64 + j));
                        completedDays.push(completedDate);
                    }
                }
            }

            return completedDays;
        }

        c.status(200);
        return c.json({ msg: "success", completedDays: allcompletedDays })

    } catch (error) {
        console.log(error)
        c.status(300);
        return c.json({ msg: "error", error: error });

    }
})