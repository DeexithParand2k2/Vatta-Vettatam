import React,{useEffect, useState} from 'react'
import '../styles/controller.css'

function NextMoveRed({validMoves,setPlayerState,makemove}) {
  const [pressedRed,changePressedRed] = useState('');
  const [availablePoints,changeAvailablePoints] = useState();

  useEffect(()=>{
    changeAvailablePoints(validMoves[pressedRed])
  },[pressedRed])

  return (

    <div className='redControllerHolder'>
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
                                //to update the state back to old part
                                changeAvailablePoints()
                                changePressedRed()
                            }}>
                                {eachEle+1}
                            </div>
                        )
                    })
                }
            </div>
        }

        {availablePoints!==undefined && availablePoints.length===0 &&
            <div className='redEntry'>
                {/* <FontAwesomeIcon icon="fa-solid fa-lock" /> */}
                <div className='standaloneKey'>L</div>
            </div>
        }

        {availablePoints===undefined &&
            <div className='redEntry'>
                {/* <FontAwesomeIcon icon="fa-solid fa-lock" /> */}
                <div style={{visibility:'hidden'}} className='standaloneKey'></div>
            </div>
        }

        {/* <button onClick={() => chooseRed({pressedRed,selectedRedPoint})}>Move Red</button> */}
        
    </div>
  )
}

export default NextMoveRed
