import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UtilContextProvider } from "./context/utilContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ProjectsContextProvider } from "./context/ProjectContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UtilContextProvider>
      <AuthContextProvider>
        <ProjectsContextProvider>
          <App />
        </ProjectsContextProvider>
      </AuthContextProvider>
    </UtilContextProvider>
  </React.StrictMode>
);
