import "./NavigationRail.css";
import NavigationRailButton, {
    NavigationRailButtonProps,
} from "./NavigationRailButton";

const NavigationRail = (props: NavigationRailProps) => {
    return (
        <nav className="navigation-rail">
            <section id="rail-buttons">
                {props.buttons?.map((button, index) => (
                    <NavigationRailButton
                        key={index}
                        {...button}
                        // id={button.}
                        currentId={props.currentId}
                    />
                ))}
            </section>
        </nav>
    );
};

export interface NavigationRailProps {
    buttons?: NavigationRailButtonProps[];
    currentId?: string;
}

export interface NavigationRailListProps {
    label?: string;
    icon?: string;
    activeIcon?: string;
    id: string;
}

export default NavigationRail;
