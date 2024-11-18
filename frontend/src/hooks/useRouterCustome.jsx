//import React from "react";

import { useRoutes } from "react-router-dom";
import HomeTemplate from "../Templates/HomeTemplate/HomeTemplate.jsx";
import { CourseSingle } from "../component/CourseSingle/CourseSingle.jsx";
import Lecture from "../pages/Lecture.jsx";

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
        {
          path: "lecture",
          element: <Lecture />,
        },
      ],
    },
  ]);
  return router;
};

export default useRouterCustome;
