import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";
import AdminApp from "@/AdminApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
const isAdminPath = window.location.pathname.includes("/admin");

root.render(
  <React.StrictMode>
    {isAdminPath ? <AdminApp /> : <App />}
  </React.StrictMode>,
);
