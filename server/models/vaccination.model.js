const mongoose = require("mongoose")

const VaccinationSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'id required'],
    }
    ,disease: {
        type: String,
        required: [true, 'disease name is required']
    }
    ,vaccinated: {
        type: Boolean,
        required: [true, 'vaccinated required']
    }
    ,efficacy: {
        type:Number,
        min:[0, 'efficacy too low'],
        max:[1, 'efficacy too high']
    }
}, {timestamps:true})

const VaccinationModel = mongoose.model('Vaccinations', VaccinationSchema)
module.exports = VaccinationModel