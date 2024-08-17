import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header-container">
        <div className="main-title-container">
          <img src="src/assets/icon.png" alt="blue chat icon"></img>
          <h1 className="main-title">VideoSift</h1>
        </div>
        <p className="description-text-app">
          Summary and Classification of Videos with AI
        </p>
      </div>
    </>
  );
};

export default Header;
