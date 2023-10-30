import { useState } from "react";
import OutlinedTextInput from "../design/interface/TextInput/OutlinedTextInput";
import "../styles/Login.css";
import ElevatedButton from "../design/interface/Button/CommonButtons/ElevatedButton";
import TextButton from "../design/interface/Button/CommonButtons/TextButton";
import { useNavigate } from "react-router-dom";
import {
    EmailValidate,
    PasswordValidate,
} from "../app/validation/FormValidation";
import { supabase } from "../supabase/client";
import LoadingModal from "../design/interface/LoadingModal/LoadingModal";
import RegisterModal from "../components/RegisterModal";
import ErrorModal from "../components/ErrorModal";
import { AuthError } from "@supabase/supabase-js";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const emailError = EmailValidate(email);
    const passwordError = PasswordValidate(password);
    const passwordRepeatError = () => {
        if (password !== repeatPassword) {
            return { isValid: false, message: "Passwords do not match" };
        }

        return { isValid: true, message: "" };
    };

    const canSignUp =
        emailError.isValid &&
        passwordError.isValid &&
        passwordRepeatError().isValid;

    const [isLoading, setIsLoading] = useState(false);
    const [signUpFailed, setSignUpFailed] = useState(false);
    const [error, setError] = useState<AuthError>();
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async () => {
        if (
            !emailError.isValid ||
            !passwordError.isValid ||
            !passwordRepeatError().isValid
        ) {
            return;
        }

        setIsLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        setIsLoading(false);

        if (error) {
            setError(error);
            setSignUpFailed(true);
        }
    };

    return (
        <>
            <div id="login-container">
                <span id="register-title">Create new account</span>

                <OutlinedTextInput
                    backgroundColor="#0b0909"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    error={!emailError.isValid}
                    errorMessage={emailError.message}
                />
                <OutlinedTextInput
                    backgroundColor="#0b0909"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    error={!passwordError.isValid}
                    errorMessage={passwordError.message}
                    type="password"
                />
                <OutlinedTextInput
                    backgroundColor="#0b0909"
                    placeholder="Repeat Password"
                    value={repeatPassword}
                    onChangeText={setRepeatPassword}
                    error={!passwordRepeatError().isValid}
                    errorMessage={passwordRepeatError().message}
                    type="password"
                />

                <ElevatedButton
                    disabled={!canSignUp}
                    title="Sign up"
                    icon="ri-edit-line"
                    style={{
                        backgroundColor: "#171212",
                    }}
                    onClick={handleRegister}
                />
                <TextButton
                    title="Already have an account? Sign in"
                    icon="ri-user-line"
                    onClick={() => {
                        navigate("/app/login");
                    }}
                />
            </div>
            <LoadingModal visible={isLoading} />

            <RegisterModal
                visible={signUpSuccess}
                onClose={() => setSignUpSuccess(false)}
            />

            <ErrorModal
                visible={signUpFailed}
                onClose={() => setSignUpFailed(false)}
                title="Sign up failed"
                message={error?.message}
            />
        </>
    );
};

export default Register;
