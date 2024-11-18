// //import React from "react";

// import { useRoutes } from "react-router-dom";
// import HomeTemplate from "../Templates/HomeTemplate/HomeTemplate.jsx";
// import { CourseSingle } from "../component/CourseSingle/CourseSingle.jsx";

// const useRouterCustome = () => {
//   const router = useRoutes([
//     {
//       path: "/",
//       element: <HomeTemplate />,
//       children: [
//         {
//           index: true,
//           element: <CourseSingle />,
//         },
//       ],
//     },
//   ]);
//   return router;
// };

// export default useRouterCustome;



import { useRoutes } from "react-router-dom";
import HomeTemplate from "../Templates/HomeTemplate/HomeTemplate.jsx";
import { CourseSingle } from "../component/CourseSingle/CourseSingle.jsx";
import CoursePage from "../component/CoursePage/CoursePage.jsx";
import LoginRegister from "../component/LoginRegister/LoginRegister.jsx";

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
    {
      path: "/courses", 
      element: <HomeTemplate />, 
      children: [
        {
          index: true,
          element: <CoursePage />,
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
  ]);
  return router;
};

export default useRouterCustome;

