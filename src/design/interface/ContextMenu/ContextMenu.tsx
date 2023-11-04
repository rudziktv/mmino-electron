import { useRef, useState } from "react";
import "./ContextMenu.css";
import ContextMenuItem, { ContextMenuItemProps } from "./ContextMenuItem";
import useOutsideAlerter from "../../../hooks/useOutsideAlerter";

const ContextMenu = (props: ContextMenuProps) => {
    // const options = props.children?.map((item, index) => <></>)

    const [opened, setOpened] = useState(false);

    const ref = useRef(null);
    const triggerRef = useRef(null);

    useOutsideAlerter(ref, triggerRef, () => setOpened(false));

    const options = props.buttons?.map((item, index) => (
        <ContextMenuItem {...item} key={index} />
    ));

    return (
        <div className={`context-menu-content ${opened && "active"}`}>
            <div className="context-menu" ref={ref}>
                {options}
            </div>
            <div
                ref={triggerRef}
                className="context-menu-trigger"
                onMouseDown={() => setOpened(!opened)}
            >
                {props.children}
            </div>
        </div>
    );
};

export interface ContextMenuProps {
    children?: React.ReactNode;
    buttons?: ContextMenuItemProps[];

    horizontalAlign?: "left" | "center" | "right";
    verticalAlign?: "top" | "bottom";
}

export default ContextMenu;
