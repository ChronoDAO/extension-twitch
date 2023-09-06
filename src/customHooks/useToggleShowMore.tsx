import { useState } from "react";
export function useToggleShowMore() {
  const [showMoreMap, setShowMoreMap] = useState({});

  const toggleShowMore = (id) => {
    setShowMoreMap((prevShowMoreMap) => ({
      ...prevShowMoreMap,
      [id]: !prevShowMoreMap[id],
    }));
  };

  return { showMoreMap, toggleShowMore };
}
