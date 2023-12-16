import { Track } from "./Track";

class Queue {
    #tracks: Track[] = [];

    constructor() {}

    public get Tracks(): Track[] {
        return this.#tracks;
    }

    Add(track: Track) {
        this.#tracks.push(track);
    }

    Replace(index: number, track: Track) {
        this.#tracks.splice(index, 1, track);
    }

    Delete(index: number) {
        this.#tracks.splice(index, 1);
    }

    Clear() {
        this.#tracks = [];
    }
}

export default Queue;
