import { AppBar as HeadBar, Box, Toolbar, Typography } from "@mui/material";
import { SpeakerNotes } from "@mui/icons-material";

import CustomButton from "Components/Items/CustomButton";
import translate from "Utils/translate";
import colors from "Utils/colors";

const AppBar = () => {
  return (
    <Box sx={{marginBottom: "15px" }}>
      <HeadBar position="static" sx={{ background: colors.dark }}>
        <Toolbar variant="regular">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <SpeakerNotes />
              <Typography variant="h6" color="inherit" component="div">
                {translate("ROOT_title")}
              </Typography>
            </div>
            <CustomButton>{translate("ROOT_button_1")}</CustomButton>
          </div>
        </Toolbar>
      </HeadBar>
    </Box>
  );
};

export default AppBar;
