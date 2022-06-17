import React, {useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = props => {

    const [ name, setName ] = useState('')
    const navigate = useNavigate()

    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')

    useEffect( () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition); // removing watchPosition
        } else { 
            console.log("Geolocation is not supported by this browser.")
        }
    }, [])

    const showPosition = (position) => {
        setLat( () =>  position.coords.latitude )
        setLong( () => position.coords.longitude )

        logLocation(position)
    }

    const logLocation = (position) => {
        console.log(`Latitude:${position.coords.latitude} Longitude: ${position.coords.longitude};`
                + `Timestamp:${position.timestamp}`)
        console.log(`Alt: ${position.coords.altitude} +/- ${position.coords.altitudeAccuracy};` 
                + ` Heading: ${position.coords.heading} Speed: ${position.coords.speed}`)
    }

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post('https://localhost:8443/api/locations',
        {
            "username": name,
            "longitude": long,
            "latitude": lat,
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

        navigate('/Dashboard')
    }

    return (
        <div>
            <h2>Login</h2>
            <Link to="/Dashboard">Dashboard</Link>
            <form onSubmit={loginHandler}>
                <input type="text" onChange={(e) => setName(e.target.value)}></input>
                <button>Login</button>
            </form>
        </div>
    )
}
export default Login