import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// Pages & Components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ClientPage from "./pages/ClientPage";
import DevPage from "./pages/DevPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SignUp from "./minipages/Signup";
import Projects from "./pages/ProjectsPage";


const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* home */}
        <Route
          path="/"
          element={
            !user ? (
              <Home />
            ) : user.role === "admin" ? (
              <ClientPage />
            ) : (
              <DevPage />
            )
          }
        />

        {/* Login */}
        <Route
          path="/Login"
          element={
            !user ? (
              <Login />
            ) : user.role === "admin" ? (
              <ClientPage />
            ) : (
              <DevPage />
            )
          }
        />

        {/* register */}
        <Route
          path="/Register"
          element={
            !user ? (
              <Register />
            ) : user.role === "admin" ? (
              <ClientPage />
            ) : (
              <DevPage />
            )
          }
        />

        {/* register/SignUp */}
        <Route
          path="/Register/SignUp"
          element={
            user ? (
              <Navigate
                to={user.role === "admin" ? "/ClientPage" : "/DevPage"}
              />
            ) : (
              <SignUp />
            )
          }
        />

        {/* Dev Page */}
        <Route
          path="/DevPage"
          element={
            user && user.role === "developer" ? (
              <DevPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Client Page */}
        <Route
          path="/ClientPage"
          element={
            user && user.role === "admin" ? <ClientPage /> : <Navigate to="/" />
          }
        />

        {/* Projects */}
        <Route
          path="/projects/:projectId"
          element={
            user && user.role === "developer" ? (
              <Projects />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
