import { useEffect, useState } from "react";
import "./App.css";
import ExtendedNav from "./components/fullScreen/ExtendedNav/ExtendedNav";
import Nav from "./components/fullScreen/Nav";
import axios from "axios";
import { Data, Nft } from "./type";

function App() {
  const [isNavFullScreen, setIsNavFullScreen] = useState(true);
  const [isExtendedNavFullScreen, setIsExtendedNavFullScreen] = useState(false);
  const [data, setData] = useState<Data | undefined>();
  const [nfts, setNfts] = useState<Nft | undefined>();

  useEffect(() => {
    axios
      .get(
        `https://naiscprlenbohhfjhyhi.supabase.co/rest/v1/User?select=*,NFT(*,Item(*))&name=eq.Zet `,
        {
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5haXNjcHJsZW5ib2hoZmpoeWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0ODc1MTMsImV4cCI6MjAwNzA2MzUxM30.fdTr5Iu8OaCTcn5Fb0IVdoh0P2YZ_VcgcYefVnG8EXI",
          },
        }
      )

      .then((responseData) => {
        const newData = responseData.data;
        setData(newData);
        if (newData && newData.length > 0) {
          setNfts(newData[0].NFT);
        }
      });
  }, []);

  const toggleFullScreen = () => {
    setIsNavFullScreen(!isNavFullScreen);
    setIsExtendedNavFullScreen(!isExtendedNavFullScreen);
  };

  return (
    <>
      {data ? (
        <div className="app">
          {isNavFullScreen ? (
            <Nav toggleFullScreen={toggleFullScreen} nfts={nfts} />
          ) : (
            <ExtendedNav
              toggleFullScreen={toggleFullScreen}
              data={data}
              nfts={nfts}
            />
          )}
        </div>
      ) : null}
    </>
  );
}

export default App;
