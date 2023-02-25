import React,{useState} from "react";
import Board from "./components/Board";
import HeaderGame from './components/HeaderGame'
import {playersTeamOne,playersTeamTwo} from '../src/data/players'
import './App.css';

function App() {
  const [setPlayerState,changePlayerState] = useState({playersTeamOne,playersTeamTwo});
  const callBackPlayerState = (callback) =>{
    changePlayerState(callback)
  }
  return (
    <div className="Home">
      <HeaderGame setPlayerState={setPlayerState}/>
      {/* only board under flex, others pos fix */}
      <Board callBackPlayerState={callBackPlayerState} className="board" />
    </div>
  );
}

export default App;
