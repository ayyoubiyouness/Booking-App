import { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './login.scss'
import { AuthContext } from '../../context/AuthContext'
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
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
        navigate("/")
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: { message: "You are not allowed!" }})
      }

      
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
        {error && <span>{error.message}</span>}
      </div>

    </div>
  )
}

export default Login
