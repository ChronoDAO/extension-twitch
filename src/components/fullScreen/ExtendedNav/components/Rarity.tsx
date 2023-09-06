import React from "react";

export default function Rarity(props) {
  const rarities = {
    common: "#A4B0BE",
    uncommon: "#1CBF6A",
    rare: "#159CFD",
    epic: "#A369FF",
    legendary: "#E67E22",
    mythic: "#FFD32A",
    exalted: "#EF5777",
    exotic: "#FFEE00",
    transcendant: "#000000",
    unique: "#A24B72",
  };

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
