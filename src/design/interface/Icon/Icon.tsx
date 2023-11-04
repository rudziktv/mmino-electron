import { AnimatePresence, motion } from "framer-motion";
import "./Icon.css";

const Icon = (props: IconProps) => {
    return (
        <div className={`icon-container ${props.className}`}>
            <AnimatePresence>
                {props.badge && (
                    <motion.div
                        className={`icon-badge`}
                        initial={{
                            scale: 0,
                            opacity: 0,
                            translateX: "50%",
                            translateY: "-50%",
                        }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                    >
                        {props.badge}
                    </motion.div>
                )}
            </AnimatePresence>
            <i
                className={`icon ${props.icon}`}
                style={{ fontSize: props.size, color: props.color }}
            />
        </div>
    );
};

export interface IconProps {
    size?: number;
    color?: string;
    icon: string;

    badge?: string;

    className?: string;
    id?: string;
}

export default Icon;
