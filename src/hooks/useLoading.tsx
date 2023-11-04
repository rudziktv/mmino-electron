import LoadingModal from "../design/interface/LoadingModal/LoadingModal";

const useLodaing = (visible: boolean, onDismiss?: () => void) => {
    return <LoadingModal visible={visible} onClose={onDismiss} />;
};

export default useLodaing;
