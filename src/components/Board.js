import Watermelon_chess_board from '../assets/Watermelon_chess_board.png'
import '../styles/game.css'
import { useState,useEffect } from 'react'
import Points from './Points'
import pointData from '../data/pointStatus'
import {playersTeamOne,playersTeamTwo} from '../data/players'

function Board() {
  const [pointDataState,changePointData] = useState(pointData)
  const [setPlayerState,changePlayerState] = useState({playersTeamOne,playersTeamTwo})
  const [pointStore,changePointStore] = useState([])

  const changeStatus = (newarr) =>{
    //very important
    var temparr = [...newarr]
    
    temparr.forEach((element) => {
      if(element.isPlaced!=="empty") element.isPlaced="empty";
    });
  
    for (const index in setPlayerState.playersTeamOne) {
      if (setPlayerState.playersTeamOne.hasOwnProperty(index)) {
        temparr[setPlayerState.playersTeamOne[index]].isPlaced=String(index);
      }
    }

    for (const index in setPlayerState.playersTeamTwo) {
      if (setPlayerState.playersTeamTwo.hasOwnProperty(index)) {
        temparr[setPlayerState.playersTeamTwo[index]].isPlaced=String(index);
      }
    }

    changePointData(temparr)
  }

  const makemove = (coin,pos) =>{

    var temp = setPlayerState;

    //get current pos of coin and check possibilities

    //pos-1
    if(pos-1>21 && pointStore.includes(pos-1)){
      console.log("invalid input")
    } 
    else{
      if(temp.playersTeamOne[coin]!==undefined){
        temp.playersTeamOne[coin] = parseInt(pos-1);
      }
      else if(temp.playersTeamTwo[coin]!==undefined){
        temp.playersTeamTwo[coin] = parseInt(pos-1);
      }
      else{
        console.log('undefined')
      }
      var playersTeamOne = temp.playersTeamOne
      var playersTeamTwo = temp.playersTeamTwo
      
      changePlayerState({playersTeamOne,playersTeamTwo})
    }
  }

  useEffect(()=>{
    changePointStore(Object.values(setPlayerState.playersTeamOne).concat(Object.values(setPlayerState.playersTeamTwo)))
    /*Handle the input before this*/
    //after button pressed and updates the player state
    changeStatus(pointDataState)
  },[setPlayerState]);
  
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