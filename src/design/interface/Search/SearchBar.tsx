import { useRef } from "react";
import BaseIconButton, {
    BaseIconButtonProps,
} from "../Button/IconButtons/BaseIconButton";
import "./SearchBar.css";

const SearchBar = ({
    leadingButton = { icon: "ri-search-line" },
    ...props
}: SearchBarProps) => {
    const ref = useRef<HTMLInputElement>(null);

    return (
        <div
            id={props.id}
            className={`search-bar-container ${props.className}`}
            style={props.style}
            onClick={(e) => {
                // e.stopPropagation();
                e.preventDefault();
                ref.current?.focus();
            }}
        >
            <BaseIconButton style={{ color: "#cac4ce" }} {...leadingButton} />
            <input
                type="text"
                className="search-bar-input"
                placeholder={props.hint}
                value={props.value}
                onChange={(e) => props.onChangeText?.(e.target.value)}
                ref={ref}
            />
            {props.trailingButton && (
                <BaseIconButton
                    style={{ color: "#cac4ce" }}
                    {...props.trailingButton}
                />
            )}
        </div>
    );
};

export interface SearchBarProps {
    hint?: string;
    value?: string;
    onChangeText?: (e: string) => void;

    leadingButton?: BaseIconButtonProps;
    trailingButton?: BaseIconButtonProps;

    id?: string;
    className?: string;
    style?: React.CSSProperties;
}

export default SearchBar;
