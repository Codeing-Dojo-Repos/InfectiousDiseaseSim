const DiseaseModel = require('../models/disease.model')
const VaccinationModel = require('../models/vaccination.model')

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
        console.log(`body: `)
        console.log(req.body)

        // before we create a location for a user, see if that user already has one,
        DiseaseModel.findOne({username:req.body.username})
            .then( (locObj) => {
                console.log(locObj)

                // if we only found null, go ahead and create
                if (locObj === null){
                    console.log(`creating entry for ${req.body.username}` )
                    DiseaseModel.create(req.body)
                    .then( (locObj) => {
                        console.log('Great Success! wrote location')
                        res.json(locObj)
                    })
                    .catch( (err) => {
                        console.log(`error: ${err}`)
                        res.status(500).json(err)
                    })
                }else {
                    let err = `already have the username: ${req.body.username}`
                    console.log(err)
                    res.status(409).json(err)
                }
                
            })
            .catch( (err) => {
                console.log(`err: ${err}`)
                return res.status(500).send(err)
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

    findLocationByUsername: (req,res) => {
        console.log('inside findLocationByUsername')
        console.log(req.params)

        DiseaseModel.findOne({username:req.params.username})
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
    },

    readAllVaccinations: (req, res) => {
        console.log('inside readAllVaccinations')
        VaccinationModel.find({})
            .then( allVacs =>{
                console.log(allVacs)
                res.json(allVacs)
            })
            .catch( err => {
                console.log(`error: ${err}`)
                res.status(500).send(err)
            })
    },

    findVaccinationByUsernameId: (req, res) => {
        console.log('inside findVaccinationById')
        VaccinationModel.findOne({id:req.params.id})
            .then( (vacObj) => {
                console.log(vacObj)
                return res.json(vacObj)
            })
            .catch( (err) => {
                console.log(`err: ${err}`)
                return res.status(500).send(err)
            })
    },

    createVaccination: (req, res) => {
        console.log('inside createVaccination')
        VaccinationModel.create(req.body)
            .then( obj => {
                console.log('create vaccination record')
                res.json(obj)
            })
            .catch( (err) => {
                console.log(`error: ${err}`)
                res.status(500).json(err)
            })
    },

    deleteVaccination: (req, res) => {
        console.log('inside deleteVaccination')

        VaccinationModel.deleteOne({_id:req.params._id})
            .then( deletedVac => {
                console.log('Great Success! Location deleted')
                console.log(deletedVac)
                return res.json(deletedVac)
            })
            .catch( (err) => {
                console.log(`error: ${err}`)
                return res.status(500).send(err)
            })
    },

    updateVaccinationByUsernameId: (req, res) => {
        console.log('inside updateVaccinationByUsernameId')
        VaccinationModel.findOneAndUpdate({id:req.params.id},
            req.body,
            {new:true, runValidators:true}
            )
            .then(updatedVaccination => {
                console.log('success: updated Vaccination: ' + updatedVaccination)
                res.json(updatedVaccination)
            })
            .catch( (err) => {
                console.log(`error: ${err}`)
                return res.status(500).send(err)
            })
    }
}