import { useToggleShowMore } from "../../../../customHooks/useToggleShowMore";
import "../ExtendedNav.scss";
export default function NFT({ userItem }) {
  const { showMoreMap, toggleShowMore } = useToggleShowMore();

  return (
    <div>
      <div>
        <a
          key={userItem.id}
          href={`https://openloot.com/items/BT0/${userItem.Item.optionName}?utm_source=ambassador&utm_campaign=`}
          target="_blank"
        >
          <img
            src={userItem.Item.imageUrl}
            alt=""
            id={!showMoreMap[userItem.id] ? userItem.Item.rarityName : "active"}
          />
        </a>
        <span className="NFTQuantity">
          <p>X {userItem.count}</p>
        </span>
        <span className="NFTIssuedId">
          {userItem.count > 1 ? (
            <div className="issueId__container">
              {!showMoreMap[userItem.id] ? (
                <button onClick={() => toggleShowMore(userItem.id)}>
                  <img src="/see_more.svg" width={"18px"} alt="" />
                </button>
              ) : (
                <button onClick={() => toggleShowMore(userItem.id)}>
                  <img src="/see_less.svg" width={"18px"} alt="" />
                </button>
              )}
              {showMoreMap[userItem.id] ? (
                userItem.nft.map((nft) => <p>{nft.issuedId}</p>)
              ) : (
                <p># {userItem.issuedId}</p>
              )}
            </div>
          ) : (
            <p># {userItem.issuedId}</p>
          )}
        </span>
      </div>
      <p>{userItem.Item.name}</p>
      <p className="price">${userItem.Item.floorPrice}</p>
    </div>
  );
}
