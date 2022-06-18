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

    useEffect( () => {
        axios.get(`https://localhost:8443/api/locations/${id}`)
            .then( res =>{
                setLong(res.data.longitude)
                setLat(res.data.latitude)
                setCovidVac(res.data.covidVac)
                setEfficacy(res.data.efficacy)
            })
            .catch(err => {
                console.log(`Error! ${err}`)
            })
    },[])

    const editHandler = (e) => {
        console.log(`editing user ${id}`)
        e.preventDefault()
        axios.put(`https://localhost:8443/api/locations/${id}`,
            {
                "longitude": long,
                "latitude": lat,
                "covidVac": covidVac,
                "efficacy": efficacy
            })
            .then( res => {
                console.log(res)
                navigate('/AllUsers')
            })
            .catch( err => {
                console.log(err)
            })
    }

    return (
        <div>
            Edit
            <form onSubmit={editHandler}>

                <label>Longitude</label>
                <input type="text" onChange={ (e) => setLong(e.target.value)} value={long} /> < br/>

                <label>Latitude</label>
                <input type="text" onChange={ (e) => setLat(e.target.value)} value={lat} /> < br/>

                <label>Covid Vaccine</label>
                <input type="text" onChange={ (e) => setCovidVac(e.target.value)} value={covidVac} />< br/>

                <label>Efficacy</label>
                <input type="text" onChange={ (e) => setEfficacy(e.target.value)} value={efficacy} />

                <button>Edit</button>
            </form>
            
        </div>
    )
}
export default Edit