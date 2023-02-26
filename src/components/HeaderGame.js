import React,{useState} from 'react'
import vs from '../assets/viking2.png'
import '../styles/gameHeader.css'
import MyHealthBar from './MyHealthBar'

function HeaderGame({setPlayerState,lmArray}) {
  return (
    <div className='header' style={{boxSizing:'border-box'}}>
      <div className='headerGame'>
          <MyHealthBar team={1} setPlayerState={setPlayerState}/>
          {/* <div className='cholasScore'>
            <h3>{Object.keys(setPlayerState.playersTeamOne).length-2}</h3>
          </div> */}
          <div className='cholasTeamName'>
            <h1>Cholas</h1>
          </div>
          <img src={vs} className='vikingImg' height='60px' width='60px'></img>
          <div className='pandiasTeamName'>
            <h1>Pandias</h1>
          </div>
          {/* <div className='pandiasScore'>
            <h3>{Object.keys(setPlayerState.playersTeamTwo).length-2}</h3>
          </div> */}
          <MyHealthBar team={2} setPlayerState={setPlayerState} />
      </div>  
    </div>
  )
}

export default HeaderGame