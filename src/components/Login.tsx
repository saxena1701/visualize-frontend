import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserAsync, setAuthState } from '../redux/slices/loginSlice'

interface FormData{
    email:string,
    password:string
}
interface Alert{
    alert:string
}

const Login = () => {
    const [formData,setFormData] = useState<FormData>({
        email : "",
        password:""
    })
    const {isAuthenticated,error} = useSelector((state:RootState)=>state.login)
    const [loading,setLoading] = useState(false)
    const [alert,setAlert] = useState<Alert>({
        alert:""
    })
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const handleFormSubmit = (e:React.FormEvent) =>{
        e.preventDefault();
        dispatch(loginUserAsync(formData)).then(response=>{
            console.log(response)
            if(response.payload){
                navigate('/map')
            }else{
                console.log(error)
                setLoading(false)
                setAlert({
                    alert:"Login Failed"
                })
                setFormData({
                    email : "",
                    password:""
                })
               
            }
        })
        
        
       
        
    }

    const handleAlert = () =>{
        setAlert(
            {
                alert:""
            }
        )
        setLoading(true)
    }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = e.target
        setFormData({
            ...formData,[name]:value
        })

    }
    
    useEffect(()=>{
        if(localStorage.getItem('token')){
            dispatch(setAuthState())
        }
        if(isAuthenticated===true){
            console.log("redirecting")
            navigate('/map')
        }
    },[])

  return (
    <div className="login__card--container">
    
        <div className="manual__login">
            <form onSubmit={handleFormSubmit} className="manual__login--form">
                <input type="email" placeholder="Email" name="email" id="email" onChange={handleChange}></input>
                <input type="password" placeholder="Password" name="password" onChange={handleChange} id="password"></input>
                <button className="btn btn--manual" onClick={handleAlert}>Log In</button>
            </form>
        </div><br></br>
        {loading===true?<div>Logging in...</div>:<></>}
        {alert.alert!==""?<div>Invalid Credentials</div>:<></>}

	<hr className="seperate__line"></hr>

	<div className="create__account">
		Don't have an account? Create <Link to="/register">Register Here</Link>
	</div>
</div>
  )
}

export default Login