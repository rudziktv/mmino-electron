import TextButton from "../design/interface/Button/CommonButtons/TextButton";
import DialogModal, {
    DialogModalProps,
} from "../design/interface/DialogModal/DialogModal";

const ErrorModal = ({ icon = "ri-alert-line", ...props }: ErrorModalProps) => {
    return (
        <DialogModal {...props} canBeDismissed>
            <i className={`${icon} dialog-icon`} />

            <span className="dialog-header">{props.title}</span>

            <span className="dialog-content">{props.message}</span>

            <div className="dialog-footer">
                <TextButton
                    // icon="ri-check-line"
                    title="Accept"
                    onClick={props.onClose}
                />
            </div>
        </DialogModal>
    );
};

export interface ErrorModalProps extends DialogModalProps {
    title?: string;
    message?: string;
}

export default ErrorModal;
