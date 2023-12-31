import { useEffect } from "react";
import { supabase } from "../../supabase/client";
import useAuth from "../../hooks/useAuth";

const GoogleProvider = () => {
    const auth = useAuth();

    const handleGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/app/auth/login/provider/success`,
            },
        });
    };

    useEffect(() => {
        handleGoogle();
    }, []);

    useEffect(() => {
        if (auth) {
            window.close();
        }
    }, [auth]);

    return <>Connecting, don't close the window.</>;
};

export default GoogleProvider;
