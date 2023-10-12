import { useEffect, useState } from "react";
import "./App.css";
import ExtendedNav from "./components/fullScreen/ExtendedNav/ExtendedNav";
import Nav from "./components/fullScreen/Nav";
import { createClient } from "@supabase/supabase-js";

import { getAmbassadorCode, getOpenLootName } from "../src/utils/twitch";

const supabase = createClient(
  "https://mjdyahyaclvxaffhfxhu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZHlhaHlhY2x2eGFmZmhmeGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ4NjcwMTEsImV4cCI6MjAxMDQ0MzAxMX0.fzIPHSYCNaKIXZ3U2Nqz8l97ChfbhY_bHlG6o5vQazE"
);

function App() {
  const [isNavFullScreen, setIsNavFullScreen] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userNfts, setUserNfts] = useState([]);
  const [userItems, setUserItems] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [notification, setNotification] = useState(0);

  const [ambassadorCode, setAmbassadorCode] = useState("");
  const [openLootUsername, setOpenLootUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // const username = await getOpenLootName();
      // const code = await getAmbassadorCode();
      let code = "Zet";
      setAmbassadorCode(code);
      // setOpenLootUsername(username);
      try {
        const { data, error } = await supabase
          .from("Player")
          .select("*, NFT(*, Item(*))")
          .eq("name", "Zet");
        if (error) {
          throw error;
        }
        setUserData(data[0]);
      } catch (error) {
        console.error("Erreur lors de la requête initiale :", error.message);
      }
    };

    fetchData();

    const subscription = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Item",
        },
        (payload) => {
          const updatedItem = payload.new;
          console.log(payload);
          //@ts-ignore
          updatedItem.date = new Date();
          setNewItems((prevNewItems) => {
            const updatedItems = prevNewItems.map((item) => {
              //@ts-ignore
              if (item.archetypeId === updatedItem.archetypeId) {
                return payload.new;
              }
              return item;
            });
            if (
              !updatedItems.some(
                //@ts-ignore
                (item) => item.archetypeId === updatedItem.archetypeId
              )
            ) {
              updatedItems.push(updatedItem);
              setNotification(notification + 1);
            }
            // const limitedItems = updatedItems.slice(0, 20);
            // return limitedItems;
            return updatedItems.slice(0, 20);
          });
          setUserItems((prevItems) => {
            const indexToUpdate = prevItems.findIndex(
              //@ts-ignore
              (item) => item.Item.archetypeId === updatedItem.archetypeId
            );
            if (indexToUpdate !== -1) {
              const updatedUserItems = [...prevItems];
              updatedUserItems[indexToUpdate].Item = updatedItem;
              return updatedUserItems;
            }

            return prevItems;
          });
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [notification, newItems]);

  useEffect(() => {
    if (userData) {
      setUserNfts(userData.NFT);
      const uniqueItemIds = [];
      const uniqueItems = userData.NFT.filter((item) => {
        if (uniqueItemIds.includes(item.Item.archetypeId)) {
          return false;
        }
        uniqueItemIds.push(item.Item.archetypeId);
        return true;
      });
      setUserItems(uniqueItems);
    }
  }, [userData, newItems]);

  const [grouped, setGrouped] = useState({});
  const [inventoryCount, setInventoryCount] = useState(0);
  useEffect(() => {
    const sortedUserNfts = [...userNfts].sort((a, b) => {
      return b.Item.floorPrice - a.Item.floorPrice;
    });

    const groupedNFTs = {};

    let i = 0;
    sortedUserNfts.forEach((nft) => {
      const nftName = nft.Item.name;
      if (groupedNFTs[nftName]) {
        groupedNFTs[nftName].count += 1;
        groupedNFTs[nftName].issuedIds.push(nft.issuedId);
        groupedNFTs[nftName].nft = nft;
      } else {
        groupedNFTs[nftName] = {
          count: 1,
          name: nftName,
          issuedIds: [nft.issuedId],
          nft: nft,
          imageUrl: nft.Item.imageUrl,
          rarityName: nft.Item.rarityName,
          optionName: nft.Item.optionName,
          floorPrice: nft.Item.floorPrice,
          id: i,
        };
      }
      i++;
    });
    setGrouped(groupedNFTs);
    setInventoryCount(userNfts.length);
  }, [userNfts]);

  const toggleFullScreen = () => {
    setIsNavFullScreen((prev) => !prev);
    setNotification(0);
  };

  const [tresoryData, setTresoryData] = useState({
    tresory: 0,
    previousTresory: 0,
    difference: 0,
  });
  useEffect(() => {
    const totalFloorPrice = userNfts.reduce(
      (acc, nft) => acc + nft.Item.floorPrice,
      0
    );
    setTresoryData((prevTresoryData) => {
      const difference = totalFloorPrice - prevTresoryData.tresory;

      if (difference !== 0) {
        const updatedTresoryData = { ...prevTresoryData };
        updatedTresoryData.tresory = totalFloorPrice;
        updatedTresoryData.previousTresory = prevTresoryData.tresory;
        if (updatedTresoryData.tresory !== difference) {
          updatedTresoryData.difference = difference;
        }
        return updatedTresoryData;
      }
      return prevTresoryData;
    });
  }, [userNfts, newItems]);

  return (
    <div className="app">
      {userData && isNavFullScreen ? (
        <Nav
          toggleFullScreen={toggleFullScreen}
          nfts={userNfts}
          userItems={userItems}
          tresoryData={tresoryData}
          newItems={newItems}
          inventoryCount={inventoryCount}
          lastItem={newItems[0]}
        />
      ) : (
        <ExtendedNav
          toggleFullScreen={toggleFullScreen}
          data={userData}
          nfts={grouped}
          userItems={userItems}
          tresoryData={tresoryData}
          newItems={newItems}
          userNfts={userNfts}
          inventoryCount={inventoryCount}
          ambassadorCode={ambassadorCode}
        />
      )}
    </div>
  );
}

export default App;
