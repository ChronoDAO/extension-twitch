import { useState } from "react";
import "./App.css";
import ExtendedNav from "./components/fullScreen/ExtendedNav";
import Nav from "./components/fullScreen/Nav";

function App() {
  const [isNavFullScreen, setIsNavFullScreen] = useState(true);
  const [isExtendedNavFullScreen, setIsExtendedNavFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsNavFullScreen(!isNavFullScreen);
    setIsExtendedNavFullScreen(!isExtendedNavFullScreen);
  };
  return (
    <div className="app">
      {isNavFullScreen ? (
        <Nav toggleFullScreen={toggleFullScreen} />
      ) : (
        <ExtendedNav toggleFullScreen={toggleFullScreen} />
      )}
    </div>
  );
}

export default App;
