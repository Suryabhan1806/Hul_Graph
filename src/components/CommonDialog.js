import { Modal, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CommonDialog = ({ open, onClose, title, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          p: 2,
        }}
      >
        <Box
          sx={{
            width: "95%",
            bgcolor: "#fff",
            borderRadius: "16px",
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 10px",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>

            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommonDialog;