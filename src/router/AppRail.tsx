import NavigationRail from "../design/interface/NavigationRail/NavigationRail";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./AppRail.css";
import PlayerContainer from "../components/Player/Player";
// import { useMemo, useRef, useState } from "react";
// // import useAuth from "../hooks/useAuth";
// import playback from "../assets/videoplayback.aac";
import { MAIN_HOME_PATH, MAIN_SEARCH_PATH } from "./Paths";

const AppRail = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // useEffect(() => {
    //     console.log(location.pathname);
    //     console.log(auth);

    //     if (!location.pathname.includes("/app/auth") && !auth) {
    //         console.log(location);
    //         // navigate("/app/auth/login");
    //     }
    // }, [auth]);

    return (
        <>
            <NavigationRail
                currentId={location.pathname}
                buttons={[
                    {
                        id: "/app/main/home",
                        label: "Home",
                        icon: "ri-home-line",
                        activeIcon: "ri-home-fill",
                        onClick: () => {
                            navigate(MAIN_HOME_PATH);
                        },
                    },
                    {
                        id: "/app/main/search",
                        label: "Search",
                        icon: "ri-search-2-line",
                        activeIcon: "ri-search-2-fill",
                        onClick: () => {
                            navigate(MAIN_SEARCH_PATH);
                        },
                    },
                    {
                        id: "/app/main/playlists",
                        label: "Playlists",
                        icon: "ri-play-list-line",
                        activeIcon: "ri-play-list-fill",
                        onClick: () => {
                            navigate("/app/main/playlists");
                        },
                    },
                ]}
            />

            <PlayerContainer>
                <section id="screen">
                    <Outlet />
                </section>
            </PlayerContainer>
        </>
    );
};

export default AppRail;
