import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header-container">
        <div className="main-title-container">
          <img
            src="data:image/png;base64,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"
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
