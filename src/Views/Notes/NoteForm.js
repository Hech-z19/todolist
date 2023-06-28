import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { convert } from "html-to-text";
import { TextField, styled, Typography, CircularProgress } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import colors from "Utils/colors";
import translate from "Utils/translate";
import CustomButton from "Components/Items/CustomButton";

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  gap: "1rem",
});

const NoteForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const text = translate(
    `NOTEFORM_success_${location?.state?.editing ? "edit" : "create"}`
  );

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: location?.state?.editing
      ? {
          owner: location?.state?.owner,
          title: location?.state?.title,
          subtitle: location?.state?.subtitle,
          content: location?.state?.content,
        }
      : {
          owner: "",
          title: "",
          subtitle: "",
          content: "",
        },
    validationSchema: Yup.object({
      owner: Yup.string()
        .max(30, translate("NOTEFORM_owner_error"))
        .required(translate("NOTEFORM_required_error")),
      title: Yup.string()
        .max(80, translate("NOTEFORM_title_error"))
        .required(translate("NOTEFORM_required_error")),
      subtitle: Yup.string()
        .max(80, translate("NOTEFORM_title_error"))
        .optional(),
      content: Yup.string().required(translate("NOTEFORM_required_error")),
    }),
  });

  function handleKeyPress(event) {
    const contentLength = event.target.innerText.length;
    if (contentLength >= 1000 && event.which !== 8 && event.which !== 46) {
      event.preventDefault();
    }
  }

  return (
    <FormContainer
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        const notes = localStorage.getItem("notes");

        const array = JSON.parse(notes) || [];

        const json = {
          id: location?.state?.id ? location?.state?.id : array.length + 1,
          owner: formik.values.owner,
          title: formik.values.title,
          subtitle: formik.values.subtitle,
          content: formik.values.content,
        };

        if (location?.state?.editing) {
          const ind = array.findIndex(
            (elem) => elem.id === location?.state?.id
          );

          if (ind !== -1) {
            array[ind] = json;
          }
        } else {
          array.push(json);
        }

        localStorage.setItem("notes", JSON.stringify(array));
        setLoading(false);
        navigate("/", {
          state: {
            success: true,
            text: text,
          },
        });
      }}
    >
      <Typography
        sx={{ textAlign: "center", color: colors.secondary }}
        fontSize={30}
        fontFamily="cursive"
        fontWeight={600}
      >
        {translate("NOTEFORM_title")}
      </Typography>
      <TextField
        id="owner"
        name="owner"
        label={translate("NOTEFORM_owner_label")}
        sx={{ maxWidth: "500px" }}
        fullWidth
        value={formik.values.owner}
        onChange={formik.handleChange}
        error={formik.errors.owner?.length > 0}
        helperText={formik.errors.owner}
      />
      <TextField
        id="title"
        name="title"
        label={translate("NOTEFORM_title_label")}
        sx={{ maxWidth: "500px" }}
        fullWidth
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title?.length > 0}
        helperText={formik.errors.title}
      />
      <TextField
        id="subtitle"
        name="subtitle"
        label={translate("NOTEFORM_subtitle_label")}
        sx={{ maxWidth: "500px" }}
        fullWidth
        value={formik.values.subtitle}
        onChange={formik.handleChange}
        error={formik.errors.subtitle?.length > 0}
        helperText={formik.errors.subtitle}
      />
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <ReactQuill
          theme="snow"
          value={formik.values.content}
          style={{ width: "100%", maxWidth: "500px" }}
          className={formik.errors.content?.length > 0 ? "editor-error" : ""}
          placeholder={translate("NOTEFORM_content_label")}
          onKeyPress={handleKeyPress}
          onChange={(value) => {
            if (convert(value).length <= 1000) {
              formik.setFieldValue("content", value);
            }
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {formik.errors.content?.length > 0 ? (
            <Typography
              color="#d32f2f"
              sx={{
                fontWeight: 400,
                fontSize: "0.75rem",
                lineHeight: 1.66,
                letterSpacing: "0.03333em",
                textAlign: "left",
                margin: "3px 14px 0",
              }}
            >
              {formik.errors.content}
            </Typography>
          ) : null}
          <Typography
            color="#9b9b9b"
            sx={{
              fontWeight: 400,
              fontSize: "0.75rem",
              lineHeight: 1.66,
              letterSpacing: "0.03333em",
              textAlign: "right",
              margin: "3px 14px 0 auto",
            }}
          >{`${convert(formik.values.content).length}/1000`}</Typography>
        </div>
      </div>

      <CustomButton
        type="submit"
        style={{ width: "100px" }}
        disabled={
          Object.keys(formik.errors).length > 0 ||
          formik.values.owner.length < 1 ||
          formik.values.title.length < 1 ||
          formik.values.content.length < 1
        }
      >
        {loading ? (
          <CircularProgress size={20} sx={{ color: "white" }} />
        ) : (
          translate("NOTEFORM_button_save")
        )}
      </CustomButton>
    </FormContainer>
  );
};

export default NoteForm;
