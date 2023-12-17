import { useEffect, useState } from "react";
import usePlayer from "../../hooks/usePlayer";
import "./PlayerControls.css";
import BaseIconButton from "../../design/interface/Button/IconButtons/BaseIconButton";
import TonalIconButton from "../../design/interface/Button/IconButtons/TonalIconButton";
// import { supabase } from "../../supabase/client";
// import { downloadFile } from "../../../electron/ipc";
// import { downloadUrl } from "../../services/download/DownloadIpcRenderer";
// import { getAppPath, getPath } from "../../services/path/PathIpcRenderer";
// import LinearProgressIndicator from "../../design/interface/LinearProgressIndicator/LinearProgressIndicator";
import Slider from "../../design/interface/Slider/Slider";
import { formatSeconds } from "../../utils/TimeFormatter";

const PlayerControls = ({}: PlayerControlsProps) => {
    const player = usePlayer();
    const audioRef = player.audioRef;

    const [progress, setProgress] = useState(
        ((audioRef?.current?.currentTime || 0) /
            (audioRef?.current?.duration || 1)) *
            100
    );
    const [volume, setVolume] = useState(
        (audioRef?.current?.volume || 0.5) * 100
    );

    const [isPlaying, setIsPlaying] = useState(
        player.audioRef?.current?.paused != null
            ? !player.audioRef?.current?.paused
            : false
    );

    const [muted, setMuted] = useState(audioRef?.current?.muted || false);

    const PlayPause = () => {
        if (!audioRef?.current) {
            return;
        }

        if (audioRef.current.paused) {
            audioRef.current.play();
            // setIsPlaying(true);
            navigator.mediaSession.playbackState = "playing";
        } else {
            audioRef.current.pause();
            // setIsPlaying(false);
            navigator.mediaSession.playbackState = "paused";
        }

        // navigator.mediaSession.metadata = new MediaMetadata({
        //     title: "Mmino",
        //     artist: "Mmino",
        //     album: "Mmino",
        //     artwork: [
        //         {
        //             src: "https://i1.sndcdn.com/artworks-HwXGFlkUDOAUhYiS-Btndew-t500x500.jpg",
        //             sizes: "500x500",
        //             type: "image/jpg",
        //         },
        //     ],
        // });
    };

    useEffect(() => {
        if (!audioRef?.current) {
            return;
        }

        // navigator.mediaSession.setActionHandler("play", PlayPause);
        // navigator.mediaSession.setActionHandler("pause", PlayPause);
        // navigator.mediaSession.setActionHandler("nexttrack", PlayPause);
        // navigator.mediaSession.setActionHandler("previoustrack", PlayPause);
        // navigator.mediaSession.setActionHandler("stop", PlayPause);
        // // navigator.mediaSession.setActionHandler("playpause", PlayPause);
        // navigator.mediaSession.setPositionState({
        //     position: 0,
        //     duration: 0,
        // });

        audioRef.current.ontimeupdate = () => {
            if (!audioRef.current) {
                return;
            }

            navigator.mediaSession.setPositionState({
                position: audioRef.current.currentTime || 0,
                duration: audioRef.current.duration || 1,
            });

            setProgress(
                (audioRef.current.currentTime / audioRef.current.duration) * 100
            );
        };

        audioRef.current.onpause = () => setIsPlaying(false);
        audioRef.current.onplay = () => setIsPlaying(true);

        // audioRef.current.onload
    }, []);

    return (
        <div id="player-controls">
            <div id="player-controls-left">
                <div
                    id="player-controls-cover"
                    style={{
                        backgroundImage: `url(${
                            navigator.mediaSession.metadata?.artwork?.[0]
                                ?.src || ""
                        })`,
                    }}
                />
                <div id="player-controls-info">
                    <span id="player-controls-title">
                        {navigator.mediaSession.metadata?.title}
                    </span>
                    <span id="player-controls-artist">
                        {navigator.mediaSession.metadata?.artist}
                    </span>
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
                    <span id="player-controls-current-time">
                        {formatSeconds(audioRef?.current?.currentTime || 0)}
                    </span>
                    {/* <LinearProgressIndicator progress={progress} /> */}
                    <Slider
                        value={progress}
                        setValue={(n) => {
                            if (!audioRef?.current) {
                                return;
                            }
                            audioRef.current.currentTime =
                                (n * audioRef.current.duration) / 100;
                            setProgress(n);
                        }}
                        label={(pos) =>
                            formatSeconds(
                                (pos * (audioRef?.current?.duration || 0)) / 100
                            )
                        }
                    />
                    <span id="player-controls-duration">
                        {formatSeconds(audioRef?.current?.duration || 0)}
                    </span>
                </div>
            </div>
            <div id="player-controls-right">
                <BaseIconButton icon="ri-play-list-2-line" />
                <BaseIconButton
                    icon={
                        volume == 0
                            ? "ri-volume-mute-line"
                            : volume > 50
                            ? "ri-volume-up-line"
                            : "ri-volume-down-line"
                    }
                    toggled={muted}
                    toggledIcon="ri-volume-mute-line"
                    onClick={() => {
                        if (!audioRef?.current) {
                            return;
                        }
                        setMuted(!muted);
                        audioRef.current.muted = !muted;
                    }}
                />
                <div id="player-controls-volume-slider">
                    <Slider
                        value={muted ? 0 : volume}
                        setValue={(value) => {
                            if (!audioRef?.current) {
                                return;
                            }

                            setVolume(value);
                            audioRef.current.volume = value / 100;
                        }}
                        updateType="onDrag"
                        label={() => volume.toFixed()}
                    />
                </div>
            </div>
        </div>
    );
};

export interface PlayerControlsProps {}

export default PlayerControls;
