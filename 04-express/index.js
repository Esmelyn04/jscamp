import  express  from "express";

const app = express();
const PORT = process.env.PORT || 1234;

app.use((req, res, next) => {
  const timeString = new Date().toLocaleTimeString();
  console.log(`[${timeString}] ${req.method} ${req.url}`);
  next();
});

// middleware function to add in a route
const previousHOmeMiddleware = (req, res, next) => {
  console.log("This is the previous home / middleware");
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

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});