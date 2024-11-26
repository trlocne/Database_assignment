import { RouterProvider } from "react-router-dom";
import "./App.css";
import useRouterCustome from "./hooks/useRouterCustome.jsx";
import { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const NotificationContext = createContext();
function App() {
  const handleNotification = (message, type) => {
    return toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      hideProgressBar: false,
    });
  };
  const router = useRouterCustome();
  return (
    <NotificationContext.Provider value={{ handleNotification }}>
      {router}
      <ToastContainer />
    </NotificationContext.Provider>
  );
}

export default App;
