import { useToggleShowMore } from "../../../../customHooks/useToggleShowMore";

export default function NFT({ groupedNFT }) {
  const { showMoreMap, toggleShowMore } = useToggleShowMore();

  return (
    <div>
      <div>
        <a
          key={groupedNFT.nft[0].id} // Utilisez une clé unique pour l'élément généré
          href={`https://openloot.com/items/BT0/${groupedNFT.nft[0].Item.optionName}`}
          target="_blank"
        >
          <img
            src={groupedNFT.nft[0].Item.imageUrl}
            alt=""
            className={
              !showMoreMap[groupedNFT.nft[0].id]
                ? groupedNFT.nft[0].Item.rarityName
                : "active"
            }
          />
        </a>
        <span className="NFTQuantity">
          <p>X {groupedNFT.count}</p>
        </span>
        <span className="NFTIssuedId">
          {groupedNFT.count > 1 ? (
            <div className="issueId__container">
              {!showMoreMap[groupedNFT.nft[0].id] ? (
                <button onClick={() => toggleShowMore(groupedNFT.nft[0].id)}>
                  <img src="/see_more.svg" width={"18px"} alt="" />
                </button>
              ) : (
                <button onClick={() => toggleShowMore(groupedNFT.nft[0].id)}>
                  <img src="/see_less.svg" width={"18px"} alt="" />
                </button>
              )}
              {showMoreMap[groupedNFT.nft[0].id] ? (
                groupedNFT.nft.map((nft) => <p>{nft.issuedId}</p>)
              ) : (
                <p># {groupedNFT.nft[0].issuedId}</p>
              )}
            </div>
          ) : (
            <p># {groupedNFT.nft[0].issuedId}</p>
          )}
        </span>
      </div>
      <p>{groupedNFT.nft[0].Item.name}</p>
      <p className="price">${groupedNFT.nft[0].Item.floorPrice}</p>
    </div>
  );
}
