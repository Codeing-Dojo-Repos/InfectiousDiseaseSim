const express = require("express")
const cors = require("cors")
const app = express()

// middle-ware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use(cors({origin: ['https://localhost:3000','https://localhost:3000']}))

require('./config/mongoose.config')
require('./routes/disease.routes')(app)


app.listen(8000, ()=>{console.log("server started... port 8000") })