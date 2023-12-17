import Queue from "./TrackQueue";

class TrackPlayer {
    // src: string;
    // setSrc: (src: string) => void;
    #audioRef?: React.RefObject<HTMLAudioElement>;
    trackQueue: Track[] = [];
    current: Track = {} as Track;
    #queue: Queue = new Queue();

    public get Queue(): Queue {
        return this.#queue;
    }

    public get AudioRef(): React.RefObject<HTMLAudioElement> | undefined {
        return this.#audioRef;
    }

    constructor(audioRef?: React.RefObject<HTMLAudioElement>) {
        this.#audioRef = audioRef;

        this.Initialize();

        console.log("REINITIALIZED");
    }

    Initialize() {
        this.SetupMediaSession();
    }

    SetupMediaSession() {
        this.SetupPlaybackState();
        this.SetupActions();
        this.SetupEvents();
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
            if (!this.#audioRef?.current) {
                return;
            }
            this.#audioRef.current.play();
            navigator.mediaSession.playbackState = "playing";
        });

        navigator.mediaSession.setActionHandler("pause", () => {
            if (!this.#audioRef?.current) {
                return;
            }
            this.#audioRef.current.pause();
            navigator.mediaSession.playbackState = "paused";
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

        // this.#audioRef.current.addEventListener("change", () => {
        //     console.log("change");
        // });

        // this.#audioRef.current.addEventListener("ended", () => {
        //     console.log("ended");
        // });

        // this.#audioRef.current.onended = () => console.log("onended");
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

    PushTrack(track: Track) {
        if (!this.#audioRef?.current) {
            return;
        }
        console.log(track);

        this.current = track;
        this.#audioRef.current.src = track.source_url;
        navigator.mediaSession.metadata = new MediaMetadata({
            title: track.title || "",
            artist: track.artist || "",
            album: track.album || "",
            artwork: track.artwork,
        });
        this.#audioRef.current.play();
    }

    OnTrackChanged(callback: (track: Track) => void) {
        if (!this.#audioRef?.current) {
            return;
        }

        console.log("track-changed");

        this.#audioRef.current.addEventListener("change", () => {
            callback(this.current);
        });
    }
}

export interface Track extends MediaMetadataInit {
    source_url: string;
}

// export interface ITrackPlayer {
//     audioRef?: React.RefObject<HTMLAudioElement>;
// }

export default TrackPlayer;
