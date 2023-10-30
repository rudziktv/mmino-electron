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
                        index={index}
                        currentIndex={props.currentIndex}
                    />
                ))}
            </section>
        </nav>
    );
};

export interface NavigationRailProps {
    buttons?: NavigationRailButtonProps[];
    currentIndex?: number;
}

export interface NavigationRailListProps {
    label?: string;
    icon?: string;
    activeIcon?: string;
}

export default NavigationRail;
