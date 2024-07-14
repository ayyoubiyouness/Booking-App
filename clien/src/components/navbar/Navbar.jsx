import { useContext } from 'react';
import './navbar.css'
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/authContext';
const Navbar = () => {

  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <div className='navbar'>
      <div className="navbarContainer">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }} >
          <span className="navbarLogo">
            Booking.com
          </span>
        </Link>
        {user ? user.username : <div className="navItems">
          <Link to='/register'>
            <button className="navButton">Register</button>
          </Link>

          <Link to='/login'>
            <button className="navButton">Login</button>
          </Link>


        </div>}
      </div>
    </div>
  )
}

export default Navbar
