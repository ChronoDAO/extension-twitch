import { MouseEventHandler, useEffect, useState } from "react";
import "./ExtendedNav.scss";
import Rarity from "./components/Rarity";
import NFT from "./components/NFT";
import { Data, Nft } from "../../../type";

export default function ExtendedNav(props: {
  toggleFullScreen: MouseEventHandler<HTMLButtonElement> | undefined;
  data: Data;
  nfts: Nft;
  newItem;
  userItems;
  tresory;
  tresoryStatus;
  onTresoryStatusChange;
}) {
  const [rarity, setRarity] = useState<string>("");

  const handleCallBack = (childProps: string) => {
    setRarity(childProps);
  };
  useEffect(() => {
    props.onTresoryStatusChange(null);
  }, [props.tresoryStatus, props.onTresoryStatusChange]);

  const filteredNFTs = props.userItems.filter(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    (item) => item.Item.rarityName === rarity
  );

  return (
    <>
      <div className="extendedNav__wrapper">
        <div className="extendedNav__header">
          <div>
            <button
              onClick={props.toggleFullScreen}
              className="fullScreen--btn"
            >
              <img src="/see_less.svg" width={"45px"} alt="" />
            </button>
            <div className="logo">
              <img src="/dao.png" width={"55px"} height={"auto"} alt="" />
            </div>
          </div>
          <div>
            <div className="inventory">
              <img src="/chest.svg" width={"32px"} alt="" />{" "}
              <p>{props.nfts.length}</p>
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
        </div>

        <div className="extendedNav__body">
          <Rarity fromChild={handleCallBack} />
          <span className="separator"></span>
          <div className="auto-grid">
            {rarity === ""
              ? props.userItems.map((userItem) => <NFT userItem={userItem} />)
              : filteredNFTs.map((filteredNFT) => (
                  <NFT userItem={filteredNFT} />
                ))}
            {filteredNFTs.length === 0 && (
              <div className="no-result">
                <p>Aucun résultat</p>
                <button onClick={() => setRarity("")}>
                  Voir toutes la collection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
