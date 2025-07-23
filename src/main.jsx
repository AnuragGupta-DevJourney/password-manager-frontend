import { lazy, StrictMode, Suspense, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Loader from "./components/Loader.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PrivateRoute from "./components/PrivateRouting/PrivateRoute.jsx";
import UpadtePasswordPage from "./pages/UpadtePasswordPage.jsx";
import Error from "./components/Error.jsx";
import ResetPasswordLink from "./components/ResetPasswordLink.jsx";
import ResetPasswordPage from "./components/ResetPasswordPage.jsx";

const AddCredentials = lazy(() => import("./pages/AddCredentials.jsx"));
const EditCredentialPage = lazy(() => import("./pages/EditCredentialPage.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/edit-credential/:id",
    element: (
      <PrivateRoute>
        <Suspense fallback={<Loader />}>
          <EditCredentialPage />
        </Suspense>
      </PrivateRoute>
    ),
  },
  {
    path: "/add-credential-page",
    element: (
      <PrivateRoute>
        <Suspense fallback={<Loader />}>
          <AddCredentials />
        </Suspense>
      </PrivateRoute>
    ),
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/change-password",
    element: (
      <PrivateRoute>
        <Suspense fallback={<Loader />}>
          <UpadtePasswordPage />
        </Suspense>
        ?
      </PrivateRoute>
    ),
  },
  {
    path: "/reset-password-link",
    element: (
      <>
        <Suspense fallback={<Loader />}>
          <ResetPasswordLink />
        </Suspense>
        ?
      </>
    ),
  },
  {
    path: "/reset-password-page/:token",
    element: (
      <>
        <Suspense fallback={<Loader />}>
          <ResetPasswordPage />
        </Suspense>
        ?
      </>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </>
);
