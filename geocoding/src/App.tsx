import React from "react";
import "./App.css";
import useGeocoding from "./apis/useGeocoding";

function App() {
  const { fetchResult, content } = useGeocoding();

  const [search, setSearch] = React.useState<string | null>(
    "경기도 수원시 영통구 월드컵로 92 (원천동)"
  );
  return (
    <>
      <h1>Geocoding</h1>
      <input
        type="text"
        id="addressInput"
        value={search ?? ""}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={() => {
          if (!search) return;
          fetchResult(search);
        }}
      >
        검색
      </button>
      <div>{JSON.stringify(content)}</div>
    </>
  );
}

export default App;
