import { useEffect, useMemo, useState, useCallback } from "react";
import "./App.css";
import ExtendedNav from "./components/fullScreen/ExtendedNav/ExtendedNav";
import Nav from "./components/fullScreen/Nav";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://naiscprlenbohhfjhyhi.supabase.co",
  "YOUR_API_KEY"
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
  }, []); // Ne dépend d'aucune variable, donc pas besoin de dépendance ici

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
  }, [userNfts, tresoryData.previousTresory]);

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
  }, [tresoryData.tresory, tresoryData.previousTresory]);

  return (
    <div className="app">
      {isNavFullScreen ? (
        <Nav
          toggleFullScreen={toggleFullScreen}
          nfts={userNfts}
          userItems={userItems}
          tresory={tresoryData.tresory}
          tresoryStatus={tresoryData.tresoryStatus}
          newItems={newItems}
          notification={notification}
          previousTresory={tresoryData.previousTresory}
          tresoryData={tresoryData}
        />
      ) : (
        <ExtendedNav
          toggleFullScreen={toggleFullScreen}
          data={userData}
          nfts={userNfts}
          userItems={userItems}
          tresory={tresoryData.tresory}
          tresoryStatus={tresoryData.tresoryStatus}
          newItems={newItems}
          previousTresory={tresoryData.previousTresory}
          difference={tresoryData.difference}
          tresoryData={tresoryData}
        />
      )}
    </div>
  );
}

export default App;
