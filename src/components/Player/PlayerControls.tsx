import { useEffect, useState } from "react";
import usePlayer from "../../hooks/usePlayer";
import "./PlayerControls.css";
import BaseIconButton from "../../design/interface/Button/IconButtons/BaseIconButton";
import TonalIconButton from "../../design/interface/Button/IconButtons/TonalIconButton";
import { supabase } from "../../supabase/client";
import { downloadFile } from "../../../electron/ipc";
import { downloadUrl } from "../../services/download/DownloadIpcRenderer";
import { getAppPath, getPath } from "../../services/path/PathIpcRenderer";
import LinearProgressIndicator from "../../design/interface/LinearProgressIndicator/LinearProgressIndicator";
import Slider from "../../design/interface/Slider/Slider";
import { formatSeconds } from "../../utils/TimeFormatter";

const PlayerControls = (props: PlayerControlsProps) => {
    const player = usePlayer();
    const audioRef = player.audioRef;

    const [progress, setProgress] = useState(0);

    const [isPlaying, setIsPlaying] = useState(
        player.audioRef?.current?.paused != null
            ? !player.audioRef?.current?.paused
            : false
    );

    const a = async () => {
        console.log("supabase");
        const { data } = await supabase.functions.invoke<{ message: string }>(
            "get-video-source",
            {
                body: {
                    video_id: "MkWDKJjhbvw",
                },
                method: "POST",
            }
        );

        if (data) {
            // downloadFile(data.message);
            // downloadUrl({
            //     url: "https://file-examples.com/storage/fe1734aff46541d35a76822/2017/02/file-sample_100kB.doc",
            //     callback(item) {
            //         item.once("done", () => {
            //             alert("done");
            //         });
            //     },
            // });

            alert(await getPath("appData"));
        }
    };

    const PlayPause = () => {
        if (!audioRef?.current) {
            return;
        }

        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
            navigator.mediaSession.playbackState = "playing";
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
            navigator.mediaSession.playbackState = "paused";
        }

        navigator.mediaSession.metadata = new MediaMetadata({
            title: "Mmino",
            artist: "Mmino",
            album: "Mmino",
            artwork: [
                {
                    src: "https://i1.sndcdn.com/artworks-HwXGFlkUDOAUhYiS-Btndew-t500x500.jpg",
                    sizes: "500x500",
                    type: "image/jpg",
                },
            ],
        });
    };

    useEffect(() => {
        if (!audioRef?.current) {
            return;
        }

        console.log(navigator.mediaSession);
        console.log(navigator.mediaCapabilities);

        navigator.mediaSession.setActionHandler("play", PlayPause);
        navigator.mediaSession.setActionHandler("pause", PlayPause);
        navigator.mediaSession.setActionHandler("nexttrack", PlayPause);
        navigator.mediaSession.setActionHandler("previoustrack", PlayPause);
        navigator.mediaSession.setActionHandler("stop", PlayPause);
        // navigator.mediaSession.setActionHandler("playpause", PlayPause);
        navigator.mediaSession.setPositionState({
            position: 0,
            duration: 0,
        });

        audioRef.current.ontimeupdate = () => {
            if (!audioRef.current) {
                return;
            }

            navigator.mediaSession.setPositionState({
                position: audioRef.current.currentTime,
                duration: audioRef.current.duration,
            });

            setProgress(
                (audioRef.current.currentTime / audioRef.current.duration) * 100
            );
        };
    }, []);

    return (
        <div id="player-controls">
            <div id="player-controls-left">
                <div id="player-controls-cover" />
                <div id="player-controls-info">
                    <span id="player-controls-title">Title</span>
                    <span id="player-controls-artist">Artist</span>
                </div>
            </div>
            <div id="player-controls-mid">
                <div id="player-controls-top">
                    <BaseIconButton icon="ri-skip-back-line" />
                    <TonalIconButton
                        icon="ri-play-mini-line"
                        toggledIcon="ri-pause-mini-fill"
                        toggled={isPlaying}
                        onClick={PlayPause}
                    />
                    <BaseIconButton icon="ri-skip-forward-line" />
                </div>
                <div id="player-controls-bottom">
                    <span>
                        {formatSeconds(audioRef?.current?.currentTime || 0)}
                    </span>
                    {/* <LinearProgressIndicator progress={progress} /> */}
                    <Slider value={progress} setValue={setProgress} />
                    <span>
                        {formatSeconds(audioRef?.current?.duration || 0)}
                    </span>
                </div>
            </div>
            <div id="player-controls-right">
                <BaseIconButton icon="ri-volume-mute-line" />
            </div>
        </div>
    );
};

export interface PlayerControlsProps {}

export default PlayerControls;
