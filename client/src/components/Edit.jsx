import React, {useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Edit = () => {

    const [long, setLong] = useState("")
    const [lat, setLat] = useState("")
    const [covidVac, setCovidVac] = useState(false)
    const [efficacy, setEfficacy] = useState(0.0)

    const {id} = useParams()
    const navigate = useNavigate()

    const [errors, setErrors] = useState([])

    useEffect( () => {
        axios.get(`https://localhost:8443/api/locations/${id}`)
            .then( res =>{
                setLong(res.data.longitude)
                setLat(res.data.latitude)
                //setCovidVac(res.data.covidVac)
                //setEfficacy(res.data.efficacy)
            })
            .catch(err => {
                console.log(`Error! ${err}`)
            })

        axios.get(`https://localhost:8443/api/vaccinations/${id}`)
            .then( res => {
                setCovidVac(res.data.vaccinated)
                setEfficacy(res.data.efficacy)
            })
            .catch(err => {
                console.log(`Error! ${err}`)
            })
    },[])

    const editLocationHandler = (e) => {
        console.log(`editing user ${id}`)
        e.preventDefault()
        axios.put(`https://localhost:8443/api/locations/${id}`,
            {
                "longitude": long,
                "latitude": lat
                // ,"covidVac": covidVac,
                // "efficacy": efficacy
            })
            .then( res => {
                console.log(res)
                navigate('/AllUsers')
            })
            .catch( err => {
                console.log(err)
                if(err.response.status === 500){
                    setErrors(err.response.data.errors)
                }
            })
    }

    const editVaccineHandler = (e) => {
        console.log(`editing Vaccine info for user ${id}`)
        e.preventDefault()
        axios.put(`https://localhost:8443/api/vaccinations/${id}`,
            {
                "disease": "covid-19",
                "vaccinated": covidVac,
                "efficacy": efficacy
            })
            .then( res => {
                console.log(res)
                navigate('/AllUsers')
            })
            .catch( err => {
                console.log(err)
                if(err.response.status === 500){
                    setErrors(err.response.data.errors)
                }
            })

    }

    return (
        <div>
            Edit
            <form onSubmit={editLocationHandler}>

                <label>Longitude</label>
                <input type="text" onChange={ (e) => setLong(e.target.value)} value={long} /> < br/>

                <label>Latitude</label>
                <input type="text" onChange={ (e) => setLat(e.target.value)} value={lat} /> < br/>

                <button>Edit Location</button><br />
                {
                    errors.longitude ?
                    <span className='error-message'>{errors.longitude.message}<br/></span> 
                    : null
                }
                {
                    errors.latitude ?
                    <span className='error-message'>{errors.latitude.message}</span>
                    : null
                }
                
            </form>

            <form onSubmit={editVaccineHandler}>
                <label>Covid Vaccine</label>
                <input type="text" onChange={ (e) => setCovidVac(e.target.value)} value={covidVac} />< br/>

                <label>Efficacy</label>
                <input type="text" onChange={ (e) => setEfficacy(e.target.value)} value={efficacy} />< br/>

                <button>Edit Vaccine Info</button> <br />
                {
                    errors.efficacy ?
                    <span className='error-message'>{errors.efficacy.message}<br/></span>
                    : null
                }
                {
                    errors.disease ?
                    <span className='error-message'>{errors.disease.message}<br/></span>
                    : null
                }
                {
                    errors.id ?
                    <span className='error-message'>{errors.id.message}<br/></span>
                    : null
                }
            </form>
            
        </div>
    )
}
export default Edit