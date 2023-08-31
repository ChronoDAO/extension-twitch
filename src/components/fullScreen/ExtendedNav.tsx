import { MouseEventHandler } from "react";
import "./ExtendedNav.scss";

export default function ExtendedNav(props: {
  toggleFullScreen: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
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
    <div className="extendedNav__wrapper">
      <div className="extendedNav__header">
        <div>
          <button onClick={props.toggleFullScreen} className="fullScreen--btn">
            <img src="/see_less.svg" width={"45px"} alt="" />
          </button>
          <div className="logo">
            <img src="/dao.png" width={"55px"} height={"auto"} alt="" />
          </div>
        </div>
        <div>
          <div className="inventory">
            <img src="/chest.svg" width={"32px"} alt="" />
            <p>51</p>
          </div>
          <div className="floorPriceInventory">$ 7050</div>
        </div>
      </div>
      <div className="extendedNav__body">
        <ul>
          {Object.entries(rarities)
            .slice(0, 5)
            .map(([rarity, color]) => (
              <li key={rarity} style={{ borderColor: color, color: color }}>
                <p>{rarity}</p>
                <div className="svg"></div>
              </li>
            ))}
        </ul>
        <ul>
          {Object.entries(rarities)
            .slice(5, 10)
            .map(([rarity, color]) => (
              <li key={rarity} style={{ borderColor: color, color: color }}>
                <p>{rarity}</p>
              </li>
            ))}
        </ul>
        <span className="separator"></span>
        <div className="auto-grid">
          <div>
            <img src="/dao.png" alt="" />
            <p>Mythic Medium Space</p>
            <p>$300.00</p>
          </div>
          <div>
            <img src="/dao.png" alt="" />
            <p>Mythic Medium Space</p>
            <p>$300.00</p>
          </div>
          <div>
            <img src="/dao.png" alt="" />
            <p>Mythic Medium Space</p>
            <p>$300.00</p>
          </div>
          <div>
            <img src="/dao.png" alt="" />
            <p>Mythic Medium Space</p>
            <p>$300.00</p>
          </div>
          <div>
            <img src="/dao.png" alt="" />
            <p>Mythic Medium Space</p>
            <p>$300.00</p>
          </div>
          <div>
            <img src="/dao.png" alt="" />
            <p>Mythic Medium Space</p>
            <p>$300.00</p>
          </div>
          <div>
            <img src="/dao.png" alt="" />
            <p>Mythic Medium Space</p>
            <p>$300.00</p>
          </div>
          <div>
            <img src="/dao.png" alt="" />
            <p>Mythic Medium Space</p>
            <p>$300.00</p>
          </div>
          <div>
            <img src="/dao.png" alt="" />
            <p>Mythic Medium Space</p>
            <p>$300.00</p>
          </div>
          <div>
            <img src="/dao.png" alt="" />
            <p>Mythic Medium Space</p>
            <p>$300.00</p>
          </div>
          <div>
            <img src="/dao.png" alt="" />
            <p>Mythic Medium Space</p>
            <p>$300.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
