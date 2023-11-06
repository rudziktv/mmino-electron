import FilledIconButton from "../../design/interface/Button/IconButtons/FilledIconButton";
import TonalIconButton from "../../design/interface/Button/IconButtons/TonalIconButton";
import "./LastPlayedItem.css";

const LastPlayedItem = (props: LastPlayedItemProps) => {
    return (
        <div className={`last-played-item ${props.className}`}>
            <div className="last-played-item-cover">
                <div className="last-played-item-cover-play">
                    <FilledIconButton icon="ri-play-fill" />
                </div>
                <i className="ri-music-line last-played-item-cover-icon" />
            </div>
            <span>Title</span>
        </div>
    );
};

interface LastPlayedItemProps {
    className?: string;
}

export default LastPlayedItem;
