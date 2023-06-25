import { Button } from "@mui/material";

import colors from "Utils/colors";

const CustomButton = ({ children, ...props }) => {
  return (
    <Button
      sx={{
        textTransform: "none",
        "&.MuiButtonBase-root": {
          background: colors.main,
        },
        "&:hover": {
          background: colors.secondary,
        },
      }}
      variant="contained"
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
