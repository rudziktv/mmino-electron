export interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
    placeholder?: string;
    onChangeText?: (text: string) => void;

    error?: boolean;
    errorMessage?: string;
}

export interface OutlinedTextInputProps extends TextInputProps {
    backgroundColor?: string;
}
