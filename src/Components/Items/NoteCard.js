import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Delete,
  Edit,
  FavoriteBorder,
  Favorite,
  SettingsBackupRestore,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import colors from "Utils/colors";
import translate from "Utils/translate";

const NoteCard = ({
  owner,
  title,
  subtitle,
  content,
  onClick,
  src,
  sx,
  onDelete,
  onFavorite,
  favActive,
  isDeleted,
  onRecover,
}) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: 275,
        "@media (max-width:350px)": {
          width: 190,
        },
        ...sx,
      }}
    >
      <CardContent sx={{ height: "150px" }}>
        <Typography
          sx={{
            fontSize: 14,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
          color="text.secondary"
          gutterBottom
        >
          {owner}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{
            "&:hover": {
              color: colors.secondary,
              cursor: "pointer",
            },
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
          onClick={() => navigate(src)}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            mb: 1.5,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
          color="text.secondary"
        >
          {subtitle}
        </Typography>
        <Typography
          sx={{
            wordBreak: "break-word",
            overflow: "hidden",
            width: "100%",
            height: "40%",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "0",
              left: "0",
              right: "0",
              height: "30px",
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
            },
          }}
          variant="body2"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        {isDeleted ? (
          <Typography fontSize="0.7rem">
            {translate("TRASH_recover_button")}
          </Typography>
        ) : (
          <IconButton sx={{ color: colors.favorite }} onClick={onFavorite}>
            {favActive ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        )}
        <IconButton
          sx={{ color: colors.main }}
          onClick={isDeleted ? onRecover : onClick}
        >
          {isDeleted ? <SettingsBackupRestore /> : <Edit />}
        </IconButton>
        <IconButton sx={{ color: colors.alert }} onClick={onDelete}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NoteCard;
