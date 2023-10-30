export const EmailValidate = (text: string) => {
    if (!text.includes("@")) {
        return { isValid: false, message: "Email must contain @" };
    }

    const domainCheck = text.split("@")[1];

    if (domainCheck.length < 1) {
        return { isValid: false, message: "Email must contain domain" };
    }

    const suffixCheck = domainCheck.split(".");

    console.log(suffixCheck[suffixCheck.length - 1]);

    if (suffixCheck.length < 2 || suffixCheck[suffixCheck.length - 1] == "") {
        return { isValid: false, message: "Email must contain domain suffix" };
    }

    return { isValid: true, message: "" };
};

export const PasswordValidate = (text: string): Validation => {
    if (text.length < 8) {
        return {
            isValid: false,
            message: "Password must be at least 8 characters",
        };
    }

    return {
        isValid: true,
        message: "",
    };
};

export interface Validation {
    isValid: boolean;
    message: string;
}
