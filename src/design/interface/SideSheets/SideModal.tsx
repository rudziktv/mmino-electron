import { AnimatePresence, motion } from "framer-motion";
import { SideSheetProps } from "./SideSheet";
import "./SideModal.css";
import BaseIconButton from "../Button/IconButtons/BaseIconButton";

const SideModal = (props: SideModalProps) => {
    return (
        <AnimatePresence>
            {props.visible && (
                <motion.div
                    className="side-modal-blur"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="side-modal"
                        initial={{ scaleX: 0, translateX: "100%" }}
                        animate={{ scaleX: 1, translateX: "0%" }}
                        exit={{ scaleX: 0, translateX: "100%" }}
                        transition={{
                            ease: "easeInOut",
                        }}
                    >
                        <header className="side-modal-header">
                            {props.leadingIcon && (
                                <i
                                    className={`${props.leadingIcon} side-modal-icon`}
                                />
                            )}
                            <span className="side-modal-title">
                                {props.title}
                            </span>
                            <BaseIconButton
                                className="close-side-modal"
                                icon="ri-close-line"
                                onClick={props.onClose}
                            />
                        </header>
                        {props.children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export interface SideModalProps extends SideSheetProps {}

export default SideModal;
