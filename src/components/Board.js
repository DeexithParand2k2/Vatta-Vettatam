import Watermelon_chess_board from '../assets/Watermelon_chess_board.png'
import '../styles/game.css'
import { useState,useEffect } from 'react'
import Points from './Points'
import pointData from '../data/pointStatus'
import {playersTeamOne,playersTeamTwo,validMovesArray} from '../data/players'
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from 'react'
import {NextMoveRed,getSelectedRedPoint,getPressedRed} from './Nextmove.js'
import ptsnear from '../data/ptsnear'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Board() {
  const [pointDataState,changePointData] = useState(pointData)
  const [setPlayerState,changePlayerState] = useState({playersTeamOne,playersTeamTwo})
  const [pointStore,changePointStore] = useState([])
  const [open, setOpen] = useState(false);
  const [validMoves,changeValidMoves] = useState(validMovesArray);

  const [currRed,chooseRed] = useState({}) 

  useEffect(()=>{
    console.log('jolly maarudhu')
  },[currRed])

  let getCurrPos = (coin) =>{
    var temp = setPlayerState;
    if(temp.playersTeamOne[coin]!==undefined){
      return temp.playersTeamOne[coin];
    }
    else if(temp.playersTeamTwo[coin]!==undefined){
      return temp.playersTeamTwo[coin];
    }
    else return -1;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

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

    //pos-1
    if(pointStore.includes(pos-1)){
      console.log("invalid input")
      handleOpen()
    } 
    else if(!validMoves[coin].includes(pos-1)){
      console.log("Can Move only one step")
      handleOpen()
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

  const updateValidMoves = (validMovesObj) =>{
    var tempobj = validMovesObj
    //get coin value from key
    //get the position
    Object.keys(tempobj).forEach(coin => {
      let currPos = getCurrPos(coin);
      let validarr = ptsnear[currPos]
      let retarr = validarr.filter(x => !pointStore.includes(x));
      tempobj[coin] = retarr;
    });
    changeValidMoves(tempobj)
  }

  useEffect(()=>{
    //change the valid moves
    updateValidMoves(validMoves);
    
  },[pointStore])

  useEffect(()=>{
    changePointStore(Object.values(setPlayerState.playersTeamOne).concat(Object.values(setPlayerState.playersTeamTwo)))
    /*Handle the input before this*/
    //after button pressed and updates the player state
    changeStatus(pointDataState)
  },[setPlayerState]);
  
  return (
    <div className='gamediv'>
      <NextMoveRed validMoves={validMoves} chooseRed={chooseRed} setPlayerState={setPlayerState}/>
      <div className='boardHandler'>
          <img className="boardImg" src={Watermelon_chess_board} alt="watermelon_chess_board"/>
          <Points pointData={pointDataState} />
      </div>
      {/* <div>
        <input className="inptCoin" type="text" style={{margin:'3px'}} placeholder="Enter Name" />
        <input className="inptPlace" type="text" style={{margin:'3px'}} placeholder="Spawn" />
        <button onClick={()=>{
          var inpt1 = document.getElementsByClassName('inptCoin')[0].value;
          var inpt2 = document.getElementsByClassName('inptPlace')[0].value;
          makemove(inpt1,inpt2)
        }} type="button" style={{margin:'3px'}}>send</button>
      </div> */}
      <button onClick={()=>{
          makemove(currRed.pressedRed,currRed.selectedRedPoint+1)
      }} type="button" style={{margin:'3px'}}>send</button>  

      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{vertical:"bottom",horizontal:"right"}}>
        <Alert onClose={handleClose} severity="warning">
          Invalid Move!
        </Alert>
      </Snackbar>
    </div>
    
    //create controller here to change the state of the points based on input

  )
}

export default Board