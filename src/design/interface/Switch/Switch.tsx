import "./Switch.css";

const Switch = (props: SwitchProps) => {
    return (
        <div
            className={`switch-track ${props.toggled ? "toggled" : ""} ${
                props.disabled ? "disabled" : ""
            }`}
            onClick={() => {
                if (!props.disabled) props.onToggle?.(!props.toggled);
            }}
        >
            <div className="switch-thumb">
                {props.iconToggled && (
                    <i
                        className={`switch-icon switch-icon-on ${props.iconToggled}`}
                    />
                )}
                {props.icon && (
                    <i
                        className={`switch-icon switch-icon-off ${props.icon}`}
                    />
                )}
            </div>
        </div>
    );
};

export interface SwitchProps {
    toggled?: boolean;
    onToggle?: (value: boolean) => void;
    disabled?: boolean;

    iconToggled?: string;
    icon?: string;
}

export default Switch;
