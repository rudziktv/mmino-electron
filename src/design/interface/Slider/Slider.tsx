import { useRef } from "react";
import "./Slider.css";

const Slider = (props: SliderProps) => {
    let xd = props.value;
    const ref = useRef<HTMLDivElement>(null);

    const onMouseDown = (_: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // e.preventDefault();
        // console.log("down");

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseUp = (_: Event) => {
        // e.preventDefault();
        // console.log("up");

        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: Event) => {
        const event = e as MouseEvent;
        // console.log("current:", value, "delta:", event.movementX);
        onChange(event.movementX);
    };

    const onChange = (x: number) => {
        const refWidth = ref.current?.clientWidth || 1;

        const delta = (x / refWidth) * 100;

        // console.log(
        //     "current:",
        //     props.value,
        //     "delta:",
        //     delta,
        //     "val+del:",
        //     props.value + delta
        // );

        xd += delta;
        // setValue(xd);

        if (xd > 100) props.setValue?.(100);
        else if (xd < 0) props.setValue?.(0);
        else props.setValue?.(xd);

        // xd = value;

        // console.log("finally:", props.value, "expect:", xd);
    };

    return (
        <div className="slider-container" ref={ref}>
            <div className="slider-track" />
            <div
                className="slider-track slider-track-active"
                style={{ width: `${props.value}%` }}
            />

            <div
                className="slider-thumb"
                onMouseDown={onMouseDown}
                style={{ left: `${props.value}%` }}
            >
                {props.label && (
                    <div className="slider-thumb-label">{props.label}</div>
                )}
            </div>
        </div>
    );
};

export interface SliderProps {
    value: number;
    setValue?: (value: number) => void;

    label?: string;
}

export default Slider;
