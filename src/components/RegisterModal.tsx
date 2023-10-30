import { useNavigate } from "react-router-dom";
import TextButton from "../design/interface/Button/CommonButtons/TextButton";
import DialogModal, {
    DialogModalProps,
} from "../design/interface/DialogModal/DialogModal";

const RegisterModal = (props: DialogModalProps) => {
    const navigate = useNavigate();

    return (
        <DialogModal {...props}>
            <span className="dialog-header">You've been signed up!</span>

            <span className="dialog-content">
                Now you have to activate your account by clicking the link in
                your email. After that, you can just login and fully use Mmino!
            </span>

            <div className="dialog-footer">
                <TextButton
                    icon="ri-login-box-line"
                    title="Login"
                    onClick={() => navigate("/app/login")}
                />
            </div>
        </DialogModal>
    );
};

export default RegisterModal;
