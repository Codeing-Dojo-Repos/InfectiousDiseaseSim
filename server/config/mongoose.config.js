const mongoose = require("mongoose")
const database = 'diseaseDB01'

mongoose.connect(`mongodb://localhost/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( ()=> {
    console.log(`You connect to the db named ${database}`)
})
.catch( (err) => {
    console.log(`error while connecting to ${database}`)
})