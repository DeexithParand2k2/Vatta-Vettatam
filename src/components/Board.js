import Watermelon_chess_board from '../assets/Watermelon_chess_board.png'
import '../styles/game.css'
import { useState,useEffect } from 'react'
import Points from './Points'
import pointData from '../data/pointStatus'

const makemove = (coin,pos) =>{
  console.log(coin,pos)
}

function Board() {
  const [pointDataState,changePointData] = useState(pointData)

  const makemove = (one,two) =>{
    let temp = pointDataState
    temp[0].isPlaced="r2"
    changePointData(temp)
  }

  useEffect(()=>{
    console.log('state updated')
  },pointDataState)
  
  return (
    <>
      <div className='boardHandler'>
          <img className="boardImg" src={Watermelon_chess_board} alt="watermelon_chess_board"/>
          <Points pointData={pointDataState} />
      </div>
      <div>
        <input className="inptCoin" type="text" style={{margin:'3px'}} placeholder="Enter Name" />
        <input className="inptPlace" type="text" style={{margin:'3px'}} placeholder="Spawn" />
        <button onClick={()=>{
          var inpt1 = document.getElementsByClassName('inptCoin')[0].value;
          var inpt2 = document.getElementsByClassName('inptPlace')[0].value;
          makemove(inpt1,inpt2)
        }} type="button" style={{margin:'3px'}}>send</button>
      </div>
      
    </>
    
    //create controller here to change the state of the points based on input

  )
}

export default Board