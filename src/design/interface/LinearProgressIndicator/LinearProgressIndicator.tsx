import { motion } from "framer-motion";
import "./LinearProgressIndicator.css";

const LinearProgressIndicator = ({
    config = {},
    ...props
}: LinearProgressIndicatorProps) => {
    return (
        <svg
            id={props.id}
            className={`linear-progress-container ${props.className}`}
            style={props.style}
        >
            <line
                className="linear-progress-track"
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                stroke="#4F4040"
                strokeWidth={8}
            />
            <motion.line
                className="linear-progress-indicator"
                x1="0"
                y1="0"
                x2={`${
                    !props.progress || props.indeterminate
                        ? "100"
                        : props.progress
                }%`}
                y2="0"
                stroke="#9067c6"
                strokeWidth={8}
                initial={{ x1: 0, x2: 0 }}
                animate={{
                    x1: props.indeterminate ? ["0", "0%", "100%"] : 0,
                    x2: props.indeterminate
                        ? ["0%", "100%", "100%"]
                        : `${props.progress}%`,
                }}
                transition={{
                    repeat: props.indeterminate ? Infinity : 0,
                    repeatDelay: props.indeterminate
                        ? config.delay
                            ? config.delay
                            : 1
                        : 0,
                    duration: props.indeterminate ? 2.5 : 0.5,
                    ease: "easeInOut",
                }}
            />
        </svg>
    );
};

export interface LinearProgressIndicatorProps {
    progress?: number;
    indeterminate?: boolean;
    config?: {
        duration?: number;
        delay?: number;
    };
    id?: string;
    className?: string;
    style?: React.CSSProperties;
}

export default LinearProgressIndicator;
