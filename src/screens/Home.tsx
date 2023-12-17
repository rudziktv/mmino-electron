import { useLoaderData, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import "../styles/Home.css";
import Avatar from "../design/interface/Avatar/Avatar";
import ContextMenu from "../design/interface/ContextMenu/ContextMenu";
import { useEffect, useState } from "react";
import useLodaing from "../hooks/useLoading";
import SideModal from "../design/interface/SideSheets/SideModal";
import NotificationItem from "../components/NotificationItem/NotificationItem";
import PlayerControls from "../components/Player/PlayerControls";
import FilledCard from "../design/interface/Card/FilledCard";
import LastPlayedItem from "../components/LastPlayedItem/LastPlayedItem";
import { IAuthLoaderData } from "../router/loader/AuthLoader";
// import usePlayer from "../hooks/usePlayer";

const Home = () => {
    const navigate = useNavigate();

    const loaderData = useLoaderData() as IAuthLoaderData;

    const [loading, setLoading] = useState(false);
    const loadModal = useLodaing(loading);

    // const [slider, setSlider] = useState(0);

    const [modal, setModal] = useState(false);

    // const [url, setUrl] = useState("");

    // const [path, setPath] = useState("");

    // const player = usePlayer();

    // const auth = useAuth();

    useEffect(() => {
        console.log(loaderData);

        if (!loaderData.auth) {
            navigate("/app/auth/login");
        }
    }, []);

    return (
        <div id="home-screen">
            <header id="home-header">
                <span className="title" id="home-title">
                    Hi {loaderData.auth.user?.email}!
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
                        <LastPlayedItem thumbnail="https://i1.sndcdn.com/artworks-HwXGFlkUDOAUhYiS-Btndew-t500x500.jpg" />
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
                    <span>
                        {loaderData.auth.authorized
                            ? "Logged in"
                            : "Signed out"}
                    </span>
                    <p
                        style={{
                            textAlign: "left",
                            fontSize: 16,
                        }}
                    >
                        <span
                            style={{
                                fontWeight: 600,
                                fontSize: 24,
                                marginLeft: 10,
                            }}
                        >
                            Changelog 17.12.2023
                        </span>
                        <ul>
                            <li>Now you can play tracks from search.</li>
                            <li>Removed ID bar, to setup audio src</li>
                            <li>Fixed player reinitialize</li>
                            <li>Being authorized is now required to use app</li>
                            <li>
                                Youtube title, artist name and thumbnail is
                                shown in MediaMetadata
                            </li>
                            <li>
                                I've been fucking up with files shit for last 8
                                hours and no I am not even close to manage to
                                work it
                            </li>
                            <li>
                                Home title show email as $username, it's
                                temporary, just for now
                            </li>
                            <li>Some styling for player</li>
                            <li>Player info now shows from MediaMetadata</li>
                        </ul>
                    </p>
                    {/* <span>{String(auth)}</span> */}
                    {/* <OutlinedTextInput
                        placeholder="Enter ID of yt video"
                        onChangeText={setUrl}
                        value={url}
                        backgroundColor="#221c1c"
                    />
                    <TextButton
                        title="Test"
                        onClick={async () => {
                            const response = await supabase.functions.invoke(
                                "get-video-source",
                                {
                                    body: {
                                        video_id: url,
                                    },
                                }
                            );
                            // player.setSrc(response.data.message);
                        }}
                    /> */}
                    {/* <TextButton
                        title="Test Download"
                        onClick={async () => {
                            downloadUrl({
                                url: url,
                                // directory: path.join(),
                                directory: `${await getPath(
                                    "userData"
                                )}\\testfile.aac`,
                                callbackOnCompleted: (_, directory) => {
                                    alert("Download completed");
                                    if (!directory) {
                                        return;
                                    }
                                    const file = directory;
                                    // .replace(/\\/, "\\\\")
                                    // .replace("/", "\\\\");
                                    console.log(file);
                                    player.setSrc(
                                        `file:///${file}` ||
                                            "/src/assets/videoplayback.aac"
                                    );
                                },
                            });
                            // player.setSrc(url);
                        }}
                    />
                    <TextButton
                        title="Check directory"
                        onClick={async () => {
                            alert(await getPath("userData"));
                        }}
                    />
                    <TextButton
                        title="Select file"
                        onClick={async () => {
                            const file = await showOpenDialog({});
                            console.log(file);
                            if (!file.canceled && file.filePaths.length > 0) {
                                const filename = file.filePaths[0];
                                // .replace(
                                //     /\\/,
                                //     "\\\\"
                                // );
                                // .replace("/", "\\\\");
                                console.log(filename);

                                player.setSrc(`file:///${filename}`);
                            }
                        }}
                    /> */}
                    {/* <Slider value={slider} setValue={setSlider} /> */}
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
