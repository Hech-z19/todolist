import { useState, forwardRef } from "react";
import {
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
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import colors from "Utils/colors";
import translate from "Utils/translate";
import NoteCard from "Components/Items/NoteCard";
import CustomButton from "Components/Items/CustomButton";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSuccess, setOpenSuccess] = useState(
    false || location?.state?.success
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    state: false,
    id: "",
  });

  const notes = JSON.parse(localStorage.getItem("notes"));
  const alternativeContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleClose = () => {
    setOpenDeleteDialog({ ...openDeleteDialog, id: "", state: false });
  };

  const handleCloseSnack = () => {
    setOpenSuccess(false);
    window.history.replaceState(null, null, window.location.pathname);
  };

  const deleteNote = () => {
    let array = [...notes];

    array.splice(openDeleteDialog.id, 1);

    localStorage.setItem("notes", JSON.stringify(array));
    setOpenDeleteDialog({ ...openDeleteDialog, id: "", state: false });
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        flexGrow: 1,
        paddingBottom: "10px",
        ...(notes === null || notes.length < 1 ? alternativeContainer : {}),
      }}
    >
      {notes === null || notes.length < 1 ? (
        <Typography
          sx={{ textAlign: "center", color: colors.secondary }}
          fontSize={28}
          fontFamily="cursive"
          fontWeight={600}
        >
          {translate("ROOT_empty_title")}
        </Typography>
      ) : (
        <Grid
          container
          sx={{ width: "100%", margin: 0 }}
          justifyContent="center"
          alignItems="center"
          rowSpacing={3}
        >
          {notes.map((note, index) => (
            <Grid item xs={12} sm={6} md sx={{ padding: 0 }} key={index}>
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
                onDelete={() =>
                  setOpenDeleteDialog({
                    ...openDeleteDialog,
                    id: index,
                    state: true,
                  })
                }
                sx={{ margin: "auto" }}
              />
            </Grid>
          ))}
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
          sx={{ width: "100%" }}
        >
          {location?.state?.text}
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
