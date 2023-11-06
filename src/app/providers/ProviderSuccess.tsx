import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";

const ProviderSuccess = () => {
    const auth = useAuth();
    const location = useLocation();

    useEffect(() => {
        console.log(location);
        if (auth) window.close();
    }, [auth]);

    return <>Connecting, don't close the window.</>;
};

export default ProviderSuccess;
