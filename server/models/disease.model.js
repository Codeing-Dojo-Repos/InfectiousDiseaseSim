const mongoose = require("mongoose")

const DiseaseSchema = new mongoose.Schema({
    username: {
        type:String,
        required: [true,'username required'],
        maxlength:[30, 'username length <= 30']
    },
    longitude:{
        type:Number
        ,min:[-180, 'Longitude is too low']
        ,max:[180, 'Longitude is too high']
    },
    latitude:{
        type:Number
        ,min:[-90, 'Latitude too low']
        ,max:[90, 'Latitude too high']
    }
    // ,covidVac:{
    //     type: Boolean,
    //     required: [true, "were they vac against covid?"]
    // }
    // ,efficacy:{
    //     type:Number
    //     ,min:[0, 'efficacy too low']
    //     ,max:[1, 'efficacy too high']
    // }
}, {timestamps: true})

const collection = 'UserLocation' // name of collection (table)
const DiseaseModel = mongoose.model(collection, DiseaseSchema);
module.exports = DiseaseModel;

