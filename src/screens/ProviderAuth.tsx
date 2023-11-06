import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { supabase } from "../supabase/client";
import { useParams } from "react-router-dom";
import { Provider } from "@supabase/supabase-js";

const ProviderAuth = () => {
    const auth = useAuth();
    const { provider } = useParams();

    const handle = async () => {
        if (!provider) {
            console.error("Provider does not exist in params.");
            window.close();
            return;
        }

        try {
            const providerName = provider as Provider;

            await supabase.auth.signInWithOAuth({
                provider: providerName,
                options: {
                    redirectTo: `${window.location.origin}/app/auth/login/provider/success`,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handle();
    }, []);

    useEffect(() => {
        if (auth) {
            window.close();
        }
    }, [auth]);

    return <>Connecting, don't close the window.</>;
};

export default ProviderAuth;
