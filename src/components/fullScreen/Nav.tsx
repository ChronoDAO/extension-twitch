import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import "./Nav.scss";
import { Nft } from "../../type";
import rarities from "../../rarities";
import CountUp from "react-countup";

export default function Nav(props: {
  toggleFullScreen: MouseEventHandler<HTMLButtonElement> | undefined;
  nfts;
  userItems;
  tresoryData;
  newItems;
  inventoryCount;
}) {
  const nfts = props.nfts;
  const [tresory, setTresory] = useState(0);
  const [previousTresory, setPreviousTresory] = useState(0);
  const [difference, setDifference] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setTresory(props.tresoryData.tresory);
    setPreviousTresory(props.tresoryData.previousTresory);
    setDifference(props.tresoryData.difference);
    if (difference !== 0 && !isHovered) {
      setIsShaking(true);
      const timeoutId = setTimeout(() => {
        setIsShaking(false);
      }, 2500);

      return () => clearTimeout(timeoutId);
    }
  }, [difference, isHovered, props.tresoryData]);

  const handleNavWrapperHover = () => {
    setIsShaking(false);
    setIsHovered(true);
  };

  function groupNFTsByRarity(nfts) {
    const groupedNFTs: Record<
      string,
      {
        nft: Nft;
        count: number;
      }
    > = {};

    nfts.forEach((nft) => {
      const { rarityName } = nft.Item;

      if (!groupedNFTs[rarityName]) {
        groupedNFTs[rarityName] = {
          nft: nft,
          count: 1,
        };
      } else {
        groupedNFTs[rarityName].count++;
      }
    });

    return Object.values(groupedNFTs);
  }

  const groupedNFTs = groupNFTsByRarity(nfts);
  return (
    <nav className={isShaking && !isHovered ? "notification" : null}>
      <div
        onMouseOver={handleNavWrapperHover}
        onMouseLeave={() => setIsHovered(false)}
        className={"nav__wrapper"}
      >
        <div className="nav__header">
          <div className="logo">
            <img src="/dao.png" width={"55px"} height={"auto"} alt="" />
          </div>
          <button onClick={props.toggleFullScreen} className="fullScreen--btn">
            {props.newItems.length > 0 ? (
              <span className="notification--btn">{props.newItems.length}</span>
            ) : null}
            <img src="/see_more.svg" width={"45px"} alt="" />
          </button>
          <div className="inventory">
            <img src="/chest.svg" width={"32px"} alt="" />
            <p>{props.inventoryCount}</p>
          </div>
          <div
            className={
              difference === 0
                ? "floorPriceInventory default"
                : difference < 0
                  ? "floorPriceInventory decrease"
                  : "floorPriceInventory increase"
            }
          >
            {previousTresory !== 0 ? (
              <p>
                <CountUp
                  start={previousTresory}
                  end={tresory}
                  duration={2.5}
                  separator=" "
                  decimal=","
                  prefix="$"
                />
              </p>
            ) : (
              <p>{Math.floor(tresory)} $</p>
            )}
          </div>
        </div>
        <div className="nav__body">
          <div className="rarity__wrapper">
            <ul>
              {Object.entries(rarities).map(([rarity, color]) =>
                groupedNFTs.map((groupedNFT) =>
                  groupedNFT.nft.Item.rarityName === rarity ? (
                    <li key={groupedNFT.nft.id}>
                      <p>{groupedNFT.count}</p>
                      <svg height="20" width="20">
                        <circle cx="10" cy="10" r="10" fill={color.toString()} />
                      </svg>
                    </li>
                  ) : null
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
