import React,{useEffect, useState} from 'react'
import '../styles/controller.css'

const getSelectedRedPoint = (selectedRedPoint) =>{
    return selectedRedPoint
}

const getPressedRed = (pressedRed) =>{
    return pressedRed
}

function NextMoveRed({validMoves,setPlayerState,chooseRed}) {
  const [pressedRed,changePressedRed] = useState('');
  const [selectedRedPoint,changeSelectedRedPoint] = useState(-1);
  const [availablePoints,changeAvailablePoints] = useState();

  useEffect(()=>{
    changeAvailablePoints(validMoves[pressedRed])
  },[pressedRed])

  useEffect(()=>{
    console.log(`pos at ${selectedRedPoint}`)
  },[selectedRedPoint])

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
                                changeSelectedRedPoint(eachEle)
                            }}>
                                {eachEle+1}
                            </div>
                        )
                    })
                }
            </div>
        }

        <button onClick={() => chooseRed({pressedRed,selectedRedPoint})}>Move Red</button>
        
    </div>
  )
}

export {NextMoveRed,getSelectedRedPoint,getPressedRed}
