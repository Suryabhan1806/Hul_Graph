import "./common.css";

const CommonToggleButton = ({ options, value, onChange }) => {
  return (
    <div className="trend-toggle">
      {options.map((item) => (
        <button
          key={item}
          className={`trend-btn ${value === item ? "active" : ""}`}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default CommonToggleButton;