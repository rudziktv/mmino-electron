import { useEffect, useRef, useState } from "react";
import "./Slider.css";

const Slider = ({ updateType = "onDrop", ...props }: SliderProps) => {
    const ref = useRef<HTMLDivElement>(null);
    let xd = props.value;
    let lastPos = 0;

    const [changing, setChanging] = useState(false);
    const [position, setPosition] = useState(changing ? lastPos : props.value);

    useEffect(() => {
        if (!changing) {
            setPosition(props.value);
        }
    }, [props.value]);

    const onMouseDown = (_: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (props.disabled) {
            return;
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        setChanging(true);
    };

    const onMouseUp = (e: Event) => {
        setChanging(false);
        const event = e as MouseEvent;

        if (updateType == "onDrop") {
            onChange(event.movementX);
        }
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: Event) => {
        const event = e as MouseEvent;

        if (updateType == "onDrag") {
            onChange(event.movementX);
        } else if (updateType == "onDrop") {
            onChangeV2(event.movementX);
        }
    };

    const onChange = (x: number) => {
        const refWidth = ref.current?.clientWidth || 1;
        const delta = (x / refWidth) * 100;
        xd += delta;

        if (xd > 100) {
            setPosition(100);
            props.setValue?.(100);
            lastPos = 100;
        } else if (xd < 0) {
            setPosition(0);
            props.setValue?.(0);
            lastPos = 0;
        } else {
            setPosition(xd);
            props.setValue?.(xd);
            lastPos = xd;
        }
    };

    const onChangeV2 = (x: number) => {
        const refWidth = ref.current?.clientWidth || 1;
        const delta = (x / refWidth) * 100;
        xd += delta;

        if (xd > 100) {
            setPosition(100);
            lastPos = 100;
        } else if (xd < 0) {
            setPosition(0);
            lastPos = 0;
        } else {
            setPosition(xd);
            lastPos = xd;
        }
    };

    return (
        <div
            className={`slider-container ${props.disabled && "disabled"}`}
            ref={ref}
        >
            <div className="slider-track" />
            <div
                className="slider-track slider-track-active"
                style={{ width: `${position}%` }}
            />

            <div
                className="slider-thumb"
                onMouseDown={onMouseDown}
                style={{ left: `${position}%` }}
            >
                {props.label && (
                    <div className="slider-thumb-label">
                        {props.label(position)}
                    </div>
                )}
            </div>
        </div>
    );
};

export interface SliderProps {
    value: number;
    setValue?: (value: number) => void;
    disabled?: boolean;
    label?: (position: number) => string;
    updateType?: "onDrop" | "onDrag";
}

export default Slider;
