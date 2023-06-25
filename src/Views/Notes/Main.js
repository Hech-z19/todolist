import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import colors from "Utils/colors";
import translate from "Utils/translate";
import NoteCard from "Components/Items/NoteCard";

const Main = () => {
  const navigate = useNavigate();
  const notes = JSON.parse(localStorage.getItem("notes"));
  const alternativeContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        flexGrow: 1,
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
          {notes.map((note) => (
            <Grid item xs={12} sm={6} md sx={{ padding: 0 }}>
              <NoteCard
                owner={note?.owner}
                title={note?.title}
                subtitle={note?.subtitle}
                content={note?.content}
                src={`/view/${note?.id}`}
                onClick={() => navigate(`/edit/${note?.id}`)}
                sx={{ margin: "auto" }}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Main;
