import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";

// tanstack
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UpdateTask from "./pages/UpdateTask.jsx";

// Create a client
const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/update-task-data/:id",
    element: <UpdateTask />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
