import { useState } from "react";
import {
  AppBar as HeadBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  styled,
} from "@mui/material";
import { SpeakerNotes, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import translate from "Utils/translate";
import colors from "Utils/colors";

const drawerWidth = 240;

const ListButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  color: "#fff",
  fontSize: "1rem",
  marginRight: "20px",
  "&:hover": {
    background: colors.main,
  },

  "@media (max-width:600px)": {
    fontSize: "0.8rem",
  },
}));

const AppBar = (props) => {
  const { window } = props;
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        To - Do
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => navigate(`/`)}
          >
            <ListItemText primary={translate(`ROOT_button_2`)} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => navigate(`/note`)}
          >
            <ListItemText primary={translate(`ROOT_button_1`)} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => navigate(`/favorites`)}
          >
            <ListItemText primary={translate(`ROOT_button_3`)} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => navigate(`/trash`)}
          >
            <ListItemText primary={translate(`ROOT_button_4`)} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ marginBottom: "15px" }}>
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
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                justifyContent: "space-evenly",
                paddingRight: "25px",
              }}
            >
              <ListButton onClick={() => navigate(`/`)}>
                {translate(`ROOT_button_2`)}
              </ListButton>
              <ListButton onClick={() => navigate(`/note`)}>
                {translate(`ROOT_button_1`)}
              </ListButton>
              <ListButton onClick={() => navigate(`/favorites`)}>
                {translate(`ROOT_button_3`)}
              </ListButton>
              <ListButton
                sx={{ marginRight: 0 }}
                onClick={() => navigate(`/trash`)}
              >
                {translate(`ROOT_button_4`)}
              </ListButton>
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <Menu />
            </IconButton>
          </div>
        </Toolbar>
      </HeadBar>
      <Box component="nav">
        <Drawer
          anchor="right"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default AppBar;
