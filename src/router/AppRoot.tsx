import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import AppRail from "./AppRail";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import GoogleProvider from "../app/providers/GoogleProvider";
import ProviderSuccess from "../app/providers/ProviderSuccess";
import Account from "../screens/Account";
import Search from "../screens/Search";

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
                        element: <Search />,
                    },
                    {
                        path: "playlists",
                        element: <Home />,
                    },
                    {
                        path: "account",
                        element: <Account />,
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
            {
                path: "app/login/google/twojastara",
                element: <GoogleProvider />,
            },
            {
                path: "app/login/provider/success",
                element: <ProviderSuccess />,
            },
        ],
    },
]);

const AppRoot = () => {
    return <RouterProvider router={router} />;
};

export default AppRoot;
