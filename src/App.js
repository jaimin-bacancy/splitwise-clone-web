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

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
  component: function Index() {
    return <Login />;
  },
});

const otpVerificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "otp-verification/$tempToken",
  component: function Index() {
    return <OTPVerification />;
  },
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "register",
  component: function Index() {
    return <Register />;
  },
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    );
  },
});

const editProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "edit-profile",
  component: function Index() {
    return (
      <ProtectedRoute>
        <EditProfile />
      </ProtectedRoute>
    );
  },
});

const addExpenseRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: "add-expense",
  component: function Index() {
    return <AddExpense />;
  },
});

const activityRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: "activity",
  component: function Index() {
    return <Activity />;
  },
});

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

const routeTree = rootRoute.addChildren([
  indexRoute,
  otpVerificationRoute,
  registerRoute,
  homeRoute,
  editProfileRoute,
  addExpenseRoute,
  activityRoute,
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
