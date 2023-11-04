import { HtmlHTMLAttributes, useRef } from "react";
import "./Card.css";
import useRipple from "../../../hooks/useRipple";

const Card = ({ hoverable = false, ripples = false, ...props }: CardProps) => {
    const ref = useRef(null);
    const [ripple, invokeRipple] = useRipple(ref);

    return (
        <div
            className={`card ${hoverable && "hoverable"} ${props.className}`}
            {...props}
            ref={ref}
            onClick={(e) => {
                if (!ripples) {
                    return;
                }
                e.stopPropagation();
                e.preventDefault();
                invokeRipple(e);
                props.onClick?.(e);
            }}
        >
            {ripples && ripple.ripples}
            {props.children}
        </div>
    );
};

export interface CardProps extends HtmlHTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    ripples?: boolean;
    hoverable?: boolean;
}

export default Card;
