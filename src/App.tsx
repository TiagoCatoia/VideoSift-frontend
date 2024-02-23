import Header from "./components/Header";
import DisplayArea from "./components/DisplayArea";
import FormRoot from "./components/Forms/FormRoot";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <div className="main-content-container">
        <FormRoot />
        <DisplayArea />
      </div>
    </>
  );
}

export default App;
