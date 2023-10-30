import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import AppRail from "./AppRail";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "app/main",
                element: <AppRail />,
                children: [
                    {
                        path: "home",
                        element: <Home />,
                    },
                    {
                        path: "search",
                        element: <Home />,
                    },
                    {
                        path: "playlists",
                        element: <Home />,
                    },
                ],
            },
            {
                path: "app/login",
                element: <Login />,
            },
            {
                path: "app/register",
                element: <Register />,
            },
        ],
    },
]);

const AppRoot = () => {
    return <RouterProvider router={router} />;
};

export default AppRoot;
