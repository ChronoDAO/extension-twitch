import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function UpdatedDrop() {
  // Supabase configuration
  const supabase = createClient(
    "https://naiscprlenbohhfjhyhi.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5haXNjcHJsZW5ib2hoZmpoeWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0ODc1MTMsImV4cCI6MjAwNzA2MzUxM30.fdTr5Iu8OaCTcn5Fb0IVdoh0P2YZ_VcgcYefVnG8EXI"
  );
  const [data, setData] = useState();

  useEffect(() => {
    const channelB = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "*" },
        (payload) => setData(payload.new)
      )
      .subscribe();

    return () => {
      channelB.unsubscribe();
    };
  }, []);

  return (
    <div>
      {data !== undefined && (
        <h1 style={{ color: "black" }}>
          {data.toUser} à drop le nft numéro {data.nftId}
        </h1>
      )}
    </div>
  );
}
