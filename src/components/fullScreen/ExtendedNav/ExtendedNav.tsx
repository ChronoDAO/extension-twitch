import { MouseEventHandler, useState } from "react";
import "./ExtendedNav.scss";
import Rarity from "./components/Rarity";
import NFT from "./components/NFT";
import HeaderExtendedNav from "./components/HeaderExtendedNav";
import { useGroupNFTsByName } from "../../../customHooks/useGroupNFTsByName";
import useSortBy from "../../../customHooks/useSortBy";
import { Data, Nft } from "../../../type";

export default function ExtendedNav(props: {
  toggleFullScreen: MouseEventHandler<HTMLButtonElement> | undefined;
  data: Data;
  nfts: Nft;
}) {
  const groupNFTsByName = useGroupNFTsByName(props.nfts);
  const groupedNFTs = groupNFTsByName();

  const sortItems = useSortBy(groupedNFTs, "floorPrice");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sortedByFloorPrice = sortItems();

  const [rarity, setRarity] = useState<string>("");
  const handleCallBack = (childProps: string) => {
    setRarity(childProps);
  };

  const sortByIssuedId = () => {
    const sortedGroupedNFTs = groupedNFTs.map((nft: Nft) => ({
      ...nft,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      nft: [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        ...nft.nft.sort(
          (a: { issuedId: number }, b: { issuedId: number }) =>
            a.issuedId - b.issuedId
        ),
      ],
    }));
    return sortedGroupedNFTs;
  };
  const sortedByIssuedId = sortByIssuedId();

  const filteredNFTs = groupedNFTs.filter(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    (groupedNFT) => groupedNFT.nft[0].Item.rarityName === rarity
  );

  return (
    <div className="extendedNav__wrapper">
      <HeaderExtendedNav props={props} />
      <div className="extendedNav__body">
        <Rarity fromChild={handleCallBack} />
        <span className="separator"></span>
        <div className="auto-grid">
          {rarity === "" ? (
            sortedByIssuedId.map((groupedNFT) => (
              <NFT groupedNFT={groupedNFT} />
            ))
          ) : (
            <>
              {filteredNFTs.map((filteredNFT) => (
                <NFT groupedNFT={filteredNFT} />
              ))}
              {filteredNFTs.length === 0 && (
                <div className="no-result">
                  <p>Aucun résultat</p>
                  <button onClick={() => setRarity("")}>
                    Voir toutes la collection
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
