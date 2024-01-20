import "./App.css";

import GetVideo from "./GetVideo";
import Header from "./Header.tsx";

function App() {
  return (
    <>
      <Header />
      <div className="main-content-container">
        <GetVideo />
      </div>
    </>
  );
}

export default App;
