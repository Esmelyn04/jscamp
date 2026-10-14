import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { json } from 'node:stream/consumers';

process.loadEnvFile() // read the .env file and load the environment variables into process.env

const port = process.env.PORT ?? 3000

function sendJson(res, statusCode, data ) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(data)) 
}

const users = [
  {id: 1, name: 'John'}, 
  {id: 2, name: 'Jane'},
  {id: 3, name: 'Bob'}
]

const server = createServer(async (req, res) => {
  const { method, url } = req

  if (method === 'GET') {
    if (url === '/'){
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      return res.end('Hola desde Node 🔥🔥')
    }

    if (url === '/users'){
      return sendJson(res, 200, users)
    }

    if (url === '/health'){
      return sendJson(res, 200, {status: 'ok', uptime: process.uptime()})
    }
  }

  if (method === 'POST') {
    if (url === '/users'){
      const body = await json(req)
      
      if (!body|| !body.name) {
        return sendJson(res, 400, { error: 'Name is required' })
      }

      const newUser = {
        name: body.name,
        id: randomUUID()
      }
      users.push(newUser)

      return sendJson(res, 201, { message: 'User created' })
    }
  }
  
  return sendJson(res, 404, { error: 'Not Found' })
})

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})

// --watch allow the server to restart automatically when changes are made to the code. 
// This is useful for development purposes, as it saves time by not having to manually stop and start the server after each change.
// node --watch server.js