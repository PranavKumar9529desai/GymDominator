import { Hono, Next } from "hono";
import { UserRouter } from "./Routes/UserRouter";
import { authenticationMiddleware } from "./middleware/authentication";
import { cors } from "hono/cors";
import { WorkoutsRouter } from "./Routes/WorkoutRouter";
import { RecipesRouter } from "./Routes/RecipesRouter";
import { DietRouter } from "./Routes/DietRouter";
const app = new Hono();
app.use("/api/*", cors());
// app.use('/api/*', cors({
//     origin: 'http://localhost:5173', // Ensure this URL is correct
//     allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
//     credentials: true, // Allow credentials if needed
// }));

// app.use('/user/*', authenticationMiddleware);
// all routes that start with /api/v1/worouts/ will be authenticated
app.use("/api/v1/workouts/*", authenticationMiddleware);
app.use("/api/v1/diets/*", authenticationMiddleware);
app.use("/api/v1/recipes/*", authenticationMiddleware);
app.route("/api/v1/user/", UserRouter);
app.route("/api/v1/workouts/", WorkoutsRouter);
app.route("/api/v1/recipes", RecipesRouter);
app.route("/api/v1/diet", DietRouter);
export default app;
