import React,{useEffect, useState} from 'react'
import '../styles/controller.css'

function NextMoveRed({validMoves,setPlayerState,makemove}) {
  const [pressedRed,changePressedRed] = useState('');
  const [availablePoints,changeAvailablePoints] = useState();

  useEffect(()=>{
    changeAvailablePoints(validMoves[pressedRed])
  },[pressedRed])

  return (

    <div>
        <div className='redCoins'>
            {
                Object.keys(setPlayerState.playersTeamOne).map((key)=>{
                    
                    return(
                        <div key={key} className="redkeys" onClick={()=>{
                            changePressedRed(key)
                        }}>
                            {key}
                        </div>
                    )
                })
            }    
        </div>
        
        {availablePoints!==undefined &&
            <div className='redEntry'>
                {
                    availablePoints.map((eachEle)=>{
                        return (
                            <div key={eachEle} className="redAvailableKeys" onClick={()=>{
                                makemove(pressedRed,eachEle+1)
                            }}>
                                {eachEle+1}
                            </div>
                        )
                    })
                }
            </div>
        }

        {/* <button onClick={() => chooseRed({pressedRed,selectedRedPoint})}>Move Red</button> */}
        
    </div>
  )
}

export default NextMoveRed
