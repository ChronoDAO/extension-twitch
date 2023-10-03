import React from "react";
import rarities from "../../../../rarities.jsx";

export default function Rarity(props) {
  const sendData = (rarity) => {
    props.fromChild(rarity);
  };
  return (
    <>
      <ul className="rarity__ul">
        {Object.entries(rarities)
          .slice(0, 5)
          .map(([rarity, color]) => (
            //@ts-ignore
            <li key={rarity} style={{ borderColor: color }}>
              <button
                onClick={() => sendData(rarity)}
                style={{
                  //@ts-ignore
                  borderColor: color,
                  //@ts-ignore
                  color: color,
                }}
              >
                <p> {rarity}</p>
              </button>
            </li>
          ))}
      </ul>
      <ul className="rarity__ul">
        {Object.entries(rarities)
          .slice(5, 10)
          .map(([rarity, color]) => (
            //@ts-ignore
            <li key={rarity} style={{ borderColor: color }}>
              <button
                onClick={() => sendData(rarity)}
                style={{
                  //@ts-ignore
                  color: color,
                }}
              >
                <p> {rarity}</p>
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}
