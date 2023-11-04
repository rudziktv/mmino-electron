import { createContext, useEffect } from "react";
import playback from "../../assets/videoplayback.aac";

const Player = (props: PlayerProps) => {
    return <audio src={props.src} ref={props.audioRef} />;
};

const PlayerContainer = (props: PlayerProviderProps) => {
    return (
        <PlayerContext.Provider
            value={{
                src: props.src,
                setSrc: props.setSrc,
                audioRef: props.audioRef,
            }}
        >
            {props.children}
            <Player audioRef={props.audioRef} src={playback} />
        </PlayerContext.Provider>
    );
};

export interface PlayerProviderProps extends IPlayer {
    // src?: string;
    // setSrc?: (src: string) => void;
    // audioRef?: React.RefObject<HTMLAudioElement>;
    children?: React.ReactNode;
}

export interface PlayerProps {
    src?: string;
    audioRef?: React.RefObject<HTMLAudioElement>;
}

export interface IPlayer {
    src: string;
    setSrc: (src: string) => void;
    audioRef?: React.RefObject<HTMLAudioElement>;
}

export const PlayerContext = createContext<IPlayer>({
    src: "",
    setSrc: () => {},
});

export default PlayerContainer;
