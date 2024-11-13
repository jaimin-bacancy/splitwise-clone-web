import {
  createRootRoute,
  createRoute,
  createRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import React, { useContext } from "react";

// Routes
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Activity from "./components/Activity";
import AddExpense from "./components/AddExpense";
import EditProfile from "./components/EditProfile";
import GroupUsers from "./components/GroupUsers";
import Home from "./components/Home";
import Login from "./components/Login";
import OTPVerification from "./components/OTPVerification";
import Register from "./components/Register";
import { AuthContext, AuthProvider } from "./context/AuthContext";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
  component: () => <Login />,
});

const otpVerificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "otp-verification/$tempToken",
  component: () => <OTPVerification />,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "register",
  component: () => <Register />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  ),
});

const editProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "edit-profile",
  component: () => (
    <ProtectedRoute>
      <EditProfile />
    </ProtectedRoute>
  ),
});

const addExpenseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "add-expense",
  component: () => (
    <ProtectedRoute>
      <AddExpense />
    </ProtectedRoute>
  ),
});

const activityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "activity",
  component: () => (
    <ProtectedRoute>
      <Activity />
    </ProtectedRoute>
  ),
});

const groupUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "$groupId/users",
  component: () => (
    <ProtectedRoute>
      <GroupUsers />
    </ProtectedRoute>
  ),
});

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

const routeTree = rootRoute.addChildren([
  loginRoute,
  otpVerificationRoute,
  registerRoute,
  homeRoute,
  editProfileRoute,
  addExpenseRoute,
  activityRoute,
  groupUsersRoute,
]);

const router = createRouter({ routeTree });

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}>
          <Outlet />
        </RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
