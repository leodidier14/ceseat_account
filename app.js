const express = require('express')
const app = express()

const dotenv = require('dotenv');

//Import routes
const authRoute = require('./routes/routes')

const cors = require('cors')
app.use(cors())

//Route middlewares
app.use('/api/account', authRoute)

//Running server and listening on port 3000
const PORT = 3002
app.listen(PORT, () => console.log(`Serveur running on port ${PORT}`))

