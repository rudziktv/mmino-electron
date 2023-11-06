import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const useAuth = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const LoginCheck = async () => {
            const { data } = await supabase.auth.getUser();
            // console.log("login-check:", data);
            setLoggedIn(data.user != null);
        };

        LoginCheck();

        const callback = supabase.auth.onAuthStateChange((event, session) => {
            setLoggedIn(session != null || event == "SIGNED_IN");
            // console.log("callback-auth:", event, session);
        });

        return () => {
            callback.data.subscription.unsubscribe();
        };
    }, []);

    return loggedIn;
};

export default useAuth;
