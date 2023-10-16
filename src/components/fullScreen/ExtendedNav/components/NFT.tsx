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
          href={`http://localhost:3000/items/BT0/${NFT.optionName}`}
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
      <p className="item_name">{NFT.name}</p>
      <p
        style={{
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
        }}
        className="price"
      >
        {" "}
        {NFT.floorPrice}
        <img src="./coin.svg" width="20px" alt="" />
      </p>
    </div>
  );
}
