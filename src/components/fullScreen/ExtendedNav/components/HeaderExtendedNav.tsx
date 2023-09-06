export default function HeaderExtendedNav({ props }) {
  let tresory = 0;
  function getFloorPrice() {
    props.nfts.map((nft) => (tresory = tresory + nft.Item.floorPrice));
    return tresory;
  }
  getFloorPrice();

  return (
    <div className="extendedNav__header">
      <div>
        <button onClick={props.toggleFullScreen} className="fullScreen--btn">
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
        <div className="floorPriceInventory">${Math.floor(tresory)}</div>
      </div>
    </div>
  );
}
