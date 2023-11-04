import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const ProviderSuccess = () => {
    const auth = useAuth();

    useEffect(() => {
        if (auth) window.close();
    }, [auth]);

    return <></>;
};

export default ProviderSuccess;
