import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import ExtendedNav from "./components/fullScreen/ExtendedNav/ExtendedNav";
import Nav from "./components/fullScreen/Nav";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://naiscprlenbohhfjhyhi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5haXNjcHJsZW5ib2hoZmpoeWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0ODc1MTMsImV4cCI6MjAwNzA2MzUxM30.fdTr5Iu8OaCTcn5Fb0IVdoh0P2YZ_VcgcYefVnG8EXI"
);

function App() {
  const [isNavFullScreen, setIsNavFullScreen] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userNfts, setUserNfts] = useState([]);
  const [userItems, setUserItems] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [notification, setNotification] = useState(0);

  const toggleFullScreen = useCallback(() => {
    setIsNavFullScreen((prev) => !prev);
  }, []);

  const [tresoryData, setTresoryData] = useState({
    tresory: 0,
    previousTresory: 0,
    tresoryStatus: null,
    difference: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("User")
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
          updatedItem.date = new Date();
          setNewItems((prevNewItems) => {
            const updatedItems = prevNewItems.map((item) => {
              if (item.archetypeId === updatedItem.archetypeId) {
                return payload.new;
              }
              return item;
            });
            if (
              !updatedItems.some(
                (item) => item.archetypeId === updatedItem.archetypeId
              )
            ) {
              updatedItems.push(updatedItem);
              setNotification(notification + 1);
            }
            return updatedItems;
          });
          setUserItems((prevItems) => {
            const indexToUpdate = prevItems.findIndex(
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
  }, []);

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
  }, [userData]);

  const [tresory, setTresory] = useState(0);
  const [previousTresory, setPreviousTresory] = useState(0);
  const [tresoryStatus, setTresoryStatus] = useState(null);
  const [difference, setDifference] = useState(0);

  console.log(tresory, previousTresory);

  useEffect(() => {
    let a = 0;
    for (const nft of userNfts) {
      a = a + nft.Item.floorPrice;
    }
    setTresoryData((prevState) => ({
      ...prevState,
      tresory: a,
      difference: a - prevState.previousTresory,
      previousTresory: prevState.tresory,
    }));
  }, [userNfts]);

  useEffect(() => {
    if (tresoryData.tresory > tresoryData.previousTresory) {
      setTresoryData((prevState) => ({
        ...prevState,
        tresoryStatus: true,
      }));
    } else if (tresoryData.tresory < tresoryData.previousTresory) {
      setTresoryData((prevState) => ({
        ...prevState,
        tresoryStatus: false,
      }));
    }
  }, []);

  function sortByPrice() {
    userItems.sort(function (a, b) {
      return b.Item.floorPrice - a.Item.floorPrice;
    });
  }

  const handleTresoryStatusChange = (newTresoryStatus) => {
    setTimeout(() => {
      setTresoryData((prevState) => ({
        ...prevState,
        tresoryStatus: newTresoryStatus,
      }));
    }, 2500);
  };

  if (!userData || !userNfts || !userItems) {
    return null;
  } else {
    sortByPrice();
  }

  console.log("RENDER APP");
  return (
    <div className="app">
      <Nav
        toggleFullScreen={toggleFullScreen}
        nfts={userNfts}
        userItems={userItems}
        newItems={newItems}
        notification={notification}
        tresoryData={tresoryData}
      />
      {/* {isNavFullScreen ? (
        <Nav
          toggleFullScreen={toggleFullScreen}
          nfts={userNfts}
          userItems={userItems}
          newItems={newItems}
          notification={notification}
          tresoryData={tresoryData}
        />
      ) : (
        <ExtendedNav
          toggleFullScreen={toggleFullScreen}
          data={userData}
          nfts={userNfts}
          userItems={userItems}
          tresory={tresory}
          tresoryStatus={tresoryStatus}
          onTresoryStatusChange={handleTresoryStatusChange}
          newItems={newItems}
          previousTresory={previousTresory}
          difference={difference}
        />
      )} */}
    </div>
  );
}

export default App;
