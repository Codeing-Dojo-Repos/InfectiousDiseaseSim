import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AllUsers = props => {

    const [allLocations, setAllLocations] = useState([])
    //const navigate = useNavigate()

    useEffect( () => {
        axios.get("https://localhost:8443/api/locations") // TODO: change to ssl
            .then( res => {
                console.log(res)
                setAllLocations(res.data)
            })
            .catch( err =>{
                console.log("Error! We have an axios error")
                console.log(err)
                console.log(err.message)
                console.log(err.config)
                setAllLocations(
                    [
                    {"_id": "62a6d80e0c19331725b2d2c3", "username": "bobby1", "longitude": -121.9773863, "latitude": 47.5915303, "covidVac": "true"},
                    {"_id": '62a9615c006998505a1bb9a8', "username": 'Barnard', "longitude": -121.9778417, "latitude": 47.5913398, "covidVac": "true"},
                    {"_id": '62a965327a6763c15bc8c242', "username": 'stew', "longitude": -121.9776655, "latitude": 47.5912663, "covidVac": "true"},
                    {"_id": '62a96838661ebf46b9757856', "username": 'Aymie', "longitude": -121.9775886, "latitude": 47.5912949, "covidVac": "true"},
                    {"_id": '62a96a9b9d677d87d906cf07', "username": 'Jennifer', "longitude": -121.9778281, "latitude": 47.5913705, "covidVac": "true"},
                    {"_id": '62aab1819d677d87d906cf0a', "username": 'Karl_1922', "longitude": -121.9778427, "latitude": 47.591303, "covidVac": "true"},
                    {"_id": '62aadf89fd2f9e2b08b9a8e9', "username": 'RL_Jackson', "longitude": -121.97341, "latitude": 47.59003, "covidVac": "true"},
                    {"_id": '62aba5f5fd2f9e2b08b9a8f6', "username": 'Ally_84', "longitude": -121.9781, "latitude": 47.5931, "covidVac": "true"},
                    {"_id": '62abad69fd2f9e2b08b9a901', "username": 'Kramer_81', "longitude": -121.9710291, "latitude": 47.5995249, "covidVac": "true"},
                    {"_id": '62ac1b5efde20edaf7506a30', "username": 'Jerry_Seinfeld01', "longitude": -121.9719063, "latitude": 47.5915249, "covidVac": "true"},
                    {"_id": '62ad6ba0482366b84cf70590', "username": 'Cindy2', "longitude": -121.975973, "latitude": 47.598051, "covidVac": "true"}
                ])
            })
    }, [])

    const deleteHandler = (_id) => {
        axios.delete(`https://localhost:8443/api/locations/${_id}`)
            .then( res => {
                let filterLocations = allLocations.filter( e => e._id !== _id)
                setAllLocations(filterLocations)
            })
            .catch( err => {
                console.log(err)
            })
    }

    return (
        <div class="w3-container">
            <h2>All Users</h2>
            <Link to="/Dashboard" class="w3button w3-border">Dashboard</Link> <Link to="/">Login</Link>
            <table class="w3-table-all w3-hoverable">
                <thead>
                    <tr class="w3-blue">
                        <th>Username</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allLocations.map( (e, index) => (
                            <tr>
                                <td>{e.username}</td>
                                <td>{e.longitude}, {e.latitude}</td>
                                {/* <td>⭐</td> */}
                                <td>
                                    <Link to={`/edit/${e._id}`}>Edit</Link> | 
                                    <button class="w3-button w3-blue w3-ripple" onClick={ () => {deleteHandler(e._id)}}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default AllUsers