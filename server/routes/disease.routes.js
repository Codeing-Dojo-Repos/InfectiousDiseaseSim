const DiseaseController = require('../controllers/disease.controller')

module.exports= (app) => {
    app.get('/api/Locations', DiseaseController.readAllLocations)
    app.post('/api/Locations', DiseaseController.createLocation)
    app.get('/api/Locations/:_id', DiseaseController.findLocationById)
    app.get('/api/Locations/username/:username', DiseaseController.findLocationByUsername)
    app.delete('/api/Locations/:_id', DiseaseController.deleteLocation)
    app.put('/api/Locations/:_id', DiseaseController.updateLocation)

    app.post('/api/vaccinations', DiseaseController.createVaccination)
    app.get('/api/vaccinations', DiseaseController.readAllVaccinations)
    app.get('/api/vaccinations/:id', DiseaseController.findVaccinationByUsernameId)
    app.put('/api/vaccinations/:id', DiseaseController.updateVaccinationByUsernameId)
}