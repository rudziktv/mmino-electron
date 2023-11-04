import { useRef } from "react";
import useRipple from "../../../hooks/useRipple";
import "./ContextMenuItem.css";
import Icon from "../Icon/Icon";

const ContextMenuItem = (props: ContextMenuItemProps) => {
    const ref = useRef(null);
    const [ripples, invokeRipple] = useRipple(ref);

    return (
        <button
            id={props.id}
            className={"context-menu-item " + props.className}
            ref={ref}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                invokeRipple(e);
                props.onClick?.();
            }}
            style={props.style}
        >
            {ripples}
            {props.leadingIcon && (
                // <i className={`${props.leadingIcon} context-menu-item-icon`} />

                <Icon
                    size={24}
                    className="context-menu-item-icon"
                    icon={props.leadingIcon}
                    badge={props.badge}
                />
            )}
            <span>{props.title}</span>
            {props.trailingIcon && (
                <i
                    className={`
                        ${props.trailingIcon}
                        context-menu-item-icon
                        context-menu-item-trailing-icon
                    `}
                />
            )}
        </button>
    );
};

export interface ContextMenuItemProps {
    title: string;
    onClick?: () => void;
    style?: React.CSSProperties;
    id?: string;
    className?: string;

    leadingIcon?: string;
    trailingIcon?: string;

    badge?: string;
}

export default ContextMenuItem;
