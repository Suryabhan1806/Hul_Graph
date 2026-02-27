import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const StyledIconButton = styled(IconButton)(({ active }) => ({
  backgroundColor: "#FFFFFF", 
  borderRadius: "10px",
  width: 35,
  height: 35,
  border: "1px solid #d2d2d2", 
  transition: "all 0.2s ease",
  top: 1,

  "&:hover": {
    backgroundColor: "#F5F7FA", 
  },

  "& .MuiSvgIcon-root": {
    fontSize: 24,
    color: "#6B7A90", 
  },
}));

const CommonExpandButton = ({
  Icon,
  onClick,
  tooltip = "Expand",
}) => {
  return (
    <Tooltip title={tooltip} arrow>
      <StyledIconButton onClick={onClick}>
        <Icon />
      </StyledIconButton>
    </Tooltip>
  );
};

export default CommonExpandButton;