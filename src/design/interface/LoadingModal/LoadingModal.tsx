import { AnimatePresence, motion } from "framer-motion";
import "./LoadingModal.css";
import CircularProgressIndicator from "../ProgressIndicator/CircularProgressIndicator/CircularProgressIndicator";

const LoadingModal = (props: LoadingModalProps) => {
    return (
        <AnimatePresence>
            {props.visible && (
                <motion.div
                    className="loading-modal-blur"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="loading-modal"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    >
                        <CircularProgressIndicator />
                        <span>Loading...</span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export interface LoadingModalProps {
    visible?: boolean;
    onClose?: () => void;
}

export default LoadingModal;
