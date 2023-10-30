import SegmentButton, { SegmentButtonProps } from "./SegmentButton";
import "./SegmentedButtons.css";

const SegmentedButtons = (props: SegmentedButtonsProps) => {
    return (
        <div className="segmented-buttons">
            {props.buttons?.map((item, index) => (
                <SegmentButton {...item} active={props.activeValue === index} />
            ))}
        </div>
    );
};

export interface SegmentedButtonsProps {
    activeValue?: number;
    buttons?: SegmentButtonProps[];
}

export default SegmentedButtons;
