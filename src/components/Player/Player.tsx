import { createContext, useMemo, useRef } from "react";
import playback from "../../assets/videoplayback.aac";
import TrackPlayer from "../../services/track-player/TrackPlayer";

const Player = (props: PlayerProps) => {
    return <audio src={props.src} ref={props.audioRef} />;
};

const PlayerContainer = (props: PlayerContainerProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const trackPlayer = useMemo(() => new TrackPlayer(audioRef), []);

    return (
        <PlayerContext.Provider
            value={{
                audioRef: audioRef,
                trackPlayer: trackPlayer,
            }}
        >
            {props.children}
            <Player audioRef={audioRef} src={playback} />
        </PlayerContext.Provider>
    );
};

export interface PlayerContainerProps {
    children?: React.ReactNode;
}

export interface PlayerProps {
    src?: string;
    audioRef?: React.RefObject<HTMLAudioElement>;
}

export interface IPlayerContext {
    trackPlayer: TrackPlayer;
    audioRef?: React.RefObject<HTMLAudioElement>;
}

export const PlayerContext = createContext<IPlayerContext>({
    trackPlayer: new TrackPlayer(),
});

export default PlayerContainer;
