import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Farm from './Farm'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { clearLoginState } from '../redux/slices/loginSlice'


interface DataItem{
    id : number,
    premiseid : String,
    total_animal : number
}


const FarmList = () => {

    const [farmList,setFarmList] = useState<DataItem[]>([])
    const [loading,setloading] = useState<boolean>(true)
    const {isAuthenticated} = useSelector((state:RootState)=>state.login)
    const auth_token = localStorage.getItem('token')
    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()
    useEffect(()=>{
        if(isAuthenticated===false){
            navigate('/')
        }else{
            const fetchFarms = async()=>{
                try{
                    let response = await axios.get('https://animal-movement-backend.onrender.com/api/population_records',{headers: {
                    Authorization: `Bearer ${auth_token}`
                  }})
                    setFarmList(response.data)
                    setloading(false)
                }catch(e){
                    dispatch(clearLoginState())
                }
            }
            fetchFarms()
        }
    },[isAuthenticated])

    

    if(loading || farmList.length==0){
        return <div>Loading....</div>
    }

    return(
            <div>
                    <div className='page-title'>
                        <p style={{fontSize:'20px'}}><b>Farms</b></p>
                        <Link to="/farmForm" ><p style={{fontSize:'20px'}}><b>Add a new farm</b></p></Link>
                    </div>
                    <div className='cardContainer'>

                    {
                        farmList.map((item,index)=>{
                            return <Farm farmData = {item}></Farm>
                        })
                    }
                    </div>
            </div>
        
        
    )
}

export default FarmList