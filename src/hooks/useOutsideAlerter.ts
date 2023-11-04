import { RefObject, useEffect } from "react";

function useOutsideAlerter<T extends HTMLElement>(
    ref: RefObject<T>,
    triggerRef: RefObject<T>,
    callback: AlerterCallback
) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: MouseEvent) {
            if (
                ref.current &&
                triggerRef.current &&
                !ref.current.contains(event.target as any) &&
                !triggerRef.current.contains(event.target as any)
            ) {
                // alert("You clicked outside of me!");
                callback(event);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

type AlerterCallback = (event: MouseEvent) => void;

export default useOutsideAlerter;
