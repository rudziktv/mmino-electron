import { useEffect, useState } from "react";
import OutlinedTextInput from "../design/interface/TextInput/OutlinedTextInput";
import ElevatedButton from "../design/interface/Button/CommonButtons/ElevatedButton";
import TextButton from "../design/interface/Button/CommonButtons/TextButton";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import logo from "../assets/logo_without_bg.png";
import LoadingModal from "../design/interface/LoadingModal/LoadingModal";
import { AuthError, Provider } from "@supabase/supabase-js";
import ErrorModal from "../components/ErrorModal";
import BaseIconButton from "../design/interface/Button/IconButtons/BaseIconButton";
import Tooltip from "../design/interface/Tooltip/Tooltip";
import { signInWithGoogle } from "../../electron/ipc";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const [error, setError] = useState<AuthError>();

    const auth = useAuth();

    const providersTooltip = "Work on providers is in progress.";

    useEffect(() => {
        if (auth) {
            navigate("/app/main");
        }
    });

    const handleLogin = async () => {
        setIsLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setIsLoading(false);

        if (error) {
            setError(error);
            setLoginFailed(true);
        }
    };

    const handleProvider = async (name: Provider) => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: name,
            options: {
                redirectTo: window.location.origin,
            },
        });

        if (error) {
            setError(error);
            setLoginFailed(true);
        }
    };

    const handleGoogle = () => {
        setIsLoading(true);
        signInWithGoogle();
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
                    type="password"
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

                <div id="login-divider">
                    <hr />
                    <span id="login-divider-or">OR</span>
                    <hr />
                </div>

                <span>Login via social accounts</span>

                <div id="login-providers">
                    <Tooltip content={providersTooltip}>
                        <BaseIconButton
                            icon="ri-google-fill"
                            // disabled
                            onClick={handleGoogle}
                        />
                    </Tooltip>
                    <Tooltip content={providersTooltip}>
                        <BaseIconButton
                            icon="ri-facebook-circle-fill"
                            disabled
                        />
                    </Tooltip>
                    <Tooltip content={providersTooltip}>
                        <BaseIconButton
                            icon="ri-spotify-fill"
                            disabled
                            onClick={() => handleProvider("spotify")}
                        />
                    </Tooltip>
                    <Tooltip content={providersTooltip}>
                        <BaseIconButton
                            icon="ri-discord-fill"
                            disabled
                            onClick={() => handleProvider("discord")}
                        />
                    </Tooltip>
                </div>

                <TextButton
                    title="Go back to menu"
                    onClick={() => navigate("/app/main")}
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
