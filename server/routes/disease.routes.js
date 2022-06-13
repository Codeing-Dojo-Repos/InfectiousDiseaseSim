const DiseaseController = require('../controllers/disease.controller')

module.exports= (app) => {
    app.get('/api/Locations', DiseaseController.readAllLocations)

    app.post('/api/Locations', DiseaseController.createLocation)

    app.get('/api/Locations/:_id', DiseaseController.findLocationById)

    app.delete('/api/Locations/:_id', DiseaseController.deleteLocation)

    app.put('/api/Locations/:_id', DiseaseController.updateLocation)
}