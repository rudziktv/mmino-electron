import { useContext } from "react";
import { PlayerContext } from "../components/Player/Player";

const usePlayer = () => {
    return useContext(PlayerContext);
};

export default usePlayer;
