import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../redux/store'
import { clearLoginState } from '../redux/slices/loginSlice'

interface FormData{
    premiseid:string,
    total_animal:number
}


const FarmForm = () => {
    const [formData,setFormData] = useState<FormData>({
        premiseid : "",
        total_animal : 0
    })
    const auth_token = localStorage.getItem('token')
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [loading,setLoading] =useState<boolean>(false)
    const handleFormSubmit = (e:React.FormEvent) =>{
        e.preventDefault();
        setLoading(true)

        const submitData = async () =>{
            try{
                let response = await axios.post('https://animal-movement-backend.onrender.com/api/population_records',formData,{headers: {
                    Authorization: `Bearer ${auth_token}`
                  }})
                console.log(response)
                navigate('/farms')
            }catch(e){
                dispatch(clearLoginState())
            }
        }
        setTimeout(()=>{
            submitData()
        },5000)

        

    }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = e.target
        setFormData({
            ...formData,[name]:value
        })

    }
    
    if(loading){
        return (
            <div>Submitting Details...</div>
        )
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <fieldset>
                <legend>Add a New Farm</legend>

                <label htmlFor="nom">PremiseID:</label>
                <input type="text" id="nom" name="premiseid" value={formData.premiseid} onChange={handleChange}></input>

                <label htmlFor="prenom">Animal Population:</label>
                <input type="text" id="prenom" name="total_animal" value={formData.total_animal} onChange={handleChange}></input>


            </fieldset>

        <input type="submit" value="Submit"></input>
        </form>

    )
}

export default FarmForm