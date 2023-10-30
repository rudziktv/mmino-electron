import { useState } from "react";
import OutlinedTextInput from "../design/interface/TextInput/OutlinedTextInput";
import ElevatedButton from "../design/interface/Button/CommonButtons/ElevatedButton";
import TextButton from "../design/interface/Button/CommonButtons/TextButton";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import logo from "../assets/logo_without_bg.png";
import LoadingModal from "../design/interface/LoadingModal/LoadingModal";
import { AuthError } from "@supabase/supabase-js";
import ErrorModal from "../components/ErrorModal";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const [error, setError] = useState<AuthError>();

    const handleLogin = async () => {
        setIsLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        // await new Promise((resolve) => setTimeout(resolve, 5000));

        setIsLoading(false);

        if (error) {
            setError(error);
            setLoginFailed(true);

            // showMessageBox({
            //     title: "Error during login",
            //     message: error.message,
            //     type: "error",
            // });
        }
    };

    return (
        <>
            <div
                id="login-container"
                style={{
                    display: "flex",
                    flexDirection: "column",

                    gap: 12,
                }}
            >
                <img src={logo} id="login-logo" />

                {/* <CircularProgressIndicator /> */}

                {/* <span>Login</span> */}
                <OutlinedTextInput
                    backgroundColor="#0b0909"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <OutlinedTextInput
                    backgroundColor="#0b0909"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                />

                <TextButton
                    disabled={isLoading}
                    title="Forgot password?"
                    icon="ri-key-line"
                    style={{ alignSelf: "flex-end" }}
                />

                <ElevatedButton
                    disabled={isLoading}
                    title="Login"
                    icon="ri-login-box-line"
                    style={{
                        backgroundColor: "#171212",
                    }}
                    onClick={handleLogin}
                />
                <TextButton
                    disabled={isLoading}
                    title="Don't have an account? Sign up"
                    icon="ri-user-add-line"
                    onClick={() => {
                        navigate("/app/register");
                    }}
                />

                {/* <SegmentedButtons
                    activeValue={gender}
                    buttons={[
                        {
                            label: "Male",
                            onClick: () => {
                                setGender(0);
                            },
                        },
                        {
                            label: "Female",
                            onClick: () => {
                                setGender(1);
                            },
                        },
                    ]}
                /> */}
            </div>
            <LoadingModal visible={isLoading} />
            <ErrorModal
                visible={loginFailed}
                onClose={() => setLoginFailed(false)}
                title={"Login failed"}
                message={error?.message}
            />
        </>
    );
};

export default Login;
