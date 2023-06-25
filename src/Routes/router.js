import { createBrowserRouter } from "react-router-dom";

import Root from "Views/Root";
import ErrorPage from "Views/Error/error-page";
import Main from 'Views/Notes/Main';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Main/>,
      },
    ],
  },
]);

export default router;
