import { useRef } from "react";
import FilledIconButton from "../../design/interface/Button/IconButtons/FilledIconButton";
import useRipple from "../../hooks/useRipple";
import "./LastPlayedItem.css";

const LastPlayedItem = (props: LastPlayedItemProps) => {
    const ref = useRef(null);
    const [ripples, invokeRipple] = useRipple(ref);

    return (
        <div
            className={`last-played-item ${props.className}`}
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                invokeRipple(e);
                props.onClick?.();
            }}
        >
            {ripples}
            <div
                className="last-played-item-cover"
                style={{
                    backgroundImage: `url(${props.thumbnail})`,
                }}
            >
                <div className="last-played-item-cover-play">
                    <FilledIconButton icon="ri-play-fill" />
                </div>
                {!props.thumbnail && (
                    <i className="ri-music-line last-played-item-cover-icon" />
                )}
            </div>
            <div className="last-played-item-info">
                <span className="last-played-item-title">Title</span>
                <span className="last-played-item-artist">Type ○ Artist</span>
            </div>
        </div>
    );
};

interface LastPlayedItemProps {
    className?: string;

    id?: string;
    title?: string;
    artist?: string;
    thumbnail?: string;
    onClick?: () => void;
    type?: "Album" | "Playlist" | "Track" | "Favourites" | "Undefined";
}

export default LastPlayedItem;
