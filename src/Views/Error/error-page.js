import { useRouteError } from "react-router-dom";

import translate from "Utils/translate";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      <h1>{translate("ERROR_page_not_found_exclamation")}</h1>
      <p>{translate("ERROR_page_not_found_title")}</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
