// Serve your app using HTTPS
const http = require('http')
const app = require('./app')

// Setting up port
const port = process.env.PORT || 9696

// Create server
const server = http.createServer(app)

// Start server
server.listen(port, () => {
  console.log(`Listening on port ${port} 👻, Visit http://localhost:${port}/ in your browser.`)
})