import { useRef } from "react";
import useRipple from "../../../../hooks/useRipple";
import "./BaseIconButton.css";

const BaseIconButton = ({
    icon,
    toggled,
    toggledIcon,
    ...props
}: BaseIconButtonProps) => {
    const ref = useRef(null);
    const ripples = useRipple(ref);

    return (
        <button
            {...props}
            ref={ref}
            className={`base-icon-button ${props.className} ${
                toggled && "toggled"
            }`}
        >
            {ripples}
            <i
                className={`base-icon-button-icon ${
                    toggled ? toggledIcon : icon
                }`}
            ></i>
        </button>
    );
};

export interface BaseIconButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: string;

    toggled?: boolean;
    toggledIcon?: string;
}

export default BaseIconButton;
