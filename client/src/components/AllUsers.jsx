import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AllUsers = props => {

    const [allLocations, setAllLocations] = useState([])
    //const navigate = useNavigate()

    useEffect( () => {
        axios.get("http://localhost:8000/api/locations") // TODO: change to ssl
            .then( res => {
                console.log(res)
                setAllLocations(res.data)
            })
            .catch( err =>{
                console.log(err)
            })
    }, [])

    const deleteHandler = (_id) => {
        axios.delete(`http://localhost:8000/api/locations/${_id}`)
            .then( res => {
                let filterLocations = allLocations.filter( e => e._id !== _id)
                setAllLocations(filterLocations)
            })
            .catch( err => {
                console.log(err)
            })
    }

    return (
        <div>
            <h2>All Users</h2>
            <Link to="/Dashboard">Dashboard</Link> <Link to="/">Login</Link>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Location</th>
                        <th>Infected</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                        <td>1</td><td>1</td><td>1</td>
                    </tr> */}
                    {
                        allLocations.map( (e, index) => (
                            <tr>
                                <td>{e.username}</td>
                                <td>{e.longitude}, {e.latitude}</td>
                                <td></td>
                                <td>Edit | <button onClick={ () => {deleteHandler(e._id)}}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default AllUsers