import "./DisplayArea.css";

const DisplayArea = () => {
  return (
    <div className="display-area-container">
      <div className="text-input-container">
        <h3></h3>
        <textarea
          className="text-input"
          placeholder="Your text will appear here..."
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default DisplayArea;
