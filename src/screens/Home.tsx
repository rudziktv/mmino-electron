import { useNavigate } from "react-router-dom";
import TextButton from "../design/interface/Button/CommonButtons/TextButton";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <span>Home</span>

            <TextButton
                title="Go To Login"
                onClick={() => navigate("/app/login")}
            />
        </>
    );
};

export default Home;
