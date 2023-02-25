import Watermelon_chess_board from '../assets/Watermelon_chess_board.png'
import '../styles/game.css'
import { useState,useEffect } from 'react'
import Points from './Points'
import pointData from '../data/pointStatus'
import {playersTeamOne,playersTeamTwo,validMovesArray,opponentCheckArray} from '../data/players'
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from 'react'
import {Modal,Box,Typography,Snackbar} from '@mui/material'
import NextMoveRed from './NextmoveRed.js'
import ptsnear from '../data/ptsnear'
import NextMoveBlue from './NextmoveBlue'
import io from 'socket.io-client'
import coinsound from '../soundeffect/Chess coin move.mp3'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const socket = io.connect('http://localhost:3001')

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  borderRadius: "10px",
  bgcolor: "background.paper",
  textAlign: "center",
  p: 4
};

const playAudio = audio => {
  console.log('sound play')
  const audioToPlay = new Audio(audio);
  audioToPlay.play();
};

function Board({callBackPlayerState}) {
  //map points intially with isplaced as empty, and top,left pos
  const [pointDataState,changePointData] = useState(pointData)
  const [setPlayerState,changePlayerState] = useState({playersTeamOne,playersTeamTwo})
  const [pointStore,changePointStore] = useState([])
  const [open, setOpen] = useState(false);
  const [validMoves,changeValidMoves] = useState(validMovesArray);
  const [opponentCheck,changeOpponentCheck] = useState(opponentCheckArray)
  const [latestMove,changeLatest] = useState()
  const [winner,changeWinner] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useState(()=>{
    socket.on('opening_check',(data)=>{
      console.log('from server',data)
    })
  },[])

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

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

  //called from make move
  const edgeCaseSuicideMove = (key,pos) =>{
    var currTeam = key[0]
    var searchObj = (currTeam==='r')?setPlayerState.playersTeamTwo:setPlayerState.playersTeamOne
    var retVal = false

    //console.log(opponentCheck[key])
    //console.log(searchObj)
    opponentCheck[key].forEach((opponentPos)=>{
      //opponent pos
      const oppkey = Object.keys(searchObj).find(key => searchObj[key] === opponentPos);
      if(validMoves[oppkey].length===1 && validMoves[oppkey][0]===pos-1){
        console.log('hello')
        retVal = true
      }
    })

    return retVal
  }

  //send data as position
  const makemove = (coin,pos) =>{
    var temp = setPlayerState;
    changeLatest(coin)

    var suicideFlag = false

    //detect suicide move
    //key is the one which will be deleted by the coins move
    Object.keys(validMoves).forEach((key)=>{
      /* 
        edge case 1. 
        key and coin shouldn't be nearby
        from ptsnear, get pos of key
        check if index of coin is present in ptsnear
      */
      /*
        edge case 2
        get the opponent pos using opponentcheck
        check if the validmoves[opppos].length=1 and validmoves[opppos][0]===pos
        then not a suicide move
      */

      if(!ptsnear[getCurrPos(key)].includes(getCurrPos(coin)) && key[0]===coin[0] && key!==coin && validMoves[coin].includes(validMoves[key][0]) && validMoves[key].length===1 && validMoves[key][0]===pos-1 && opponentCheck[key].length!==0){
        //console.log(key,coin,validMoves[key][0]===pos-1,validMoves[key].length===1,validMoves[coin].includes(validMoves[key][0]),validMoves[key][0],opponentCheck[key].length!==0)
        console.log(edgeCaseSuicideMove(key,pos))
        if(!edgeCaseSuicideMove(key,pos)){
          suicideFlag = true;
        }
      }
    })

    // console.log(coin,suicideFlag)

    //pos-1
    if(suicideFlag){
      console.log('Be careful its a suicide move')
      handleOpen()
    }
    else if(pointStore.includes(pos-1)){
      console.log("invalid input")
      handleOpen()
    } 
    else if(!validMoves[coin].includes(pos-1)){
      console.log("Can Move only one step")
      handleOpen()
    }
    else{
      playAudio(coinsound)
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

  const doRemoval = (key) =>{
    console.log(pointStore)
    var tempValidMoves = validMoves
    var tempOpponentCheck = opponentCheck
    var tempPlayerState = setPlayerState
    var tempPointStore = pointStore
    var holdpos;
    delete(tempValidMoves[key]);
    changeValidMoves(tempValidMoves)
    delete(tempOpponentCheck[key])
    changeOpponentCheck(tempOpponentCheck)
    if(tempPlayerState.playersTeamOne[key]!==undefined){
      holdpos = tempPlayerState.playersTeamOne[key]
      delete tempPlayerState.playersTeamOne[key]
      changePlayerState(tempPlayerState)
    }
    else{
      holdpos = tempPlayerState.playersTeamTwo[key]
      delete tempPlayerState.playersTeamTwo[key]
      changePlayerState(tempPlayerState)
    }
    tempPointStore.splice(tempPointStore.indexOf(holdpos), 1);
    changePointStore(tempPointStore)
    console.log(tempPointStore)

    var tempPointDataState = pointDataState
    tempPointDataState[holdpos].isPlaced="empty"
    changePointData(tempPointDataState)
    changeStatus(pointDataState)

    //var tempValidMoves
    updateValidMoves(validMoves)

    callBackPlayerState(setPlayerState)

    //update socket after deletion
    socket.emit("get_socket_validmove_second",validMoves)

    console.log(tempPlayerState)
  }

  const checkForRemoval = () =>{
    //valid moves array must be empty, then for the same key, opponentcheck must have some val
    Object.keys(validMoves).forEach((key)=>{
      if(validMoves[key].length===0 && opponentCheck[key].length!==0 && key[0]!==latestMove[0]){
        doRemoval(key);
      }
    })

    //call remove key function and update pointstore
  }

  const checkWinner = (teamOneSize,teamTwoSize) =>{
    if(teamTwoSize===2){
      changeWinner('Cholas')
      console.log(winner)
      handleOpenModal()
      //red should will be winning here
    }
    if(teamOneSize===2){
      changeWinner('Pandyas')
      console.log(winner)
      handleOpenModal()
      //red should will be winning here
    }
  }

  //check whether the position is only within neighbours
  useEffect(()=>{
    //change the valid moves
    updateValidMoves(validMoves);

    //update opponent checkers
    updateOpponentCheckers(opponentCheck);

    //send updated validmoves after its updated
    socket.emit("get_socket_validmove",validMoves)
    socket.emit("get_socket_validmove_second",validMoves)

    //create one for invalidChecker(opponents blocking)
    //then checking to be done for removal
    //different checking to end game
    checkForRemoval();

    //check winner
    checkWinner(Object.keys(setPlayerState.playersTeamOne).length,Object.keys(setPlayerState.playersTeamTwo).length);
    
  },[pointStore])

  //listen to socket message
  useEffect(()=>{
    socket.on("moving_coin",(coin,pos)=>{
      //makemove(moveArr[0],parseInt(moveArr[1]))
      makemove(coin,pos)
      playAudio(coinsound)
    })
  },[socket])

  useEffect(()=>{
    changePointStore(Object.values(setPlayerState.playersTeamOne).concat(Object.values(setPlayerState.playersTeamTwo)))
    /*Handle the input before this*/
    //after makemove, update isplaced using pointDataState, each time setPlayerState changes 
    changeStatus(pointDataState)
    checkForRemoval();

  },[setPlayerState]);

  return (
      <div className='gamediv'>
        <NextMoveRed validMoves={validMoves} makemove={makemove} setPlayerState={setPlayerState}/>
        <div className='boardHandler'>
            <img className="boardImg" src={Watermelon_chess_board} alt="watermelon_chess_board"/>
            <Points pointData={pointDataState} />
        </div>
        <NextMoveBlue validMoves={validMoves} makemove={makemove} setPlayerState={setPlayerState}/>

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {winner} Win
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {winner} for a reason
            </Typography>
          </Box>
        </Modal>

        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{vertical:"bottom",horizontal:"right"}}>
          <Alert onClose={handleClose} severity="warning">
            Suicide Move
          </Alert>
        </Snackbar>
      </div>
  )
}

export default Board