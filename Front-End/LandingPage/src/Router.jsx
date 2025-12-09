import { createBrowserRouter } from "react-router-dom";
import Overview from "./Pages/Overview";
import Mission from "./Pages/Mission";
import Goal from "./Pages/Goal";
import Features from "./Pages/Features";
import Contact from "./Pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Overview />,
  },
  {
    path: "/Mission",
    element: <Mission />,
  },
  {
    path: "/Goal",
    element: <Goal />,
  },
  {
    path: "/Features",
    element: <Features />,
  },
  {
    path: "/contact-us",
    element: <Contact />,
  },
]);

export default router;