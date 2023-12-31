import { MouseEventHandler, useEffect, useState } from "react";
import "./ExtendedNav.scss";
import Rarity from "./components/Rarity";
import NFT from "./components/NFT";
import UpdatedItem from "./components/UpdatedItem";
import CountUp from "react-countup";

export default function ExtendedNav(props: {
  toggleFullScreen: MouseEventHandler<HTMLButtonElement> | undefined;
  data;
  nfts;
  userItems;
  newItems;
  tresoryData;
  userNfts;
  inventoryCount;
  ambassadorCode;
  notification;
}) {
  console.log(props.notification);
  const [rarity, setRarity] = useState<string>("");
  const [tresory, setTresory] = useState(0);
  const [previousTresory, setPreviousTresory] = useState(0);
  const [difference, setDifference] = useState(0);

  const nfts = props.nfts;
  useEffect(() => {
    setTresory(props.tresoryData.tresory);
    setPreviousTresory(props.tresoryData.previousTresory);
    setDifference(props.tresoryData.difference);
  }, [difference, props.tresoryData]);

  const handleCallBack = (childProps: string) => {
    setRarity(childProps);
  };

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
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".2rem",
                  }}
                >
                  <img src="./coin.svg" width="25px" alt="" />
                  <CountUp
                    start={previousTresory}
                    end={tresory}
                    duration={2.5}
                    separator=" "
                    decimal=","
                  />
                </p>
              ) : (
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".2rem",
                  }}
                >
                  <img src="./coin.svg" width="25px" alt="" />{" "}
                  {Math.floor(tresory)}{" "}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="extendedNav__body">
          <Rarity fromChild={handleCallBack} />
          <span className="separator"></span>
          {props.newItems.length > 0 && (
            <>
              <UpdatedItem
                updatedItems={props.newItems}
                ambassadorCode={props.ambassadorCode}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                notification={props.notification}
              />
            </>
          )}
          {rarity !== "" && (
            <>
              <button
                className="show-all--button"
                onClick={() => setRarity("")}
              >
                Voir toutes la collection
              </button>
              <p className="result">Résultat pour {rarity.toUpperCase()} :</p>
            </>
          )}
          <div className="auto-grid">
            {rarity === "" ? (
              Object.keys(nfts).map((i) => {
                const group = nfts[i];
                return (
                  <NFT
                    key={group.name}
                    NFT={group}
                    ambassadorCode={props.ambassadorCode}
                  />
                );
              })
            ) : Object.values(nfts).filter(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                (group) => group.rarityName === rarity
              ).length > 0 ? (
              Object.values(nfts)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                .filter((group) => group.rarityName === rarity)
                .map((filteredGroup) => (
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  <NFT
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    key={filteredGroup.name}
                    NFT={filteredGroup}
                    ambassadorCode={props.ambassadorCode}
                  />
                ))
            ) : (
              <div className="result">
                <p>Aucun résultat</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
