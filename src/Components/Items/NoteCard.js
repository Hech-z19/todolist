import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import translate from "Utils/translate";
import colors from "Utils/colors";
import CustomButtom from "Components/Items/CustomButton";

const NoteCard = ({ owner, title, subtitle, content, onClick, src, sx }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 275, ...sx }}>
      <CardContent>
        <Typography
          sx={{
            fontSize: 14,
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
          }}
          onClick={() => navigate(src)}
        >
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {subtitle}
        </Typography>
        <Typography variant="body2">{content}</Typography>
      </CardContent>
      <CardActions>
        <CustomButtom onClick={onClick}>
          {translate("CARD_button_edit")}
        </CustomButtom>
      </CardActions>
    </Card>
  );
};

export default NoteCard;
