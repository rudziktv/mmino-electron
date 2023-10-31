import { CSSProperties } from "react";
import "./Tooltip.css";

const Tooltip = ({ type = "plain", ...props }: TooltipProps) => {
    return (
        <div className={`tooltip-${type}-container`} style={props.style}>
            <div className={`tooltip-${type}`}>
                {/* <span></span> */}
                {props.content}
            </div>
            {props.children}
        </div>
    );
};

export interface TooltipProps {
    children: React.ReactNode;

    type?: "plain" | "rich";

    content?: React.ReactNode;

    style?: CSSProperties;
}

export default Tooltip;
