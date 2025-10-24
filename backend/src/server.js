// src/server.js
// Starts the server after connecting to DB

const app = require('./app')
const { config, connectDb } = require('./config')

;(async () => {
  try {
    await connectDb()
    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`)
    })
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
})()
