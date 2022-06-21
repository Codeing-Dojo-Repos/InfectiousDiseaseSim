import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Dashboard = props => {

    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')
    const [accuracy, setAccuracy] = useState('')
    const [altitude, setAltitude] = useState('')
    const [allLocations, setAllLocations] = useState([])
    const [infected, setInfected] = useState(false)

    useEffect( () => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(showPosition); // removing watchPosition
        } else { 
            console.log("Geolocation is not supported by this browser.")
        }

        // grab 
        axios.get("https://localhost:8443/api/locations") // TODO: change to ssl
            .then( res => {
                console.log(res.data)
                setAllLocations(res.data)
            })
            .catch( err =>{
                console.log(err)
                setAllLocations(
                    [{"_id": "62a6d80e0c19331725b2d2c3","username": "bobby1", "longitude": -121.9773863, "latitude": 47.5915303},
                    {"_id": '62a9615c006998505a1bb9a8', "username": 'Barnard', "longitude": -121.9778417, "latitude": 47.5913398},
                    {"_id": '62a965327a6763c15bc8c242', "username": 'stew', "longitude": -121.9776655, "latitude": 47.5912663},
                    {"_id": '62a96838661ebf46b9757856', "username": 'Aymie', "longitude": -121.9775886, "latitude": 47.5912949},
                    {"_id": '62a96a9b9d677d87d906cf07', "username": 'Jennifer', "longitude": -121.9778281, "latitude": 47.5913705},
                    {"_id": '62aab1819d677d87d906cf0a', "username": 'Karl_1922', "longitude": -121.9778427, "latitude": 47.591303},
                    {"_id": '62aadf89fd2f9e2b08b9a8e9', "username": 'RL_Jackson', "longitude": -121.97341, "latitude": 47.59003},
                    {"_id": '62aba5f5fd2f9e2b08b9a8f6', "username": 'Ally_84', "longitude": -121.9781, "latitude": 47.5931},
                    {"_id": '62abad69fd2f9e2b08b9a901', "username": 'Kramer_81', "longitude": -121.9710291, "latitude": 47.5995249},
                    {"_id": '62ac1b5efde20edaf7506a30', "username": 'Jerry_Seinfeld01', "longitude": -121.9719063, "latitude": 47.5915249},
                    {"_id": '62ad6ba0482366b84cf70590', "username": 'Cindy2', "longitude": -121.975973, "latitude": 47.598051}
                ])
            })
    }, [])

    const getLocation = (e) => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(showPosition);
        } else { 
            console.log("Geolocation is not supported by this browser.")
        }
    }

    const showPosition = (position) => {
        console.log("watchPosition returned")
        setLat(position.coords.latitude)
        //setLat( () =>  position.coords.latitude )
        setLong(position.coords.longitude)
        //setLong( () => position.coords.longitude )

        // because of weird vpn issues, I have to override these values:
        // only do this for desttop!
        //setLong(-121.9777865)
        //setLat(47.5914302)

        setAccuracy(position.coords.accuracy)
        setAltitude(position.coords.altitude)

        logLocation(position)
        //writeLocationDb(position)
    }

    const writeLocationDb = (position) => {
        console.log(`before calling post, longitude is: ${long}`)

        axios.post('https://localhost:8443/api/locations',
        {
            "username": "Karl_1922",
            "longitude": position.coords.longitude,
            "latitude": position.coords.latitude
            // "covidVac": "true",
            // "efficacy": ".8"
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

    // use chrome://inspect on iOS
    const calcDistance = () => {
        let distances = []
        var infected = false
        for ( let e in allLocations){
            //console.log(e)
            //console.log(`lat: ${lat}, long:${long}, ${allLocations[e].longitude}, ${allLocations[e].latitude}`)
            let deltaD = haversine(lat, long, allLocations[e].latitude, allLocations[e].longitude )
            distances.push(deltaD.toFixed())

            if (deltaD < 25){
                infected = true
                console.log("you are infected")
            }else{
                console.log("you are clean")
            }
            infected ? setInfected(true) : setInfected(false)
        }

        console.log(distances)
    }

    const haversine = (lat1, lon1, lat2, lon2) => {
        const R = 6371000; // metres
        const phi1 = lat1 * Math.PI/180;
        const phi2 = lat2 * Math.PI/180;

        const deltaPhi = (lat1-lat2) * Math.PI/180;
        const deltaLambda = (lon1-lon2) * Math.PI/180;

        const a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
                    Math.cos(phi1) * Math.cos(phi2) *
                    Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const d = R * c;
        const feet_per_meter = 3.28084

        return d*feet_per_meter
    }

    return (
        <div>
            
            <h2>Dashboard</h2>
            <Link to="/AllUsers">All Users</Link> <Link to="/">Login</Link>
            <div class="w3-container">
                <div class="w3-card-4 w3-margin">
                    <div class="w3-container w3-blue">
                        <h2>Edit Location</h2>
                    </div>
                    <div class="w3-container">
                        <p>Latitude: {lat}</p>
                        <p>Longitude: {long}</p>
                        <p>accuracy: {accuracy}</p>
                        <p>Altitude: {altitude}</p>
                        {
                            infected ? 
                            <p>Infected 🐛</p>
                            : <p>Clean 😊</p>
                        }
                    </div>
                    <div class="w3-container">
                    <button class="w3-button w3-border w3-blue w3-section" onClick={ calcDistance }>Calculate Distance</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard