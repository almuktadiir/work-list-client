import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/', 
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/register',
            element: <Register></Register>
        },
        {
            path: '/about',
            // element: <Register></Register>
        },
      ]
    },
    {
      path:'/dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: '/dashboard',
        },
      ]
    }
  ]);

  export default router;