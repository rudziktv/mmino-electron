import { IPlayer } from "../../components/Player/Player";
import { Track } from "./Track";
import Queue from "./TrackQueue";

class TrackPlayer {
    src: string;
    setSrc: (src: string) => void;
    #audioRef?: React.RefObject<HTMLAudioElement>;
    trackQueue: Track[] = [];
    #queue: Queue = new Queue();

    public get Queue(): Queue {
        return this.#queue;
    }

    public get AudioRef(): React.RefObject<HTMLAudioElement> | undefined {
        return this.#audioRef;
    }

    constructor(config: IPlayer) {
        this.src = config.src;
        this.setSrc = config.setSrc;
        this.#audioRef = config.audioRef;

        this.Initialize();
    }

    Initialize() {
        this.SetupMediaSession();
    }

    SetupMediaSession() {
        this.SetupMediaSession();
        this.SetupActions();
    }

    SetupPlaybackState() {
        if (!this.#audioRef?.current) {
            return;
        }
        this.#audioRef.current.pause();
        navigator.mediaSession.playbackState = "paused";

        navigator.mediaSession.setPositionState({
            duration: 1,
            position: 0,
            playbackRate: 1,
        });
    }

    SetupActions() {
        navigator.mediaSession.setActionHandler("play", () => {
            console.log("play");
        });

        navigator.mediaSession.setActionHandler("pause", () => {
            console.log("pause");
        });

        navigator.mediaSession.setActionHandler("previoustrack", () => {
            console.log("previoustrack");
        });

        navigator.mediaSession.setActionHandler("nexttrack", () => {
            console.log("nexttrack");
        });
    }

    SetupEvents() {
        if (!this.#audioRef?.current) {
            return;
        }

        // this.audioRef.current.addEventListener("ended", () => {
        //     console.log("ended");
        // });
    }

    OnPlaybackUpdate(callback: (e: Event, audio: HTMLAudioElement) => void) {
        if (!this.#audioRef?.current) {
            return;
        }

        this.#audioRef.current.addEventListener("timeupdate", (e) => {
            if (!this.#audioRef?.current) {
                return;
            }
            callback(e, this.#audioRef?.current);
        });
    }

    OnPlaybackFinish(callback: (e: Event, audio: HTMLAudioElement) => void) {
        if (!this.#audioRef?.current) {
            return;
        }

        const checkedCallback = (e: Event) => {
            if (!this.#audioRef?.current) {
                return;
            }
            callback(e, this.#audioRef?.current);
        };

        this.#audioRef.current.addEventListener("ended", checkedCallback);

        // this.#audioRef.current.removeEventListener("ended", checkedCallback);
    }
}

export interface ITrackPlayer {
    src: string;
    setSrc: (src: string) => void;
    audioRef?: React.RefObject<HTMLAudioElement>;
}

export default TrackPlayer;
