import React from 'react'
import '../styles/game.css'
import {playersTeamOne,playersTeamTwo} from '../data/players'

const setColor = (isPlaced) =>{
    if(playersTeamOne.includes(isPlaced)===true){
        return "#750000"
    }
    if(playersTeamTwo.includes(isPlaced)===true){
        return "#050A30"
    }
    return "empty";
}

function Points({pointData}) {
  return (
        pointData.map((point)=>{
            return <div key={point.name} className="point" style={{backgroundColor:setColor(point.isPlaced),top:point.tpos,left:point.spos}}><p>{point.name}</p></div> 
        })
  )
}

export default Points