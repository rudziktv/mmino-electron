import BaseButton, { BaseButtonProps } from "./BaseButton";
import "./TonalButton.css";
import "./BaseButton.css";

const TonalButton = (props: BaseButtonProps) => {
    return (
        <BaseButton
            className={`tonal-button base-button ${props.className}`}
            {...props}
        />
    );
};

export default TonalButton;
