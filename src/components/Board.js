import Watermelon_chess_board from '../assets/Watermelon_chess_board.png'
import '../styles/game.css'
import { useState,useEffect } from 'react'
import Points from './Points'
import pointData from '../data/pointStatus'
import {playersTeamOne,playersTeamTwo,validMovesArray,opponentCheckArray} from '../data/players'
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from 'react'
import NextMoveRed from './NextmoveRed.js'
import ptsnear from '../data/ptsnear'
import NextMoveBlue from './NextmoveBlue'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Board() {
  //map points intially with isplaced as empty, and top,left pos
  const [pointDataState,changePointData] = useState(pointData)
  const [setPlayerState,changePlayerState] = useState({playersTeamOne,playersTeamTwo})
  const [pointStore,changePointStore] = useState([])
  const [open, setOpen] = useState(false);
  const [validMoves,changeValidMoves] = useState(validMovesArray);
  const [opponentCheck,changeOpponentCheck] = useState(opponentCheckArray)

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

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

  //update isplaced in pointDataState 
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

  //send data as position
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

  const updateOpponentCheckers = (opponentCheck) =>{
    var tempObj = opponentCheck
    //loop through each key of opponentCheck
    Object.keys(tempObj).forEach((key)=>{
      if(key[0]==='r'){
        let currPos = getCurrPos(key);
        let nearPtArr = ptsnear[currPos]
        let opponentTeamArray = Object.values(setPlayerState.playersTeamTwo)
        let retarr = nearPtArr.filter(x => (pointStore.includes(x) && opponentTeamArray.includes(x)));
        tempObj[key] = retarr;
      }
      else{
        let currPos = getCurrPos(key);
        let nearPtArr = ptsnear[currPos]
        let opponentTeamArray = Object.values(setPlayerState.playersTeamOne)
        let retarr = nearPtArr.filter(x => (pointStore.includes(x) && opponentTeamArray.includes(x)));
        tempObj[key] = retarr;
      }

      changeOpponentCheck(tempObj)
    })
    //1.get the name & establish the opponent
  }

  //check whether the position is only within neighbours
  useEffect(()=>{
    //change the valid moves
    updateValidMoves(validMoves);

    //update opponent checkers
    updateOpponentCheckers(opponentCheck);
    console.log(opponentCheck.b6)

    //create one for invalidChecker(opponents blocking)
    //then checking to be done for removal
    //different checking to end game
    
  },[pointStore])

  useEffect(()=>{
    changePointStore(Object.values(setPlayerState.playersTeamOne).concat(Object.values(setPlayerState.playersTeamTwo)))
    /*Handle the input before this*/
    //after makemove update isplaced using pointDataState, each time setPlayerState changes 
    changeStatus(pointDataState)
  },[setPlayerState]);
  
  return (
    <div className='gamediv'>
      <NextMoveRed validMoves={validMoves} makemove={makemove} setPlayerState={setPlayerState}/>
      <div className='boardHandler'>
          <img className="boardImg" src={Watermelon_chess_board} alt="watermelon_chess_board"/>
          <Points pointData={pointDataState} />
      </div>
      <NextMoveBlue validMoves={validMoves} makemove={makemove} setPlayerState={setPlayerState}/>

      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{vertical:"bottom",horizontal:"right"}}>
        <Alert onClose={handleClose} severity="warning">
          Invalid Move!
        </Alert>
      </Snackbar>
    </div> 
  )
}

export default Board