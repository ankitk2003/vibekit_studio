import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthStore from "./store/authStore";
import PageBuilder from "./components/PageBuilder";
import PublishedPage from "./pages/PublishedPage";

function App() {
  const verifyAuth = useAuthStore((state) => state.verifyAuth);

  // Verify authentication on app load
  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/app" element={<ProtectedRoute component={<Dashboard />} />} />
          <Route path="/editor/:id" element={<ProtectedRoute component={<PageBuilder />} />} />
          <Route path="/p/:slug" element={<PublishedPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
