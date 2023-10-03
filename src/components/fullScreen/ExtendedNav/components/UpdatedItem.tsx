import "../ExtendedNav.scss";


import { getAmbassadorCode } from "../../../../utils/twitch";
import { useEffect, useState } from "react";

export default function UpdatedItem({ updatedItems,
  ambassadorCode
}) {




  updatedItems.sort(
    //@ts-ignore
    (itemA, itemB) => new Date(itemB.date) - new Date(itemA.date)
  );
  return (
    updatedItems !== undefined && (
      <>
        <h3>Last updates</h3>
        <div className="reel">
          {updatedItems.length > 0 &&
            updatedItems.map((item) => (
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
                  <p>{item.name}</p>
                  <p className="price">${item.floorPrice}</p>
                </div>
              </div>
            ))}
        </div>
      </>
    )
  );
}
