import React from "react";

export default function Test1(props: { data }) {
  return (
    <div>
      <p>{props.data[0].id}</p>
      <p>{props.data[0].name}</p>
      <ul>
        {props.data[0].NFT.map((nft) => (
          <li>{nft.Item.archetypeId}</li>
        ))}
      </ul>
    </div>
  );
}
