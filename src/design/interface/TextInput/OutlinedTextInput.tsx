import { OutlinedTextInputProps } from "./TextInputProps";
import "./OutlinedTextInput.css";
import { useRef } from "react";

const OutlinedTextInput = ({
    backgroundColor = "#171212",
    type = "text",
    ...props
}: OutlinedTextInputProps) => {
    const ref = useRef<HTMLInputElement>(null);

    return (
        <div className="outlined-text-input-section">
            <div
                className={`outlined-text-input-container ${
                    props.error ? "error" : ""
                }`}
                onClick={() => {
                    ref.current?.focus();
                }}
            >
                <input
                    {...props}
                    type={type}
                    className="outlined-text-input"
                    placeholder="xd"
                    onChange={(e) => {
                        props.onChangeText?.(e.target.value);
                    }}
                    ref={ref}
                />
                <span
                    className="outlined-text-input-label"
                    style={{
                        backgroundColor: backgroundColor,
                    }}
                >
                    {props.placeholder}
                </span>
            </div>
            <div className="text-input-supporting-text-container">
                <span
                    className={`text-input-supporting-text ${
                        props.error ? "error" : ""
                    }`}
                >
                    {props.errorMessage}
                </span>
                <span></span>
            </div>
        </div>
    );
};

export default OutlinedTextInput;
