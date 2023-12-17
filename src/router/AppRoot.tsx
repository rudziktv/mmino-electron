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
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { AuthLoader } from "./loader/AuthLoader";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "app/main",
                element: <AppRail />,
                loader: AuthLoader,
                children: [
                    {
                        path: "home",
                        loader: AuthLoader,
                        element: <Home />,
                    },
                    {
                        path: "search",
                        loader: AuthLoader,
                        element: <Search />,
                    },
                    {
                        path: "playlists",
                        loader: AuthLoader,
                        element: <Home />,
                    },
                    {
                        path: "account",
                        loader: AuthLoader,
                        element: <Account />,
                    },
                ],
            },
            {
                path: "app/auth/login",
                element: <Login />,
            },
            {
                path: "app/auth/register",
                element: <Register />,
            },
        ],
    },
    {
        path: "app/auth/login/google/twojastara",
        element: <GoogleProvider />,
    },
    {
        path: "app/auth/login/provider/",
        element: <GoogleProvider />,
    },
    {
        path: "app/auth/login/provider/success",
        element: <ProviderSuccess />,
    },
]);

const AppRoot = () => {
    const auth = useAuth();

    useEffect(() => {
        console.log(location.pathname);
        console.log(auth);

        if (!location.pathname.includes("/app/auth") && !auth) {
            console.log(location);
            // navigate("/app/auth/login");
        }
    }, [auth]);

    return <RouterProvider router={router} />;
};

export default AppRoot;
