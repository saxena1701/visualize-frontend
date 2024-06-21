import React from 'react'


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

interface Props {
    movementData: DataItem;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
   
}

const Movement : React.FC<Props>= ({movementData,onMouseEnter, onMouseLeave}) => {
  return (
    <div className="movement-card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
  <div className="movement-container">
    <div className="left">
      <div className="status-ind"></div>
    </div>
    <div className="right">
      <div className="text-wrap">
      <div className='text-move'><b>Origin</b></div>
                <div className='text-move'>Farm : {movementData.new_originname}</div>
                <div className='text-move'>Address :  {movementData.new_originaddress}, {movementData.new_origincity},{movementData.new_originpostalcode}</div>
                <div className='text-move'><b>Destination</b></div>
                <div className='text-move'>Farm : {movementData.new_destinationname}</div>
                <div className='text-move'>Address :  {movementData.new_destinationaddress}, {movementData.new_destinationcity},{movementData.new_destinationpostalcode}</div>
        
        <div className='text-move' ><b>Company</b> : {movementData.account_company}</div>
        <div className='text-move'> <b>Animals Moved</b> : {movementData.new_numitemsmoved}</div>
        <div className="text-move"><b>Timestamp</b> : {movementData.new_shipmentsstartdate}</div>
      </div>
      
    </div>
  </div>
</div>

  )
}

export default Movement