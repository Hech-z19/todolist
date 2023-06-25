/* eslint-disable react-hooks/rules-of-hooks */
import { useTranslation } from "react-i18next";

const translate = (text) => {
  const { t } = useTranslation();

  return t(text ?? "");
};

export default translate;
