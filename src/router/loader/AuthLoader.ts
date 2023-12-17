import { User } from "@supabase/supabase-js";
import { supabase } from "../../supabase/client";

const AuthLoader = async (): Promise<IAuthLoaderData> => {
    const { data } = await supabase.auth.getSession();

    return {
        auth: {
            authorized: !!data.session,
            user: data.session?.user || null,
        },
    };
};

interface IAuthLoaderData {
    auth: {
        authorized: boolean;
        user: User | null;
    };
}

export type { IAuthLoaderData };
export { AuthLoader };
