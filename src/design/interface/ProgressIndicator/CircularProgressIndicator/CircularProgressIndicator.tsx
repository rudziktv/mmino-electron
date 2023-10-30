import { motion, useTime } from "framer-motion";

const CircularProgressIndicator = ({
    size = 96,
    radius = 24,
    strokeWidth = 4,
    ...props
}: CircularProgressIndicatorProps) => {
    const time = useTime();

    // const rotate = use

    return (
        <svg width={size} height={size}>
            <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                // rotate={"50deg"}
                // rotate={50}
                fill="none"
                stroke="#9067c6"
                strokeWidth={strokeWidth}
                strokeDasharray={Math.PI * radius * 2}
                // strokeDashoffset={Math.PI * radius * 2 * 0.85}
                initial={{
                    strokeDashoffset: Math.PI * radius * 2 * 0.85,
                    rotate: 30,
                }}
                animate={{
                    strokeDashoffset: [
                        Math.PI * radius * 2 * 0.75,
                        Math.PI * radius * 2 * 0.15,
                        Math.PI * radius * 2 * 0.75,
                    ],

                    rotate: [30, 390],
                }}
                transition={{
                    duration: 2,
                    ease: "backInOut",
                    repeat: Infinity,
                    // repeatType: "reverse",
                }}
            />
        </svg>
    );
};

export interface CircularProgressIndicatorProps {
    size?: number;
    radius?: number;
    strokeWidth?: number;
}

export default CircularProgressIndicator;
