import React from "react";
import '../styles/myHealthBar.css'

const HealthBar = ({ maxHp = 100, hp = 100 } = {}) => {
  const barWidth = (hp / maxHp) * 100;
  return (
    <div>
      <div className="health-bar">
        <div className="bar" style={{ width: `${barWidth}%` }}></div>
        <div className="hit" style={{ width: `${0}%` }}></div>

        <div
          style={{
            position: "absolute",
            top: "5px",
            left: 0,
            right: 0,
            textAlign: "center"
          }}
        >
          {hp} / {maxHp}
        </div>
      </div>

      <br />
    </div>
  );
};

export default function MyHealthBar({setPlayerState}) {
  return (
    <HealthBar hp={(Object.keys(setPlayerState.playersTeamOne).length-2)*25} maxHp={100} />  
  );
}

