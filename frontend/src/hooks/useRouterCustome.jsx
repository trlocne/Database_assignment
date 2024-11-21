// //import React from "react";

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
          element: <CoursePage />, // Changed from CourseSingle  
        },  
        {  
          path: "course/:id", // Add this route for individual course details  
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
  ]);  
  return router;  
};  

export default useRouterCustome;