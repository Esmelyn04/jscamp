import  express  from "express";
import jobs from "./jobs.json" with { type: "json" };
import { DEFAULTS } from "./confid.js";

const app = express();
const PORT = process.env.PORT || 1234;

app.use(express.json()); // Middleware to parse JSON request bodies

app.use((req, res, next) => {
  const timeString = new Date().toLocaleTimeString();
  console.log(`[${timeString}] ${req.method} ${req.url}`);
  next();
});

// middleware function to add in a route
const previousHOmeMiddleware = (req, res, next) => {
  // console.log("This is the previous home / middleware");
  next();
}

app.get('/', previousHOmeMiddleware, (req, res) => {
  return res.send("Hello, World!");
});

app.get('/health', (req, res) => {
  return res.json({ 
    status: "OK",
    uptime: process.uptime()
  });
});

// CRUD: Create, Read, Update, Delete

app.get('/jobs', (req, res) => {
  res.header('Access-Control-Allow-Origin', "http://localhost:5173");
  const { text, title, level, limit = DEFAULTS.LIMIT_PAGINATION, technology, offset = DEFAULTS.LIMIT_OFFSET } = req.query;

  let filteredJobs = jobs;

  if (text) {
    const searchTerm = text.toLowerCase()
    console.log("Searching for jobs with text:", searchTerm);
    filteredJobs = filteredJobs.filter(job =>
      job.titulo.toLowerCase().includes(searchTerm) ||
      job.descripcion.toLowerCase().includes(searchTerm)
    );
  }

  if (technology) {
    filteredJobs = filteredJobs.filter(job =>
      job.tecnologias.includes(technology)
    );
  }

  const limitNumber = Number(limit)
  const offsetNumber = Number(offset)

  const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber);

  // return res.json(paginatedJobs)
  return res.json({ data: paginatedJobs, total: filteredJobs.length, limit: limitNumber, offset: offsetNumber });
});

// Idempotent route, can be called multiple times with the same result
app.get('/jobs/:id', (req, res) => {
  const { id } = req.params;

  const job = jobs.find(job => job.id === id)

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  return res.json(job);
});
// No idempotent route, calling it multiple times will create multiple jobs
app.post('/jobs', (req, res) => {
  const { titulo, empresa, ubicacion, data } = req.body;
  
  const newJob = {
    id: crypto.randomUUID(),
    titulo,
    empresa,
    ubicacion,
    data
  }

  jobs.push(newJob); // lo haremos en una base de datos con un INSERT

  return res.status(201).json(newJob);
  
})

// Reemplace the entire job with the new data
app.put('/jobs/:id', (req, res) => {
  // TODO
})

// Update only the fields that are provided in the request body
app.patch('/jobs/:id', (req, res) => {
  // TODO
})

app.delete('/jobs/:id', (req, res) => {
  // TODO
})  

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});