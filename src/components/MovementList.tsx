import React, { useEffect, useState } from 'react'
import Movement from './Movement'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';


interface DataItem {
    id: number;
    account_company: string;
    destination_Lat: number;
    destination_Long: number;
    new_destinationaddress: string;
    new_destinationcity: String;
    new_destinationname: String
    new_destinationpostalcode:String
    new_destinationpremid:String
    new_destinationstate:String
    new_movementreason:String
    new_numitemsmoved:number
    new_originaddress:String
    new_origincity:String;
    new_originname:String;
    new_originpostalcode:String;
    new_originpremid:String;
    new_originstate:String;
    new_shipmentsstartdate:String;
    new_species:String;
    origin_Lat:number;
    origin_Lon:number;
}

const MovementList = () => {
    const [movementList,setMovementList] = useState<DataItem[]>([])
    const [loading,setloading] = useState<boolean>(true)
    const {isAuthenticated} = useSelector((state:RootState)=>state.login)
    const auth_token = localStorage.getItem('token')

    const navigate=useNavigate()
    
    useEffect(()=>{
        if(isAuthenticated===false){
            navigate('/')
        }else{
            const fetchMovementData = async()=>{
                let response = await axios.get('https://animal-movement-backend-1.onrender.com/api/movement_records',{headers: {
                    Authorization: `Bearer ${auth_token}`
                  }})
                setMovementList(response.data)
                setloading(false)
            }
            fetchMovementData()
        }
    },[isAuthenticated])

    

    if(loading || movementList.length==0){
        return <div>Loading....</div>
    }

    return(
        <div>
            <div className='page-title'>
                        <p style={{fontSize:'20px'}}><b>Movements</b></p>
                        <Link to="/movementForm"><p style={{fontSize:'20px'}}><b>Add a new movement</b></p></Link>
                    </div>
            <div className='cardContainer'>
            {
                movementList.map((item,index)=>{
                    return <Movement movementData = {item} onMouseEnter={()=>{}} onMouseLeave={()=>{}}></Movement>
                })
            }
            </div>
        </div>
       
        
    )
}

export default MovementList