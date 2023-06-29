import { useState, forwardRef } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Snackbar,
  Alert,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Fab,
} from "@mui/material";
import { AddCircle, Add } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

import { ReactComponent as StartSvg } from "assets/svg/start.svg";
import colors from "Utils/colors";
import status from "Utils/status";
import translate from "Utils/translate";
import NoteCard from "Components/Items/NoteCard";
import CustomButton from "Components/Items/CustomButton";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const empty = translate("ROOT_empty_title");

  const getTitle = () => {
    switch (location.pathname) {
      case "/favorites":
        return translate("FAV_title");

      case "/trash":
        return translate("TRASH_title");

      default:
        return translate("HOME_title");
    }
  };

  const title = getTitle();

  const [openSuccess, setOpenSuccess] = useState(
    false || location?.state?.success
  );

  const [openDeleted, setOpenDeleted] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    state: false,
    id: "",
  });

  let notes = JSON.parse(localStorage.getItem("notes"));

  const handleClose = () => {
    setOpenDeleteDialog({ ...openDeleteDialog, id: "", state: false });
  };

  const handleCloseSnack = () => {
    setOpenSuccess(false);
    window.history.replaceState(null, null, window.location.pathname);
  };

  const deleteNote = (index) => {
    let array = [...notes];

    const isTrash = location.pathname === "/trash";

    if (isTrash) {
      array.splice(openDeleteDialog.id, 1);
    } else {
      array[index].status = status.deleted;
    }

    localStorage.setItem("notes", JSON.stringify(array));

    if (isTrash) {
      setOpenDeleteDialog({ ...openDeleteDialog, id: "", state: false });
    } else {
      setOpenDeleted(true);
    }
  };

  const favoriteNote = (id) => {
    let array = [...notes];

    array[id].fav = !array[id].fav;

    localStorage.setItem("notes", JSON.stringify(array));
    setOpenDeleteDialog({ ...openDeleteDialog, id: "", state: false });
  };

  const recoverNote = (id) => {
    let array = [...notes];

    array[id].status = status.active;

    localStorage.setItem("notes", JSON.stringify(array));
    setOpenDeleteDialog({ ...openDeleteDialog, id: "", state: false });
  };

  const switchRenderNotes = (stat, favorite) => {
    const path = location.pathname;

    switch (path) {
      case "/favorites":
        return stat === status.active && favorite === true;

      case "/trash":
        return stat === status.deleted;

      default:
        return stat === status.active;
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        flexGrow: 1,
        paddingBottom: "10px",
      }}
    >
      <Typography
        sx={{
          "@media (max-width:600px)": {
            fontSize: "2.5rem",
          },
        }}
        color={colors.main}
        fontSize="3rem"
        fontFamily="cursive"
      >
        {title}
      </Typography>
      <Divider sx={{ margin: "20px 0" }} />
      {notes === null || notes.length < 1 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ textAlign: "center", color: colors.secondary, mb: "25px" }}
            fontSize={28}
            fontFamily="cursive"
            fontWeight={600}
          >
            {empty}
          </Typography>
          <IconButton onClick={() => navigate("/note")}>
            <AddCircle
              className="heartBeat"
              sx={{
                color: colors.opacity_main,
                fontSize: "3rem",
                position: "absolute",
              }}
            />
            <AddCircle
              sx={{
                color: colors.main,
                fontSize: "3rem",
                position: "relative",
              }}
            />
          </IconButton>
          <StartSvg width="auto" style={{ maxHeight: "500" }} />
        </Box>
      ) : (
        <Grid
          container
          sx={{ width: "100%", margin: 0 }}
          alignItems="center"
          columnGap={2}
          rowSpacing={3}
        >
          {notes.map((note, index) =>
            switchRenderNotes(note?.status, note?.fav) ? (
              <Grid item xs={12} md sx={{ padding: 0 }} key={index}>
                <NoteCard
                  owner={note?.owner}
                  title={note?.title}
                  subtitle={note?.subtitle}
                  content={note?.content}
                  src={`/view/${index}`}
                  onClick={() =>
                    navigate("/note", {
                      state: { ...note, id: index, editing: true },
                    })
                  }
                  onDelete={() => {
                    if (location.pathname === "/trash") {
                      setOpenDeleteDialog({
                        ...openDeleteDialog,
                        id: index,
                        state: true,
                      });
                    } else {
                      deleteNote(index);
                    }
                  }}
                  onFavorite={() => favoriteNote(index)}
                  onRecover={() => recoverNote(index)}
                  favActive={note?.fav}
                  isDeleted={note?.status === status.deleted}
                  sx={{ margin: "auto" }}
                />
              </Grid>
            ) : null
          )}
          <Fab
            onClick={() => navigate("/note")}
            sx={{
              position: "absolute",
              bottom: 50,
              left: 25,
              background: colors.main,
              color: "#fff",
              "&:hover": {
                background: colors.secondary,
              },
            }}
          >
            <Add />
          </Fab>
        </Grid>
      )}

      <Snackbar
        open={openSuccess}
        autoHideDuration={2000}
        onClose={() => handleCloseSnack()}
      >
        <Alert
          onClose={() => handleCloseSnack()}
          severity="success"
          sx={{ width: "100%", boxShadow: "10px 10px 10px grey" }}
        >
          {location?.state?.text}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openDeleted}
        autoHideDuration={2000}
        onClose={() => setOpenDeleted(false)}
      >
        <Alert
          onClose={() => setOpenDeleted(false)}
          severity="info"
          sx={{ width: "100%", boxShadow: "10px 10px 10px grey" }}
        >
          {translate("ROOT_trash_moved")}
        </Alert>
      </Snackbar>
      <Dialog
        open={openDeleteDialog?.state}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          handleClose();
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{translate("ROOT_delete_dialog_title")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {translate("ROOT_delete_dialog_text")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton
            onClick={() => {
              handleClose();
            }}
            sx={{
              textTransform: "none",
              "&.MuiButtonBase-root": {
                background: colors.pale,
              },
              "&:hover": {
                background: colors.dark_pale,
              },
            }}
          >
            {translate("ROOT_delete_dialog_button_1")}
          </CustomButton>
          <CustomButton onClick={() => deleteNote()}>
            {translate("ROOT_delete_dialog_button_2")}
          </CustomButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Main;
