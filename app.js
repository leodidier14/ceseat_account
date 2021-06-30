const express = require('express')
const app = express()

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const mongoose = require('mongoose');
const requestLog = require('./models/requestLog')
//Connect to db
mongoose.connect(process.env.DB_MONGO_CONNECT, {useNewUrlParser: true}, () =>
    console.log("connected to database")
);
//######### Display name and version ############// 
const apiinf = require('./models/apiinfo')
var pjson = require('./package.json');
console.log("name : " + pjson.name);
console.log("version : " + pjson.version);
const apiinfos = apiinf.findOneAndUpdate({name: pjson.name}, {version : pjson.version}, {upsert: true}).exec()
//################################################//

app.use(async(req,res,next) => {
    console.log('new entry')
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp) 
    if(checkTokenApp)
      next()
    else 
      res.status(400).send('not an authentified APP ')
  })

//Import routes
const authRoute = require('./routes/routes')

const cors = require('cors')
app.use(cors())

//Route middlewares
app.use('/api/account', authRoute)

//Running server and listening on port 3000
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Serveur running on port ${PORT}`))

