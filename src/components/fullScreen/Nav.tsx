import React, { MouseEventHandler, useEffect, useState } from "react";
import "./Nav.scss";
import { Nft } from "../../type";
import rarities from "../../rarities";

export default function Nav(props: {
  toggleFullScreen: MouseEventHandler<HTMLButtonElement> | undefined;
  nfts: Nft;
  userItems;
  tresory;
  tresoryStatus;
  onTresoryStatusChange;
}) {
  console.log("G ETE RERENDER, JE SUIS LA NAV");

  const nfts = props.nfts;

  useEffect(() => {
    props.onTresoryStatusChange(null);
    setTest(true);
    setTimeout(() => {
      setTest(false);
    }, 500);
  }, [props.tresoryStatus, props.onTresoryStatusChange]);

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
  const [test, setTest] = useState(false);
  return (
    <>
      <div className={test ? "nav__wrapper notification" : "nav__wrapper"}>
        <div className="nav__header">
          <div className="logo">
            <img src="/dao.png" width={"55px"} height={"auto"} alt="" />
          </div>
          <button onClick={props.toggleFullScreen} className="fullScreen--btn">
            <span className="notification--btn">3</span>
            <img src="/see_more.svg" width={"45px"} alt="" />
          </button>
          <div className="inventory">
            <img src="/chest.svg" width={"32px"} alt="" />
            <p>{nfts.length}</p>
          </div>
          <div
            className={
              props.tresoryStatus === true
                ? "floorPriceInventory increase"
                : props.tresoryStatus === false
                ? "floorPriceInventory decrease"
                : "floorPriceInventory default"
            }
          >
            $ {Math.floor(props.tresory)}
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
                        <circle cx="10" cy="10" r="10" fill={color} />
                      </svg>
                    </li>
                  ) : null
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
