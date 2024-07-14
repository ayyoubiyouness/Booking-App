import { useContext, useState } from 'react'
import './login.css'
import { AuthContext } from '../../context/authContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })
    const navigate = useNavigate()
    const { dispatch, loading, error } = useContext(AuthContext)

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("http://localhost:8800/api/auth/login", credentials)
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
                <input type="text" placeholder='username' id='username' className="lInput" onChange={handleChange} />
                <input type="text" placeholder='password' id='password' className="lInput" onChange={handleChange} />
                <button disabled={loading} className='lButton' onClick={handleClick}>Login</button>
                <span className='acount'>Don't have an account</span>

                <button className='lButton register' >
                    <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}  >
                        Register
                    </Link>
                </button>


                {error && <span>{error.message}</span>}
            </div>

        </div>
    )
}

export default Login
