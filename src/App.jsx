import { ScreenSizeProvider } from "./assets/context/ScreenSizeContext";
import { AuthProvider } from "./assets/context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./assets/context/ThemeContext";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./assets/routes/PrivateRoute";
import Layout from "./assets/components/Layout";
import Events from "./assets/pages/Events";
import EventDetails from "./assets/pages/EventDetails";
import Bookings from "./assets/pages/Bookings";
import Register from "./assets/pages/Register";
import Login from "./assets/pages/Login";
import Dashboard from "./assets/pages/Dashboard";
import BookEvent from "./assets/pages/BookEvent";
import "./App.css";

function App() {
  return (
    <ScreenSizeProvider>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Events />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route
                  path="/bookings"
                  element={
                    <PrivateRoute>
                      <Bookings />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/bookevent/:id"
                  element={
                    <PrivateRoute>
                      <BookEvent />
                    </PrivateRoute>
                  }
                />
              </Route>

              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </ScreenSizeProvider>
  );
}

export default App;
