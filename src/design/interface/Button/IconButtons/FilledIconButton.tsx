import BaseIconButton, { BaseIconButtonProps } from "./BaseIconButton";
import "./FilledIconButton.css";

const FilledIconButton = (props: BaseIconButtonProps) => {
    return (
        <BaseIconButton
            className={`filled-icon-button ${props.className}`}
            {...props}
        />
    );
};

export default FilledIconButton;
