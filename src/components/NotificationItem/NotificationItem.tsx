import BaseIconButton from "../../design/interface/Button/IconButtons/BaseIconButton";
import ElevatedCard from "../../design/interface/Card/ElevatedCard";
import "./NotificationItem.css";

const NotificationItem = (props: NotificationItemProps) => {
    return (
        <ElevatedCard className="notification-item">
            <header className="notification-item-header">
                {props.icon && (
                    <i className={`${props.icon} notification-item-icon`} />
                )}
                <span className="notification-item-title">{props.title}</span>
                <BaseIconButton
                    icon="ri-close-line"
                    className="notification-item-close"
                />
            </header>
            <section className="notification-item-content">
                {props.description}
            </section>
        </ElevatedCard>
    );
};

export interface NotificationItemProps {
    title?: string;
    description?: string;
    icon?: string;
    onClick?: () => void;
}

export default NotificationItem;
