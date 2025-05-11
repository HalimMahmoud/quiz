import { Toaster } from "sonner";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./modules/SharedModules/AuthLayout/AuthLayout";
import Register from "./modules/AdminModules/Authentication/Register/Register";
import ChangePassword from "./modules/AdminModules/Authentication/ChangePassword/ChangePassword";
import VerifyAccount from "./modules/AdminModules/Authentication/VerifyAccount/VerifyAccount";
import ResetPassword from "./modules/AdminModules/Authentication/ResetPass/ResetPassword";
import ForgetPassword from "./modules/AdminModules/Authentication/ForgetPassword/ForgetPassword";
import NotFound from "./modules/SharedModules/NotFound/NotFound";
import Login from "./modules/AdminModules/Authentication/Login/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,

      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "forget-password", element: <ForgetPassword /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
