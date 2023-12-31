import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import AppBar from "./app/AppBar";
import { useEffect } from "react";

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            navigate("app/main");
        }

        // navigate("app/main");
    }, []);

    return (
        <>
            <AppBar />
            <section id="modal-context">
                <main id="content">
                    <Outlet />
                </main>
            </section>
        </>
    );
}

export default App;
