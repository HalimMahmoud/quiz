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
import MasterLayout from "./modules/SharedModules/MasterLayout/MasterLayout";
import Questions from "./modules/AdminModules/Questions/Questions";
import ProtectedRoute from "./modules/SharedModules/ProtectedRoute/ProtectedRoute";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "./store/auth/useLocalStorage";
import { clearUser, setUser } from "./store/auth/AuthSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  // Using useLocalStorage to manage both token and user in localStorage
  const [token] = useLocalStorage("token");
  const [user] = useLocalStorage("user");

  const decodedUser = JSON.parse(user as string);
  useEffect(() => {
    if (token && user) {
      // If both token and user are found in localStorage, sync them with Redux store
      dispatch(setUser({ user: decodedUser, token }));
    } else {
      // If no token or user data, clear from Redux
      dispatch(clearUser());
    }
  }, [token, user, dispatch, decodedUser]);
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
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,

      children: [{ path: "questions", element: <Questions /> }],
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
