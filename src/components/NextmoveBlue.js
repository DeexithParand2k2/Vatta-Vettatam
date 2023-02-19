import React,{useEffect, useState} from 'react'
import '../styles/controller.css'

function NextMoveBlue({validMoves,setPlayerState,makemove}) {
  const [pressedBlue,changePressedBlue] = useState('');
  const [availablePoints,changeAvailablePoints] = useState();

  useEffect(()=>{
    changeAvailablePoints(validMoves[pressedBlue])
  },[pressedBlue])

  return (

    <div className='blueControllerHolder'>
        <div className='blueCoins'>
            {
                Object.keys(setPlayerState.playersTeamTwo).map((key)=>{
                    
                    return(
                        <div key={key} className="bluekeys" onClick={()=>{
                            changePressedBlue(key)
                        }}>
                            {key}
                        </div>
                    )
                })
            }    
        </div>
        
        {availablePoints!==undefined && availablePoints.length!==0 &&
            <div className='blueEntry'>
                {
                    availablePoints.map((eachEle)=>{
                        return (
                            <div key={eachEle} className="blueAvailableKeys" onClick={()=>{
                                makemove(pressedBlue,eachEle+1)
                                //to update the state back to old part
                                changeAvailablePoints()
                                changePressedBlue()
                            }}>
                                {eachEle+1}
                            </div>
                        )
                    })
                }
            </div>
        }

        {availablePoints!==undefined && availablePoints.length===0 &&
            <div className='blueEntry'>
                {/* <FontAwesomeIcon icon="fa-solid fa-lock" /> */}
                <div className='standaloneKey'>L</div>
            </div>
        }

        {availablePoints===undefined &&
            <div className='blueEntry'>
                {/* <FontAwesomeIcon icon="fa-solid fa-lock" /> */}
                <div style={{visibility:'hidden'}} className='standaloneKey'></div>
            </div>
        }

        {/* <button onClick={() => chooseBlue({pressedBlue,selectedBluePoint})}>Move Blue</button> */}
        
    </div>
  )
}

export default NextMoveBlue
