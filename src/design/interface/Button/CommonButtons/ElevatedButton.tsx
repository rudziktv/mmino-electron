import BaseButton, { BaseButtonProps } from "./BaseButton";
import "./ElevatedButton.css";
import "./BaseButton.css";

const ElevatedButton = (props: BaseButtonProps) => {
    return (
        <BaseButton
            className={`elevated-button base-button ${props.className}`}
            {...props}
        />
    );
};

export default ElevatedButton;
