import React from "react";
import "./App.css";
import useReverseGeocoding from "./apis/useReverseGeocoding";

function App() {
  const { fetchResult, content } = useReverseGeocoding();

  // const [x, setX] = React.useState<string>("14133563.860407535");
  // const [y, setY] = React.useState<string>("4513528.682002012");
  const [x, setX] = React.useState<string>("952284.9045976703");
  const [y, setY] = React.useState<string>("1948546.1691412493");

  return (
    <>
      <h1>Geocoding</h1>
      <input type="text" value={x} onChange={(e) => setX(e.target.value)} />
      <input type="text" value={y} onChange={(e) => setY(e.target.value)} />
      <button
        onClick={() => {
          if (!x || !y) return;
          fetchResult(x, y);
        }}
      >
        검색
      </button>
      <div>{JSON.stringify(content)}</div>
    </>
  );
}

export default App;
