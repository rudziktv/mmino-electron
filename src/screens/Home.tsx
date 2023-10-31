import { useNavigate } from "react-router-dom";
import TextButton from "../design/interface/Button/CommonButtons/TextButton";
import useAuth from "../hooks/useAuth";
import { supabase } from "../supabase/client";

const Home = () => {
    const navigate = useNavigate();

    const auth = useAuth();

    return (
        <>
            <span>Home</span>

            <span>{String(auth)}</span>

            <TextButton
                title="Go To Login"
                onClick={() => navigate("/app/login")}
            />
            <TextButton
                title="Logout"
                onClick={() => supabase.auth.signOut()}
                disabled={!auth}
            />

            <embed src="https://www.google.com" />
        </>
    );
};

export default Home;
