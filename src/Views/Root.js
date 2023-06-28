import { Outlet } from "react-router-dom";

import colors from "Utils/colors";
import AppBar from "Components/Layout/AppBar";

const Root = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflow: "auto",
        backgroundColor: colors.light,
      }}
    >
      <AppBar />
      <Outlet />
    </div>
  );
};

export default Root;
