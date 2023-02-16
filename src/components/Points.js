import React from 'react'
import '../styles/game.css'

const setColor = (isPlaced) =>{
    if(isPlaced[0]==='r'){
        return "#DC0000"
    }
    if(isPlaced[0]==='b'){
        return "#362FD9"
    }
    if(isPlaced==='empty'){
        return "black";
    }
}

function Points({pointData}) {
  return (
        pointData.map((point)=>{
            return (
                <div key={point.name} className="point" style={{
                    backgroundColor:setColor(point.isPlaced),
                    top:point.tpos,
                    left:point.spos
                }}>
                    <p>{(point.isPlaced!=="empty")?point.isPlaced:point.name}</p>
                </div> 
            )
        })
  )
}

export default Points