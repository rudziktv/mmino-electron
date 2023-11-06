import BaseIconButton, { BaseIconButtonProps } from "./BaseIconButton";
import "./TonalIconButton.css";

const TonalIconButton = (props: BaseIconButtonProps) => {
    return (
        <BaseIconButton
            className={`tonal-icon-button ${props.className}`}
            {...props}
        />
    );
};

export default TonalIconButton;
