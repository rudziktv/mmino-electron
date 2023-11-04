import { useRef } from "react";
import useRipple from "../../../hooks/useRipple";
import "./NavigationRailButton.css";
import "remixicon/fonts/remixicon.css";

const NavigationRailButton = (props: NavigationRailButtonProps) => {
    const active = props.id === props.currentId;

    const ref = useRef(null);
    const [ripples, invokeRipple] = useRipple(ref);

    return (
        <button
            ref={ref}
            className={`navigation-rail-button ${active && "active"}`}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                invokeRipple(e);
                props.onClick?.();
            }}
        >
            <div className="rail-btn-plate">
                {ripples}
                <i className={`${active ? props.activeIcon : props.icon}`}></i>
            </div>
            <span className="rail-btn-label">{props.label}</span>
        </button>
    );
};

export interface NavigationRailButtonProps {
    id?: string;
    currentId?: string;
    label?: string;
    icon?: string;
    activeIcon?: string;
    onClick?: () => void;
}

export default NavigationRailButton;
