import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { clearLoginState } from '../redux/slices/loginSlice';

interface FormData {
  account_company: string;
  destination_Lat: number;
  destination_Long: number;
  new_destinationaddress: string;
  new_destinationcity: string;
  new_destinationname: string
  new_destinationpostalcode:string
  new_destinationpremid:string
  new_destinationstate:string
  new_movementreason:string
  new_numitemsmoved:number
  new_originaddress:string
  new_origincity:string
  new_originname:string
  new_originpostalcode:string
  new_originpremid:string
  new_originstate:string
  new_shipmentsstartdate:string
  new_species:string
  origin_Lat:number
  origin_Lon:number
}


const MovementForm = () => {
  const [formData,setFormData] = useState<FormData>({
    account_company: '',
  destination_Lat: 0,
  destination_Long: 0,
  new_destinationaddress: '',
  new_destinationcity: '',
  new_destinationname: '',
  new_destinationpostalcode:'',
  new_destinationpremid:'',
  new_destinationstate:'',
  new_movementreason:'',
  new_numitemsmoved:0,
  new_originaddress:'',
  new_origincity:'',
  new_originname:'',
  new_originpostalcode:'',
  new_originpremid:'',
  new_originstate:'',
  new_shipmentsstartdate:'',
  new_species:'',
  origin_Lat:0,
  origin_Lon:0
})
const navigate = useNavigate()
const [loading,setLoading] =useState<boolean>(false)
const dispatch = useDispatch<AppDispatch>()

const auth_token = localStorage.getItem('token')
const handleFormSubmit = (e:React.FormEvent) =>{
    e.preventDefault();
    setLoading(true)

    const submitData = async () =>{
        try{
            let response = await axios.post('https://animal-movement-backend-1.onrender.com/api/movement_records',formData,{headers: {
              Authorization: `Bearer ${auth_token}`
            }})
            navigate('/movements')
        }catch(e){
            setLoading(false)
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
        <legend>Add a New Movement</legend>

        <label htmlFor="nom">Company Name:</label>
        <input type="text" id="nom" name="account_company" value={formData.account_company} onChange={handleChange}></input>
        <label htmlFor="prenom">Origin PremiseId:</label>
        <input type="text" id="prenom" name="new_originpremid" value={formData.new_originpremid} onChange={handleChange}></input>
        <label htmlFor="prenom">Destination PremiseId:</label>
        <input type="text" id="prenom" name="new_destinationpremid" value={formData.new_destinationpremid} onChange={handleChange}></input>
        <label htmlFor="prenom">Origin Latitude:</label>
        <input type="text" id="prenom" name="origin_Lat" value={formData.origin_Lat} onChange={handleChange}></input>
        <label htmlFor="prenom">Origin Longitude:</label>
        <input type="text" id="prenom" name="origin_Lon" value={formData.origin_Lon} onChange={handleChange}></input>
        <label htmlFor="prenom">Destination Latitude:</label>
        <input type="text" id="prenom" name="destination_Lat" value={formData.destination_Lat} onChange={handleChange}></input>
        <label htmlFor="prenom">Destination Longitude:</label>
        <input type="text" id="prenom" name="destination_Long" value={formData.destination_Long} onChange={handleChange}></input>
        <label htmlFor="prenom">Origin Name:</label>
        <input type="text" id="prenom" name="new_originname" value= {formData.new_originname} onChange={handleChange}></input>
        <label htmlFor="prenom">Origin Address:</label>
        <input type="text" id="prenom" name="new_originaddress" value={formData.new_originaddress} onChange={handleChange}></input>
        <label htmlFor="prenom">Origin City:</label>
        <input type="text" id="prenom" name="new_origincity" value={formData.new_origincity} onChange={handleChange}></input>
        <label htmlFor="prenom">Origin Postal:</label>
        <input type="text" id="prenom" name="new_originpostalcode" value={formData.new_originpostalcode} onChange={handleChange}></input>
        <label htmlFor="prenom">Origin State:</label>
        <input type="text" id="prenom" name="new_originstate" value={formData.new_originstate} onChange={handleChange}></input>
        <label htmlFor="prenom">Destination Name:</label>
        <input type="text" id="prenom" name="new_destinationname" value={formData.new_destinationname} onChange={handleChange}></input>
        <label htmlFor="prenom">Destination Address:</label>
        <input type="text" id="prenom" name="new_destinationaddress" value={formData.new_destinationaddress} onChange={handleChange}></input>
        <label htmlFor="prenom">Destination City:</label>
        <input type="text" id="prenom" name="new_destinationcity" value={formData.new_destinationcity} onChange={handleChange}></input>
        <label htmlFor="prenom">Destination Postal:</label>
        <input type="text" id="prenom" name="new_destinationpostalcode" value={formData.new_destinationpostalcode} onChange={handleChange}></input>
        <label htmlFor="prenom">Destination State:</label>
        <input type="text" id="prenom" name="new_destinationstate" value={formData.new_destinationstate} onChange={handleChange}></input>

        <label htmlFor="prenom">Shipment Date:</label>
        <input type="text" id="prenom" name="new_shipmentsstartdate" placeholder='DD/MM/YY' value={formData.new_shipmentsstartdate} onChange={handleChange}></input>
        <label htmlFor="prenom">Species:</label>
        <input type="text" id="prenom" name="new_species" value={formData.new_species} onChange={handleChange}></input>
        <label htmlFor="prenom">Animals Moved:</label>
        <input type="text" id="prenom" name="new_numitemsmoved" value={formData.new_numitemsmoved} onChange={handleChange} ></input>
        <label htmlFor="prenom">Movement Reason:</label>
        <input type="text" id="prenom" name="new_movementreason" value={formData.new_movementreason} onChange={handleChange}></input>

        
        





    </fieldset>

  <input type="submit" value="Submit"></input>
</form>
  )
}

export default MovementForm