import { useRef } from "react";
import useRipple from "../../../../hooks/useRipple";
import "./BaseButton.css";

const BaseButton = ({ title, icon, ...props }: BaseButtonProps) => {
    const ref = useRef(null);
    const [ripples, invokeRipple] = useRipple(ref);

    return (
        <button
            className={`base-button ${props.className}`}
            style={{
                ...props.style,
                paddingLeft: icon ? 16 : 24,
            }}
            {...props}
            ref={ref}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                invokeRipple(e);
                props.onClick?.(e);
            }}
        >
            {ripples}
            {icon && (
                <i
                    className={`base-button-icon ${icon}`}
                    style={{
                        marginRight: "8px",
                    }}
                ></i>
            )}
            {title}
        </button>
    );
};

export interface BaseButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: string;
    title?: string;
}

export default BaseButton;
