const express = require('express')
const app = express()
const { verifTokenAppController } = require('./controllers/tokenAppController')

const path = require('path')
const route = '/api/account/'
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const mongoose = require('mongoose');
const requestLog = require('./models/requestLog')

//Connect to db
mongoose.connect(process.env.DB_MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log("connected to database")
)

//######### Display name and version ############// 
const apiinf = require('./models/apiinfo')
var pjson = require('./package.json');
console.log("name : " + pjson.name);
console.log("version : " + pjson.version);
const apiinfos = apiinf.findOneAndUpdate({ name: pjson.name, port: process.env.PORT, path: route }, { version: pjson.version }, { upsert: true }).exec()
//################################################//

app.use(async (req, res, next) => {
  const tokenapp = req.headers['tokenapp'];
  checkTokenApp = await verifTokenAppController(tokenapp)
  if (checkTokenApp) {
    console.log("next")
    next()
  }
  else {
    console.log("next else")
    res.status(400).send('not an authentified APP ')
  }
})

//Import routes
const authRoute = require('./routes/routes')

const cors = require('cors')
app.use(cors())

//Route middlewares
app.use(route, authRoute)

//Running server and listening on port 3000
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Serveur running on port ${PORT}`))

