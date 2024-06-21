import  { Fragment, useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import axios from 'axios';
import randomColor from 'randomcolor'
import { useNavigate } from 'react-router-dom'
import Movement from './Movement';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { clearLoginState } from '../redux/slices/loginSlice';

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



const Map = () => {
    const [mapData,setMapData] = useState<DataItem[]>([])
    const [loading, setLoading] = useState(true);
    const {isAuthenticated} = useSelector((state:RootState)=>state.login)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const auth_token = localStorage.getItem('token')
    useEffect(()=>{
        if(isAuthenticated==false){
            navigate('/')
        }
        
        if(isAuthenticated===true){
            const fetchData = async()=>{
                try{
                    let response = await axios.get('https://animal-movement-backend.onrender.com/api/movement_records',{headers: {
                    Authorization: `Bearer ${auth_token}`
                  }})
                    console.log(response.data)
                    setMapData(response.data)
                    setLoading(false)
                }catch(e){
                    dispatch(clearLoginState())
                }
           }
    
           fetchData()
        }
        
       

    },[isAuthenticated])

    const [highlightedId, setHighlightedId] = useState<number | null>(null);

    const handleMouseEnter = (id: number) => {
        setHighlightedId(id);
        console.log(id)
    };

    const handleMouseLeave = () => {
        setHighlightedId(null);
    };
    console.log(isAuthenticated)
    

    return (
        <div className="map-container">
            <MapContainer className="map" center={[42.04312, -94.73784]} zoom={6} >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {
                mapData.map((item, idx) => {
                    // return <Fragment></Fragment>
                    let originCoords: L.LatLngExpression = [item.origin_Lat, item.origin_Lon]
                    let destCoords: L.LatLngExpression = [item.destination_Lat, item.destination_Long]
                    let color = randomColor()
                    return (
                        <Fragment>
                            <Polyline positions={[originCoords, destCoords]} color={color} />
                            <CircleMarker center={originCoords} radius={item.id==highlightedId?20:10} color={color}>
                                <Popup>
                                    <div><b>Origin</b></div>
                                    <div>Farm : {item.new_originname}</div>
                                    <div>Address :  {item.new_originaddress}, {item.new_origincity},{item.new_originpostalcode}</div>
                                    <div>Timestamp : {item.new_shipmentsstartdate}</div>
                                    <div>Company : {item.account_company}</div>
                                    <div>Animals Moved : {item.new_numitemsmoved}</div>
                                </Popup>
                            </CircleMarker>
                            <CircleMarker center={destCoords} radius={item.id==highlightedId?20:10} color={color}>
                                <Popup>
                                <div><b>Destination</b></div>
                                <div>Farm : {item.new_destinationname}</div>
                                <div>Address : {item.new_destinationaddress}, {item.new_destinationcity},{item.new_destinationpostalcode}</div>
                                    <div>Timestamp : {item.new_shipmentsstartdate}</div>
                                    <div>Company : {item.account_company}</div>
                                    <div>Animals Moved : {item.new_numitemsmoved}</div>
                                </Popup>
                            </CircleMarker>
                        </Fragment>
                    )
                })
            }

        </MapContainer>
        <div className='map-details'>
            {
                mapData.map((item,idx)=>{
                    return <Movement key={item.id} onMouseEnter={()=> handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave} movementData={item} ></Movement>
                })
            }
        </div>
        </div>
    );
};

export default Map;
