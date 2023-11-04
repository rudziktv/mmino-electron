import NavigationRail from "../design/interface/NavigationRail/NavigationRail";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./AppRail.css";
import PlayerContainer from "../components/Player/Player";
import { useRef, useState } from "react";

const AppRail = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [audioSource, setAudioSource] = useState("");
    const audioRef = useRef<HTMLAudioElement>(null);

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
                            navigate("/app/main/home");
                        },
                    },
                    {
                        id: "/app/main/search",
                        label: "Search",
                        icon: "ri-search-2-line",
                        activeIcon: "ri-search-2-fill",
                        onClick: () => {
                            navigate("/app/main/search");
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

            <PlayerContainer
                src={audioSource}
                setSrc={setAudioSource}
                audioRef={audioRef}
            >
                <section id="screen">
                    <Outlet />
                </section>
            </PlayerContainer>
        </>
    );
};

export default AppRail;
