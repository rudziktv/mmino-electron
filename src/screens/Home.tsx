import { useNavigate } from "react-router-dom";
import TextButton from "../design/interface/Button/CommonButtons/TextButton";
import useAuth from "../hooks/useAuth";
import { supabase } from "../supabase/client";
import "../styles/Home.css";
import Avatar from "../design/interface/Avatar/Avatar";
import ContextMenu from "../design/interface/ContextMenu/ContextMenu";
import ContextMenuItem from "../design/interface/ContextMenu/ContextMenuItem";
import { useEffect, useState } from "react";
import useLodaing from "../hooks/useLoading";
import SideModal from "../design/interface/SideSheets/SideModal";
import Card from "../design/interface/Card/Card";
import NotificationItem from "../components/NotificationItem/NotificationItem";
import Icon from "../design/interface/Icon/Icon";
import PlayerControls from "../components/Player/PlayerControls";
import OutlinedTextInput from "../design/interface/TextInput/OutlinedTextInput";
import usePlayer from "../hooks/usePlayer";
import LinearProgressIndicator from "../design/interface/LinearProgressIndicator/LinearProgressIndicator";
import FilledCard from "../design/interface/Card/FilledCard";
import Slider from "../design/interface/Slider/Slider";
import { formatSeconds } from "../utils/TimeFormatter";
import LastPlayedItem from "../components/LastPlayedItem/LastPlayedItem";

const Home = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const loadModal = useLodaing(loading);

    const [slider, setSlider] = useState(0);

    const [modal, setModal] = useState(false);

    const [url, setUrl] = useState("");
    // const player = usePlayer();

    // useEffect(() => {
    //     // player.setSrc()
    // }, [url]);

    const auth = useAuth();

    // useEffect(() => {}, []);

    return (
        <div id="home-screen">
            <header id="home-header">
                <span className="title" id="home-title">
                    Hi $username!
                </span>
                <ContextMenu
                    buttons={[
                        {
                            title: "Notifications",
                            leadingIcon: "ri-notification-line",
                            onClick: () => {
                                setModal(true);
                            },
                        },
                        {
                            title: "Profile",
                            leadingIcon: "ri-user-line",
                            onClick: () => {
                                navigate("/app/main/account");
                            },
                        },
                        {
                            title: "Account",
                            leadingIcon: "ri-user-settings-line",
                            onClick: () => {
                                navigate("/app/main/account");
                            },
                        },
                        {
                            title: "Log Out",
                            leadingIcon: "ri-logout-box-line",
                            style: { color: "#E05265" },
                            onClick: async () => {
                                setLoading(true);
                                await supabase.auth.signOut();
                                navigate("/app/auth/login");
                                setLoading(false);
                            },
                        },
                    ]}
                >
                    <Avatar />
                </ContextMenu>
            </header>

            <div id="home-main-container">
                <FilledCard id="home-last-played">
                    <span id="home-last-played-title">Last played</span>
                    <div id="home-last-played-list" className="small-scrollbar">
                        <LastPlayedItem />
                        <LastPlayedItem />
                        <LastPlayedItem />
                        <LastPlayedItem />
                        <LastPlayedItem />
                        <LastPlayedItem />
                        <LastPlayedItem />
                        <LastPlayedItem />
                    </div>
                </FilledCard>

                <FilledCard id="home-main-view">
                    <span>Home</span>

                    <span>{String(auth)}</span>

                    <OutlinedTextInput
                        placeholder="Enter URL"
                        onChangeText={setUrl}
                        value={url}
                        backgroundColor="#221c1c"
                    />

                    {/* <LinearProgressIndicator progress={100} /> */}

                    <Slider value={slider} setValue={setSlider} />
                </FilledCard>
            </div>

            <PlayerControls />

            <SideModal
                visible={modal}
                title="Notifications"
                leadingIcon="ri-notification-line"
                onClose={() => {
                    setModal(false);
                }}
            >
                <NotificationItem
                    icon="ri-user-line"
                    title="Finish your profile"
                    description="You haven't finished your profile. Click here to fill some additional informations like username, avatar, sync google and spotify playlists."
                />
            </SideModal>

            {/* <LoadingModal visible={loading} /> */}
            {loadModal}
        </div>
    );
};

export default Home;
