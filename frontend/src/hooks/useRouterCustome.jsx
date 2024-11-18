//import React from "react";

import { useRoutes } from "react-router-dom";
import HomeTemplate from "../Templates/HomeTemplate/HomeTemplate.jsx";
import { CourseSingle } from "../component/CourseSingle/CourseSingle.jsx";
import Light from "../component/Light/Light.jsx"
const useRouterCustome = () => {
  const router = useRoutes([
    {
      path: "/",
      element: <HomeTemplate />,
      children: [
        {
          index: true,
          element: <CourseSingle/>,
        },
        
      ],
    },
    {
      path: "/courses",
      element: <HomeTemplate />,
      children: [
        {
          index: true,
          element: <Light/>,
        },
        
      ],
    },
  ]);
  return router;
};

export default useRouterCustome;
