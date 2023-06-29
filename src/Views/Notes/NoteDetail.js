import {
  styled,
  Typography,
  Divider,
  Container,
  IconButton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";

import status from "Utils/status";
import translate from "Utils/translate";
import colors from "Utils/colors";

const CustomDivider = styled(Divider)(({ theme }) => ({
  margin: "15px 5px",
}));

const Label = styled(Typography)(({ theme }) => ({
  color: colors.main,
  fontFamily: "monospace",
  marginBottom: "8px",
  "@media (max-width:600px)": {
    fontSize: "1.5rem",
  },
}));

const Text = styled(Typography)(({ theme }) => ({
  color: colors.dark,
  fontSize: "1.5rem",
  "@media (max-width:600px)": {
    fontSize: "1rem",
  },
}));

const TextArea = styled(Typography)(({ theme }) => ({
  width: "100%",
  wordBreak: "break-word",
  overflow: "auto",
  maxHeight: "500px",
}));

const NoteDetail = () => {
  const navigate = useNavigate();
  const params = useParams();

  const notes = JSON.parse(localStorage.getItem("notes"));

  const note = notes[params?.id];

  const alternativeContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingBottom: "20px",
        ...(!note ? alternativeContainer : {}),
      }}
    >
      {note ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Label variant="h3">{translate("NOTEFORM_owner_label")}</Label>
            <IconButton
              sx={{
                color: colors.main,
              }}
              disabled={note?.status === status?.deleted }
              onClick={() => {
                if (note?.status === status?.deleted) {
                  return;
                } else {
                  navigate("/note", {
                    state: { editing: true, ...note, id: params?.id },
                  });
                }
              }}
            >
              <Edit
                sx={{
                  fontSize: "2rem",
                  "@media (max-width:600px)": {
                    fontSize: "1.5rem",
                  },
                }}
              />
            </IconButton>
          </div>
          <Text variant="body1">{note.owner}</Text>
          <CustomDivider />
          <Label variant="h3">{translate("NOTEFORM_title_label")}</Label>
          <Text variant="body1">{note.title}</Text>
          {note?.subtitle && note?.subtitle.length > 0 ? (
            <>
              <CustomDivider />
              <Label variant="h3">
                {translate("NOTEFORM_subtitle_label")
                  .replace(" (optional)", "")
                  .replace(" (opcional)", "")}
              </Label>
              <Text variant="body1">{note.subtitle}</Text>
            </>
          ) : null}
          <CustomDivider />
          <Label variant="h3">{translate("NOTEFORM_content_label")}</Label>
          <TextArea dangerouslySetInnerHTML={{ __html: note?.content }} />
        </>
      ) : (
        <Typography
          sx={{ textAlign: "center", color: colors.secondary }}
          fontSize={28}
          fontFamily="cursive"
          fontWeight={600}
        >
          {translate("NOTEDETAIL_empty_title")}
        </Typography>
      )}
    </Container>
  );
};

export default NoteDetail;
