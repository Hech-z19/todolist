import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import translate from "Utils/translate";
import colors from "Utils/colors";
import CustomButtom from "Components/Items/CustomButton";

const NoteCard = ({
  owner,
  title,
  subtitle,
  content,
  onClick,
  src,
  sx,
  onDelete,
}) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 275, ...sx }}>
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
      <CardActions sx={{ justifyContent: "space-between" }}>
        <CustomButtom onClick={onClick}>
          {translate("CARD_button_edit")}
        </CustomButtom>
        <IconButton onClick={onDelete}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NoteCard;
