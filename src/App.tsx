import Header from "./components/Header";
import Configuration from "./components/Configuration";
import DisplayArea from "./components/DisplayArea";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <div className="main-content-container">
        <Configuration />
        <DisplayArea />
      </div>
    </>
  );
}

export default App;
