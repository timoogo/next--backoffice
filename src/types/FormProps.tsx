export interface FormProp{
    title: string;
    description: string;
    value? : string;
    isEncrypted?: boolean;
    onChange?: (value: string) => void;
    onSubmit?: () => void;
}
