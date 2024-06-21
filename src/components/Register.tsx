import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { registerUserAsync } from '../redux/slices/registerSlice'
import { AppDispatch, RootState } from '../redux/store'

interface FormData{
    name:string,
    email:string,
    password:string
}

interface Alert{
    alert:string
}

const Register = () => {
    const [formData,setFormData] = useState<FormData>({
        name : "",
        email : "",
        password:""
    })
    const {error} = useSelector((state:RootState)=>state.register)
    const [alert,setAlert] = useState<Alert>({
        alert:""
    })
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const handleFormSubmit = (e:React.FormEvent) =>{
        
        e.preventDefault();
        dispatch(registerUserAsync(formData)).then(response=>{
            if(response.payload){
                navigate('/')
            }else{
                console.log(error)
                setAlert({
                    alert:"Registration failed"
                })
                setFormData({
                    name : "",
                    email : "",
                    password:""
                })
               
            }
        })
    }

    

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = e.target
        setFormData({
            ...formData,[name]:value
        })

    }
  return (


    <div className="login__card--container">
    
        
    
        <div className="manual__login">
            <form onSubmit={handleFormSubmit} className="manual__login--form">
                <input type="text" placeholder="Name" id="name" name='name' value={formData.name} onChange={handleChange}></input>
                <input type="text" placeholder="Email" id="email" name='email' value={formData.email} onChange={handleChange}></input>

                <input type="password" placeholder="Password" id="password" name='password' value={formData.password} onChange={handleChange}></input>
                <button className="btn btn--manual">Sign Up</button>
            </form>
        </div><br></br>
        {alert.alert!==""?<div>{alert.alert}</div>:<></>}

	<hr className="seperate__line"></hr>    

	<div className="create__account">
		Have an account? Log In <Link to="/">here</Link>
	</div>
</div>
  )
}

export default Register