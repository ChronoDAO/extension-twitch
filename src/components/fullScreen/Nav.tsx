import { MouseEventHandler } from "react";
import "./Nav.scss";

export default function Nav(props) {
  const rarities = {
    commun: "#A4B0BE",
    uncommun: "#1CBF6A",
    rare: "#159CFD",
    epic: "#A369FF",
    legendary: "#E67E22",
    mythic: "#FFD32A",
    exalted: "#EF5777",
    exotic: "#FFEE00",
    transcendant: "#000000",
    unique: "#A24B72",
  };

  return (
    <>
      <div className="nav__wrapper">
        <div className="nav__header">
          <div className="logo">
            <img src="/dao.png" width={"55px"} height={"auto"} alt="" />
          </div>
          <button onClick={props.toggleFullScreen} className="fullScreen--btn">
            <img src="/see_more.svg" width={"45px"} alt="" />
          </button>
          <div className="inventory">
            <img src="/chest.svg" width={"32px"} alt="" />
            <p>51</p>
          </div>
          <div className="floorPriceInventory">$ 7050</div>
        </div>
        <div className="nav__body">
          <div className="rarity__wrapper">
            <ul>
              {Object.entries(rarities).map(([rarity, color], i) => (
                <li key={rarity}>
                  <p>{i * 127}</p>
                  <svg height="20" width="20">
                    <circle cx="10" cy="10" r="10" fill={color} />
                  </svg>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
