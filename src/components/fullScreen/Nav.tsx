import React, { MouseEventHandler } from "react";
import "./Nav.scss";
import { Nft } from "../../type";

export default function Nav(props: {
  toggleFullScreen: MouseEventHandler<HTMLButtonElement> | undefined;
  nfts: Nft;
}) {
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

  const nfts = props.nfts;

  let tresory = 0;
  function getFloorPrice() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    nfts.map((nft) => (tresory = tresory + nft.Item.floorPrice));
    return tresory;
  }
  getFloorPrice();
  console.log(tresory);

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
  console.log(groupedNFTs);
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
            <p>{nfts.length}</p>
          </div>
          <div className="floorPriceInventory">$ {Math.floor(tresory)}</div>
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
