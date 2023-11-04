import BaseIconButton, { BaseIconButtonProps } from "./BaseIconButton";
import "./TonalIconButton.css";

const TonalIconButton = (props: BaseIconButtonProps) => {
    return (
        <BaseIconButton
            className={`filled-icon-button ${props.className}`}
            {...props}
        />
    );
};

export default TonalIconButton;
