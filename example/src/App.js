import { openDittoTimely } from "vanilla-timely-plugin";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button onClick={() => openDittoTimely("test")}>
        Click here to open Ditto Timely Modal
      </button>
    </div>
  );
}

export default App;
