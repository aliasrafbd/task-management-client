import {
    createBrowserRouter,
} from "react-router-dom";

import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
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
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>,
    },
]);

export default router;