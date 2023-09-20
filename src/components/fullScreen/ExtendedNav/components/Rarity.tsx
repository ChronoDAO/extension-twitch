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
            <li key={rarity} style={{ borderColor: color }}>
              <button
                onClick={() => sendData(rarity)}
                style={{
                  borderColor: color,
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
            <li key={rarity} style={{ borderColor: color }}>
              <button
                onClick={() => sendData(rarity)}
                style={{
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
