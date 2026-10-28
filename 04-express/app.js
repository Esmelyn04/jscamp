import  express  from "express";
import { jobsRouter } from "./routes/jobs.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { DEFAULTS } from "./config.js";


// const PORT = process.env.PORT || 1234;
const PORT = process.env.PORT ?? DEFAULTS.PORT;
const app = express();

app.use(corsMiddleware());
app.use(express.json()); // Middleware to parse JSON request bodies

app.use('/jobs', jobsRouter)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});