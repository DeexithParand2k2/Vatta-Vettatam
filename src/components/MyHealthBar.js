import React from "react";
import '../styles/myHealthBar.css'

const HealthBar = ({ team, maxHp = 100, hp = 100 } = {}) => {
  const barWidth = (hp / maxHp) * 100;
  if(team===1){
    return (
      <div>
        <div className="health-bar">
          <div className="bar" style={{ width: `${barWidth}%`, backgroundColor: "#D60D0A" }}></div>
          <div className="hit" style={{ width: `${0}%` }}></div>

          {/* <div
            style={{
              position: "absolute",
              top: "5px",
              left: 0,
              right: 0,
              textAlign: "center"
            }}
          >
            {hp} / {maxHp}
          </div> */}
        </div>

        <br />
      </div>
    );
  }
  else{
    return (
      <div>
        <div className="health-bar">
          <div className="bar" style={{ width: `${barWidth}%`, backgroundColor: "#4137CD" }}></div>
          <div className="hit" style={{ width: `${0}%` }}></div>

          {/* <div
            style={{
              position: "absolute",
              top: "5px",
              left: 0,
              right: 0,
              textAlign: "center"
            }}
          >
            {hp} / {maxHp}
          </div> */}
        </div>

        <br />
      </div>
    );
  }
  
};

export default function MyHealthBar({team,setPlayerState}) {
  if(team===1){
    //setBackGroundColor(team)
    return <HealthBar team={team} hp={(Object.keys(setPlayerState.playersTeamOne).length-2)*25} maxHp={100} />  
  }
  else{
    //setBackGroundColor(team)
    return <HealthBar team={team} hp={(Object.keys(setPlayerState.playersTeamTwo).length-2)*25} maxHp={100} />
  }
}

