export function useGroupNFTsByName(NFTs) {
  const groupNFTsByName = () => {
    const groupedNFTs = {};

    NFTs.forEach((nft) => {
      const { optionName } = nft.Item;
      if (!groupedNFTs[optionName]) {
        groupedNFTs[optionName] = {
          nft: [nft],
          count: 1,
        };
      } else {
        groupedNFTs[optionName].nft.push(nft);
        groupedNFTs[optionName].count++;
      }
    });

    return Object.values(groupedNFTs);
  };

  return groupNFTsByName;
}
