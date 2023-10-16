import React, { useEffect, useState } from "react";
import "../ExtendedNav.scss";
import { getAmbassadorCode } from "../../../../utils/twitch";

export default function UpdatedItem({ updatedItems, ambassadorCode }) {
  const [isOpen, setIsOpen] = useState(false);

  updatedItems.sort(
    //@ts-ignore
    (itemA, itemB) => new Date(itemB.date) - new Date(itemA.date)
  );

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="toggleUpdate" onClick={toggleOpen}>
        <p>{isOpen ? "Close" : `Open`} last update</p>
      </button>

      <div className={`updated-items__wrapper ${isOpen ? "open" : "close"}`}>
        <div className="reel">
          {updatedItems.length > 0 &&
            updatedItems.map((item) => (
              <>
                <div key={item.archetypeId}>
                  <div>
                    <div>
                      <a
                        key={item.id}
                        href={`https://openloot.com/items/BT0/${item.optionName}?utm_source=ambassador&utm_campaign=${ambassadorCode}`}
                        target="_blank"
                      >
                        <img src={item.imageUrl} alt="" id={item.rarityName} />
                      </a>
                    </div>
                    <p className="itemName">{item.name}</p>
                    {item.floorPrice ? (
                      <div className="price">
                        <p>{item.floorPrice}</p>
                        <img src="./coin.svg" width="20px" alt="" />
                      </div>
                    ) : (
                      <p>0 remaining</p>
                    )}
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
      {isOpen && <span className="separator"></span>}
    </>
  );
}
