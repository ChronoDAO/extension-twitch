import { ReactNode } from "react";

export type Data = {
  name: string;
  nft?: Nft;
};

export type Nft = {
  length: ReactNode;
  Item: Item;
  archetypeId: string;
  issuedId: number;
  ownerName: string;
  id: number;
};

export type Item = {
  floorPrice: number;
  name: string;
  imageUrl: string;
  rarityName: string;
};
