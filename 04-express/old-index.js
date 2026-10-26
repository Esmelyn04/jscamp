import  express  from "express";
import jobs from "./jobs.json" with { type: "json" };
import { DEFAULTS } from "./confid.js";

const app = express();
const PORT = process.env.PORT || 1234;

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

app.get('/jobs', (req, res) => {
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

  return res.json(paginatedJobs)
});

// Idempotent route, can be called multiple times with the same result
app.get('/jobs/:id', (req, res) => {
  const { id } = req.params;

  const IdNumber = Number(id);

  return res.json({
    job: { id: IdNumber, title: `Job Title ${id}` }
  });
})
// No idempotent route, calling it multiple times will create multiple jobs
app.post('/jobs', (req, res) => {
  // TODO
  
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

// optional -> /acd or /abcd
app.get('/a{b}cd', (req, res) => {
  return res.send('abcd or acd')
})

// Comodín
app.get('/bb*bb', (req, res) => {
  return res.send('bb*bb')
})

// Rutas más largas que no sabes como terminan
app.get('/file/*filename', (req, res) => {
  return res.send('file/*')
})

// Usar Regex
app.get(/.*fly$/, (req, res) => {
  return res.send('Terminando en fly')
})


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});