import { createBrowserRouter } from "react-router-dom";

import Root from "Views/Root";
import ErrorPage from "Views/Error/error-page";
import Main from "Views/Notes/Main";
import NoteForm from "Views/Notes/NoteForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/note",
        element: <NoteForm />,
      },
    ],
  },
]);

export default router;
