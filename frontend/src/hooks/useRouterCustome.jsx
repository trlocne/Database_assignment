// //import React from "react";

import { useRoutes } from "react-router-dom";
import HomeTemplate from "../Templates/HomeTemplate/HomeTemplate.jsx";
import { CourseSingle } from "../component/CourseSingle/CourseSingle.jsx";
import CoursePage from "../component/CoursePage/CoursePage.jsx";
import LoginRegister from "../component/LoginRegister/LoginRegister.jsx";
import CoursePageLecturer from "../component/CoursePageLecturer/CoursePageLecturer.jsx";
import LMSInterface from "../component/Light/Light.jsx";

const useRouterCustome = () => {
  const router = useRoutes([
    {
      path: "/",
      element: <HomeTemplate />,
      children: [
        {
          index: true,
          element: <CoursePage />, // Changed from CourseSingle
        },
        {
          path: "course/:id", // Add this route for individual course details
          element: <CourseSingle />,
        },
        {
          path: "video/:id",
          element: <LMSInterface />,
        },
      ],
    },
    {
      path: "/courses",
      element: <HomeTemplate />,
      children: [
        {
          index: true,
          element: <CoursePage />,
        },
        {
          path: ":id", // Dynamic route for specific course
          element: <CourseSingle />,
        },
      ],
    },
    {
      path: "/loginregister",
      element: <HomeTemplate />,
      children: [
        {
          index: true,
          element: <LoginRegister />,
        },
      ],
    },
    {
      path: "/course1",
      element: <HomeTemplate />,
      children: [
        {
          index: true,
          element: <CoursePageLecturer />,
        },
      ],
    },
  ]);
  return router;
};

export default useRouterCustome;
