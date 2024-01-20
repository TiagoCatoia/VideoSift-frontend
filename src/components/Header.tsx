import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header-container">
        <div className="main-title-container">
          <img
            src="src/Public/icon.png"
            alt="blue icon"
          ></img>
          <h1 className="main-title">VideoSift</h1>
        </div>
        <p className="description-text-app">
          Resumo e Classificação de videos com IA
        </p>
      </div>
    </>
  );
};

export default Header;