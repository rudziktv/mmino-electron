import "./SegmentButton.css";

const SegmentButton = (props: SegmentButtonProps) => {
    return (
        <button
            className={`segment-button ${props.active && "active"}`}
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
};

export default SegmentButton;

export interface SegmentButtonProps {
    label?: string;
    icon?: string;
    activeIcon?: string;
    onClick?: () => void;
    active?: boolean;
}
