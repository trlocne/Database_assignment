//import React from "react";

import { useRoutes } from "react-router-dom";
import HomeTemplate from "../Templates/HomeTemplate/HomeTemplate.jsx";
import { CourseSingle } from "../component/CourseSingle/CourseSingle.jsx";

const useRouterCustome = () => {
  const router = useRoutes([
    {
      path: "/",
      element: <HomeTemplate />,
      children: [
        {
          index: true,
          element: <CourseSingle />,
        },
      ],
    },
  ]);
  return router;
};

export default useRouterCustome;
