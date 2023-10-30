import BaseButton, { BaseButtonProps } from "./BaseButton";
import "./FilledButton.css";
import "./BaseButton.css";

const FilledButton = (props: BaseButtonProps) => {
    return (
        <BaseButton
            className={`filled-button base-button ${props.className}`}
            {...props}
        />
    );
};

export default FilledButton;
