const DiseaseModel = require('../models/disease.model')

module.exports = {

    readAllLocations: (req, res) => {
        console.log('inside readAllLocations')

        DiseaseModel.find({})
            .then( locObj => {
                console.log(locObj)
                res.json(locObj)
            })
            .catch( err => {
                console.log(`error: ${err}`)
                res.status(500).send(err)
            })
    },

    createLocation: (req,res) => {
        console.log('inside createLocation')
    
        DiseaseModel.create(req.body)
            .then( (locObj) => {
                console.log('Great Success! wrote location')
                res.json(locObj)
            })
            .catch( (err) => {
                console.log(`error: ${err}`)
                res.status(500).json(err)
            })
    },

    findLocationById: (req,res) => {
        console.log('inside findLocationById')
    
        DiseaseModel.findOne({_id:req.params._id})
            .then( (locObj) => {
                console.log(locObj)
                return res.json(locObj)
            })
            .catch( (err) => {
                console.log(`err: ${err}`)
                return res.status(500).send(err)
            })
    },

    deleteLocation: (req,res) => {
        console.log('inside deleteLocation')
        //console.log(req)
        console.log(req.params)
    
        DiseaseModel.deleteOne({_id:req.params._id})
            .then( deletedLocation => {
                console.log('Great Success! Location deleted')
                console.log(deletedLocation)
                return res.json(deletedLocation)
            })
            .catch( (err) => {
                console.log(`error: ${err}`)
                return res.status(500).send(err)
            })
    },

    updateLocation: (req, res) => {
        console.log('inside updateLocation')
        DiseaseModel.findOneAndUpdate({_id:req.params._id},
            req.body,
            {new:true, runValidators:true}
            )
            .then(updatedLocation => {
                console.log('updated Location: ' + updatedLocation)
                res.json(updatedLocation)
            })
            .catch( (err) => {
                console.log(`error: ${err}`)
                return res.status(500).send(err)
            })
    }
}