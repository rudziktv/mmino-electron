import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const useAuth = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        async () => {
            const { data } = await supabase.auth.getUser();
            setLoggedIn(data.user != null);
        };

        const callback = supabase.auth.onAuthStateChange((_, session) => {
            setLoggedIn(session != null);
        });

        return () => {
            callback.data.subscription.unsubscribe();
        };
    }, []);

    return loggedIn;
};

export default useAuth;
