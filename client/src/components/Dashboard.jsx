import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = props => {

    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')
    const [accuracy, setAccuracy] = useState('')
    const [altitude, setAltitude] = useState('')

    useEffect( () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition); // removing watchPosition
        } else { 
            console.log("Geolocation is not supported by this browser.")
        }
    }, [])

    const getLocation = (e) => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(showPosition);
        } else { 
            console.log("Geolocation is not supported by this browser.")
        }
    }

    const showPosition = (position) => {
        //setLat(position.coords.latitude)
        setLat( () =>  position.coords.latitude )
        //setLong(position.coords.longitude)
        setLong( () => position.coords.longitude )

        setAccuracy(position.coords.accuracy)
        setAltitude(position.coords.altitude)

        logLocation(position)
        writeLocationDb(position)
    }

    const writeLocationDb = (position) => {
        console.log(`before calling post, longitude is: ${long}`)

        axios.post('http://localhost:8000/api/locations',
        {
            "username": "Karl_1922",
            "longitude": position.coords.longitude,
            "latitude": position.coords.latitude,
            "covidVac": "true",
            "efficacy": ".8"
        })
        .then( res => {
            console.log(`res:`)
            console.log(res)
        })
        .catch( err =>{
            console.log(`Error! ${err}`)
        })
    }

    const logLocation = (position) => {
        console.log(`Latitude:${position.coords.latitude} Longitude: ${position.coords.longitude};`
                + `Timestamp:${position.timestamp}`)
        console.log(`Alt: ${position.coords.altitude} +/- ${position.coords.altitudeAccuracy};` 
                + ` Heading: ${position.coords.heading} Speed: ${position.coords.speed}`)
    }

    return (
        <div>
            
            <h2>Location</h2>
            
                <p>Latitude: {lat}</p>
                <p>Longitude: {long}</p>
                <p>accuracy: {accuracy}</p>
                <p>Altitude: {altitude}</p>
            
            <button onClick={ writeLocationDb }>Write Location</button>

        </div>
    )
}
export default Dashboard