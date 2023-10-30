import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import AppBar from "./app/AppBar";
import { useEffect } from "react";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("app/main");
    }, []);

    return (
        <>
            <AppBar />
            <main id="content">
                <Outlet />
            </main>
        </>
    );
}

export default App;
