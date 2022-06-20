const express = require("express")
const https = require('https')
const path = require('path')
const fs = require('fs')
const cors = require("cors")
const app = express()

// middle-ware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cors({origin: ['https://localhost:3000','https://localhost:3000']}))

require('./config/mongoose.config')
require('./routes/disease.routes')(app)

//app.listen(8000, ()=>{console.log("server started... port 8000") })

// app.get('/', (req, res) => {
//     res.send('Welcome to SSL 🔑 server!')
// })

const sslServer = https.createServer({
    key: fs.readFileSync(__dirname + '/cert/key.pem'),
    cert: fs.readFileSync(__dirname + '/cert/cert.pem')
}, app)

sslServer.listen(8443, () => {console.log("SSL 🔐 server started, port 8443")})