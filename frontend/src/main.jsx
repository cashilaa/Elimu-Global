import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Category from "./Category";
import App from "./App";
import './index.css';
import Courses from "./Courses";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import Login from "./Login";
import SignUp from "./Signup";
import Root from "./Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root key={null} />,
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
  },
  {
    path: "/category",
    element: <Root key={null} />,
    children: [
      {
        path: "/category",
        element: <Category />,
      },
    ],
  },
  {
    path: "/student/courses",
    element: <Root key={null} />,
    children: [
      {
        path: "/student/courses",
        element: <Courses />,
      },
    ],
  },
  {
    path: "/aboutus",
    element: <Root key={null} />,
    children: [
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
    ],
  },
  {
    path: "/contact",
    element: <Root key={null} />,
    children: [
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: <Root key={null} />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Root key={null} />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  }
])
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode key={null}>
    <RouterProvider router={router} key={null} />
  </React.StrictMode>
);