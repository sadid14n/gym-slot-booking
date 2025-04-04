import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import SlotBooking from "./pages/SlotBooking";
import Profile from "./pages/Profile";
import Spinner from "./component/Spinner";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/ProtectedRoute";
import PublicRoute from "./component/PublicRoute";
import Notification from "./pages/Notification";
import AdminSlotBookingList from "./pages/admin/AdminSlotBookingList";
import UserSlotStatus from "./pages/user/UserSlotStatus";
import SlotBookingList from "./pages/SlotBookingList";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-slot"
              element={
                <ProtectedRoute>
                  <SlotBooking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notification />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-slot-list"
              element={
                <ProtectedRoute>
                  <AdminSlotBookingList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-slot-list"
              element={
                <ProtectedRoute>
                  <UserSlotStatus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/slot-list"
              element={
                <ProtectedRoute>
                  <SlotBookingList />
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
