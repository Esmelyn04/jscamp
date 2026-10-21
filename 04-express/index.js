import  express  from "express";
import jobs from "./jobs.json" with { type: "json" };

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

app.get('/get-jobs', (req, res) => {
  return res.json(jobs);
});


app.get('/get-single-job/:id', (req, res) => {
  const { id } = req.params;

  const IdNumber = Number(id);

  return res.json({
    job: { id: IdNumber, title: `Job Title ${id}` }
  });
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