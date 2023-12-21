import { useRef } from "react";
import BaseIconButton from "../../design/interface/Button/IconButtons/BaseIconButton";
import useRipple from "../../hooks/useRipple";
import "./SearchTrackItem.css";
import ContextMenu from "../../design/interface/ContextMenu/ContextMenu";
import { supabase } from "../../supabase/client";
import { openExternal } from "../../services/shell/ShellIpcRenderer";
import usePlayer from "../../hooks/usePlayer";

const SearchTrackItem = (props: SearchTrackItemProps) => {
    const ref = useRef(null);
    const [ripples, invokeRipple] = useRipple(ref);

    const getFormats = async () => {
        // const response = await supabase.functions.invoke("get-video-formats", {
        //     body: {
        //         video_id: props.id,
        //     },
        // });

        // if (response.data) {
        //     console.log(response.data);
        // }

        const response = await supabase.functions.invoke("get-video-source", {
            body: {
                video_id: props.id,
            },
        });

        if (response.data) {
            console.log(response.data);
            openExternal(response.data.message);
        }
    };

    const getSource = async () => {
        const response = await supabase.functions.invoke("get-video-source", {
            body: {
                video_id: props.id,
            },
        });

        if (response.data) {
            console.log(response.data);
            return response.data.message;
        }
        return "";
    };

    const player = usePlayer();

    const star = async () => {
        // const response = await supabase.from("starred_tracks").insert({
        //     user_id: (await supabase.auth.getUser()).data.user?.id,
        //     track_id: props.id,
        // });
        // await supabase.from("track_starred").insert({
        //     track_id: props.id,
        // });
    };

    return (
        <div
            className="search-track-item"
            ref={ref}
            onClick={async (e) => {
                e.stopPropagation();
                e.preventDefault();
                invokeRipple(e);
                player.trackPlayer.PushTrack({
                    album: "",
                    title: props.title || "",
                    artist: props.artists || "",
                    artwork: [
                        {
                            src: props.thumbnail || "",
                        },
                    ],
                    source_url: await getSource(),
                });
            }}
            // onClickCapture={() => {
            //     console.log("itemclick");
            // }}
        >
            {/* {ripples} */}
            <div className="search-track-item-ripples">{ripples}</div>

            <div
                className="search-track-item-cover"
                style={{
                    backgroundImage: `url(${props.thumbnail})`,
                }}
            >
                <span className="search-track-item-duration">
                    {props.durationFormatted}
                </span>
            </div>

            <div className="search-track-item-info">
                <span className="search-track-item-title">{props.title}</span>
                <span className="search-track-item-artist">
                    {props.artists}
                </span>
            </div>

            <div className="search-track-item-actions">
                <BaseIconButton icon="ri-star-line" onClick={star} />
                <BaseIconButton icon="ri-download-line" onClick={getFormats} />
                <ContextMenu
                    buttons={[
                        {
                            title: "YouTube",
                            leadingIcon: "ri-youtube-fill",
                            onClick: () =>
                                openExternal(props.youtube_url || ""),
                        },
                        {
                            title: "Spotify",
                            leadingIcon: "ri-spotify-fill",
                        },
                    ]}
                >
                    <BaseIconButton icon="ri-more-2-fill" />
                </ContextMenu>
            </div>
        </div>
    );
};

export interface SearchTrackItemProps {
    id: string;
    title?: string;
    artists?: string;
    thumbnail?: string;
    durationFormatted?: string;
    youtube_url?: string;
}

export default SearchTrackItem;
