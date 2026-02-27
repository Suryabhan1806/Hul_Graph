import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import "./rmpnToggleButton.css";

const RMPMToggleButton = ({ options, value, onChange, whiteBg = false }) => {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, newValue) => onChange(newValue)}
      aria-label="toggle-graph-table"
      className={`rmpm-toggle-group ${whiteBg ? "white-bg" : ""}`}
    >
      {options.map((item) => (
        <ToggleButton
          key={item.value}
          className="rmpm-toggle-btn"
          selected={value === item.value}
          sx={{
            height: 28,
            p: "0 8px",
            background: "transparent",
            border: "none",
          }}
          value={item.value}
          aria-label={`toggle-${item.value.toLowerCase()}`}
        >
          {item.title ? (
            <Typography fontSize={14}>{item.title}</Typography>
          ) : null}
          {item.icon ? item.icon : null}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default RMPMToggleButton;
