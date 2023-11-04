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
    const [ripples, invokeRipple] = useRipple(ref);

    const toggable = toggled != null;

    return (
        <button
            {...props}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                invokeRipple(e);
                props.onClick?.(e);
            }}
            ref={ref}
            className={`base-icon-button ${toggable && "toggable"} ${
                toggled && "toggled"
            } ${props.className}`}
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
