import React from 'react'

interface DataItem{
    id : number,
    premiseid : String,
    total_animal : number
}

interface Props{
    farmData : DataItem
}


const Farm : React.FC<Props>= ({farmData}) => {
  return (
    <div className="card">
  <div className="card-details">
    <p className="text-title">Farm ID : {farmData.premiseid}</p>
    <p className="text-body">Animal Population : {farmData.total_animal}</p>
  </div>
</div>
  )
}

export default Farm