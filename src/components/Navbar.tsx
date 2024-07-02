import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { clearLoginState } from '../redux/slices/loginSlice'
const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const auth_token = localStorage.getItem('token')
  const {isAuthenticated} = useSelector((state:RootState)=>state.login)

  const handleLogout = async()=>{
    if(isAuthenticated){
      let response = await axios.get("https://animal-movement-backend-1.onrender.com/auth/logout",{headers: {
      Authorization: `Bearer ${auth_token}`
    }})

      dispatch(clearLoginState())
    }

    navigate('/')
    
  }

  return (
    <div className="navbar">
        
        <div className="navbar-content">
            <Link to='/map'><b>Visualize Movements</b></Link>
        </div>
        <div className="navbar-content">
            <Link to='/farms'><b>Farms</b></Link>
        </div>
        <div className="navbar-content">
            <Link to='/movements'><b>Movement Record</b></Link>
        </div>
        {isAuthenticated?<div className="navbar-content" onClick={handleLogout}>
            <a href='#'>Logout</a>
        </div>:<></>}
    </div>
  )
}

export default Navbar