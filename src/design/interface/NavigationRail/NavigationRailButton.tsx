import { useRef } from "react";
import useRipple from "../../../hooks/useRipple";
import "./NavigationRailButton.css";
import "remixicon/fonts/remixicon.css";

const NavigationRailButton = (props: NavigationRailButtonProps) => {
    const active = props.index === props.currentIndex;

    const ref = useRef(null);
    const ripples = useRipple(ref);

    return (
        <button
            ref={ref}
            className={`navigation-rail-button ${active && "active"}`}
            onClick={props.onClick}
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
    index?: number;
    currentIndex?: number;
    label?: string;
    icon?: string;
    activeIcon?: string;
    onClick?: () => void;
}

export default NavigationRailButton;
