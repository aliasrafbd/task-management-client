import {
    createBrowserRouter,
} from "react-router-dom";

import Home from "../pages/Home";
import Users from "../pages/Users";
import SignUp from "../pages/SignUp";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import HomeLayout from "../layouts/HomeLayout";


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                
            },
            {
                path: "/users",
                element: <PrivateRoute><Users></Users></PrivateRoute>,
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>,
    },
]);

export default router;