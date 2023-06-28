import { createBrowserRouter } from "react-router-dom";

import Root from "Views/Root";
import ErrorPage from "Views/Error/error-page";
import Main from "Views/Notes/Main";
import NoteForm from "Views/Notes/NoteForm";
import NoteDetail from "Views/Notes/NoteDetail";

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
      { path: "/view/:id", element: <NoteDetail /> },
    ],
  },
]);

export default router;
