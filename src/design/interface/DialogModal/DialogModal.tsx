import { AnimatePresence, motion } from "framer-motion";
import "./DialogModal.css";

const DialogModal = (props: DialogModalProps) => {
    return (
        <AnimatePresence>
            {props.visible && (
                <motion.div
                    className="dialog-modal-blur"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => {
                        if (props.canBeDismissed) {
                            props.onClose?.();
                        }
                    }}
                >
                    <motion.div
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="dialog-modal"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    >
                        {props.children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export interface DialogModalProps {
    icon?: string;
    visible?: boolean;
    canBeDismissed?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
}

export default DialogModal;
