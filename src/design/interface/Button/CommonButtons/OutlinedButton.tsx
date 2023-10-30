import BaseButton, { BaseButtonProps } from "./BaseButton";
import "./OutlinedButton.css";
import "./BaseButton.css";

const OutlinedButton = (props: BaseButtonProps) => {
    return (
        <BaseButton
            className={`outlined-button base-button ${props.className}`}
            {...props}
        />
    );
};

export default OutlinedButton;
