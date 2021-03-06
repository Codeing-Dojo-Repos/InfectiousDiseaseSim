import React, {useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = props => {

    const [ name, setName ] = useState('')
    const navigate = useNavigate()

    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')
    const [ created, setCreated ] = useState(false)
    const [ efficacy, setEfficacy] = useState(0.0)
    const [ id, setId] = useState("")
    const [ errors, setErrors ] = useState("")

    useEffect( () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition); // removing watchPosition
        } else { 
            console.log("Geolocation is not supported by this browser.")
        }
    }, [])

    const showPosition = (position) => {
        // setLat( () =>  position.coords.latitude )
        // setLong( () => position.coords.longitude )
        setLat(position.coords.latitude )
        setLong(position.coords.longitude )

        logLocation(position)
    }

    const logLocation = (position) => {
        console.log(`Latitude:${position.coords.latitude} Longitude: ${position.coords.longitude};`
                + `Timestamp:${position.timestamp}`)
        console.log(`Alt: ${position.coords.altitude} +/- ${position.coords.altitudeAccuracy};` 
                + ` Heading: ${position.coords.heading} Speed: ${position.coords.speed}`)
    }

    const usernameHandler = (e) => {
        e.preventDefault();
        axios.post('https://localhost:8443/api/locations',
        {
            "username": name,
            "longitude": long,
            "latitude": lat
            // "covidVac": "true",
            // "efficacy": ".8"
        })
        .then( res => {
            console.log(`res:`)
            console.log(res)
            setId(res.data._id)
            setCreated(true)
        })
        .catch( err =>{
            console.log(`Error! ${err}`)
            if (err.response.status === 500){
                setErrors(err.response.data.errors)
            }
        })

        //navigate('/Dashboard')
    }

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post('https://localhost:8443/api/vaccinations',
            {
                "id": id,
                "disease": "Covid-19",
                "vaccinated": "true",
                "efficacy": efficacy
            })
            .then ( res => {
                console.log(`res:`)
                console.log(res)
            })
            .catch( err => {
                console.log(`Error! ${err}`)
            })
            navigate('/Dashboard')
    }

    return (
        <div className='w3-container'>
            <div class="w3-card-4 w3-margin">
                <div class="w3-container w3-blue">
                    <h2>Login</h2>
                </div>
                <Link to="/Dashboard">Dashboard</Link>
                <form onSubmit={usernameHandler} class="w3-container">
                    <label>Username: </label>
                    <input class="w3-input" type="text" onChange={(e) => setName(e.target.value)}></input>
                    <button class="w3-button w3-section w3-blue w3-ripple">Login</button>
                </form>
                {
                    errors.username ?
                    <span className='error-message'>{errors.username.message}</span>
                    : null
                }

                {
                    created ? 
                    <form class="w3-container" onSubmit={loginHandler}>
                        <label>Covid-19 Efficacy: </label>
                        <input class="w3-input" type="text" onChange={ (e) => setEfficacy(e.target.value) }></input>
                        <button class="w3-button w3-section w3-blue w3-ripple">Set Efficacy</button>
                    </form>
                    : null
                }
            </div>
        </div>
    )
}
export default Login