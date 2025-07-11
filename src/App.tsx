import { Toaster } from "sonner";
import "./App.css";
import {
  // createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import AuthLayout from "./modules/SharedModules/AuthLayout/AuthLayout";
import Register from "./modules/AdminModules/Authentication/Register/Register";
import ChangePassword from "./modules/AdminModules/Authentication/ChangePassword/ChangePassword";
import VerifyAccount from "./modules/AdminModules/Authentication/VerifyAccount/VerifyAccount";
import ResetPassword from "./modules/AdminModules/Authentication/ResetPass/ResetPassword";
import ForgetPassword from "./modules/AdminModules/Authentication/ForgetPassword/ForgetPassword";
import NotFound from "./modules/SharedModules/NotFound/NotFound";
import Login from "./modules/AdminModules/Authentication/Login/Login";
import StudentsList from "./modules/AdminModules/Students/StudentsList/StudentsList";

import Group_crud from "./group_crud/Group_crud";
import MasterLayout from "./modules/SharedModules/MasterLayout/MasterLayout";
import Questions from "./modules/AdminModules/Questions/Questions";
import ProtectedRoute from "./modules/SharedModules/ProtectedRoute/ProtectedRoute";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "./store/auth/useLocalStorage";
import { clearUser, setUser } from "./store/auth/AuthSlice";
import { useEffect } from "react";
import Results from "./modules/SharedModules/Results/Results";
import QuizResultDetails from "./modules/AdminModules/QuizResultDetails/QuizResultDetails";

import StudentsResults from "./modules/StudentModules/StudentResults/StudentsResults";
import StudentQuiz from "./modules/StudentQuiz/StudentQuiz";
import Dashboard from "./modules/Dashboard/Dashboard";
import Quizes from "./modules/AdminModules/Quizes/Quizes";
import QuizeData from "./modules/AdminModules/Quizes/QuizeData";
import TestQuestions from "./modules/StudentModules/TestQuestions/TestQuestions";

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
  const router = createHashRouter([
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
      children: [
        { index: true, element: <Dashboard /> },
        { path: "questions", element: <Questions /> },
        { path: "student", element: <StudentsList /> },
        { path: "group-crud", element: <Group_crud /> },
        { path: "results", element: <Results /> },
        { path: "results/:quizId", element: <QuizResultDetails /> },
        { path: "student-quiz", element: <StudentQuiz /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "quizes", element: <Quizes /> },
        { path: "test/:id", element: <TestQuestions /> },
        { path: "quizes/:quizId", element: <QuizeData /> },
        { path: "student-results", element: <StudentsResults /> },
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
