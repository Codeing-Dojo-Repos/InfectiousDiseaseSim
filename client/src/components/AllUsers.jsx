import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AllUsers = props => {

    // state that holds array of  {} with username, location info
    const [allLocation, setAllLocation] = useState({})
    

    // useEffect to query userLocation database
    useEffect( () => {
        axios.get("http://localhost:8000/api/locations")
    })


    return (
        <div>
            AllUsers
            <table>
                <tr>
                    <th>Username</th>
                    <th>Location</th>
                    <th>Infected</th>
                    <th>Actions</th>
                </tr>
                {

                }
            </table>
         
            {/* display table */}
            {/* Have edit and delete icons */}

        </div>
    )
}
export default AllUsers