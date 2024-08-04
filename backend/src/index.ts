import { Hono, Next } from 'hono'
import { UserRouter } from './Routes/UserRouter'
import { authenticationMiddleware } from './middleware/authentication'
import { cors } from "hono/cors"
import { WorkoutsRouter } from './Routes/WorkoutRouter'

const app = new Hono()
app.use("/api/*", cors());
// app.use('/api/*', cors({
//     origin: 'http://localhost:5173', // Ensure this URL is correct
//     allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
//     credentials: true, // Allow credentials if needed
// }));

// app.use('/user/*', authenticationMiddleware);
// all routes that start with /api/v1/worouts/ will be authenticated
app.use("/api/v1/workouts/*", authenticationMiddleware);
app.route("/api/v1/user/", UserRouter);
app.route("/api/v1/workouts/", WorkoutsRouter);



export default app;