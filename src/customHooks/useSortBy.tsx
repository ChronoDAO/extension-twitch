export default function useSortBy(NFTs, options) {
  const sortNFTs = () => {
    return NFTs.sort((a, b) => {
      if (a.nft[0].Item[options] > b.nft[0].Item[options]) {
        return -1;
      }
      if (a.nft[0].Item[options] < b.nft[0].Item[options]) {
        return 1;
      }
      return 0;
    });
  };
  return sortNFTs;
}
