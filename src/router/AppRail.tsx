import { useEffect, useState } from "react";
import NavigationRail from "../design/interface/NavigationRail/NavigationRail";
import { Outlet, useNavigate } from "react-router-dom";
import "./AppRail.css";

const AppRail = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        switch (currentPage) {
            case 0:
                navigate("/app/main/home");
                break;
            case 1:
                navigate("/app/main/search");
                break;
            case 2:
                navigate("/app/main/playlists");
                break;
        }
    }, [currentPage]);

    return (
        <>
            <NavigationRail
                currentIndex={currentPage}
                buttons={[
                    {
                        label: "Home",
                        icon: "ri-home-line",
                        activeIcon: "ri-home-fill",
                        onClick: () => {
                            setCurrentPage(0);
                        },
                    },
                    {
                        label: "Search",
                        icon: "ri-search-2-line",
                        activeIcon: "ri-search-2-fill",
                        onClick: () => {
                            setCurrentPage(1);
                        },
                    },
                    {
                        label: "Playlists",
                        icon: "ri-play-list-line",
                        activeIcon: "ri-play-list-fill",
                        onClick: () => {
                            setCurrentPage(2);
                        },
                    },
                ]}
            />

            <section id="screen">
                <Outlet />
            </section>
        </>
    );
};

export default AppRail;
