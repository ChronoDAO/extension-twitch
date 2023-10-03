import { useToggleShowMore } from "../../../../customHooks/useToggleShowMore";
import "../ExtendedNav.scss";
import { useEffect, useState } from "react";

export default function NFT({ NFT, ambassadorCode }) {

  const { showMoreMap, toggleShowMore } = useToggleShowMore();
  return (
    <div>
      <div>
        <a
          key={NFT.id}
          href={`https://openloot.com/items/BT0/${NFT.optionName}?utm_source=ambassador&utm_campaign=${ambassadorCode}`}
          target="_blank"
        >
          <img
            src={NFT.imageUrl}
            alt=""
            id={!showMoreMap[NFT.id] ? NFT.rarityName : "active"}
          />
        </a>
        <span className="NFTQuantity">
          <p>X {NFT.count}</p>
        </span>
        <span className="NFTIssuedId">
          {NFT.count > 1 ? (
            <div className="issueId__container">
              {!showMoreMap[NFT.id] ? (
                <button onClick={() => toggleShowMore(NFT.id)}>
                  <img src="/see_more.svg" width={"18px"} alt="" />
                </button>
              ) : (
                <button onClick={() => toggleShowMore(NFT.id)}>
                  <img src="/see_less.svg" width={"18px"} alt="" />
                </button>
              )}
              {showMoreMap[NFT.id] ? (
                NFT.issuedIds.map((nft) => <p>{nft}</p>)
              ) : (
                <p># {NFT.issuedIds[0]}</p>
              )}
            </div>
          ) : (
            <p># {NFT.issuedIds[0]}</p>
          )}
        </span>
      </div>
      <p>{NFT.name}</p>
      <p className="price">${NFT.floorPrice}</p>
    </div>
  );
}
