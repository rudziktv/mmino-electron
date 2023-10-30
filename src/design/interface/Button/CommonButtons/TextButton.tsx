import BaseButton, { BaseButtonProps } from "./BaseButton";
import "./TextButton.css";
import "./BaseButton.css";

const TextButton = (props: BaseButtonProps) => {
    return (
        <BaseButton
            className={`text-button base-button ${props.className}`}
            {...props}
        />
    );
};

export default TextButton;
