export interface SideSheetProps {
    visible?: boolean;
    onClose?: () => void;

    children?: React.ReactNode;
    title?: string;

    leadingIcon?: string;
}
