import { useContext, useState } from 'react'
import './register.css'
import { AuthContext } from '../../context/authContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
        email : undefined,
        country : undefined,
        city : undefined,
        phone : undefined
    })
    const navigate = useNavigate()
    const { dispatch, loading, error } = useContext(AuthContext)

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
        console.log(credentials)
    }
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("http://localhost:8800/api/auth/register", credentials)
            console.log(res)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
            navigate("/")
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response?.data })
            console.log(error)

        }

    }

    return (
        <div className='login'>
            <div className="lContainer">
                <input type="text" placeholder='username' id='username' className="lInput" onChange={handleChange}  />
                <input type="password" placeholder='password' id='password' className="lInput" onChange={handleChange} />
                <input type="text" placeholder='email' id='email' className="lInput" onChange={handleChange} />
                <input type="text" placeholder='country' id='country' className="lInput" onChange={handleChange} />
                <input type="text" placeholder='city' id='city' className="lInput" onChange={handleChange} />
                <input type="text" placeholder='phone' id='phone' className="lInput" onChange={handleChange} />

                <button disabled={loading} className='lButton' onClick={handleClick}>Create Account</button>
                
            </div>

        </div>
    )
}

export default Register


