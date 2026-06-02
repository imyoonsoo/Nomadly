export type TextInputProps = {
  id?: string;
  name: string;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  type?: "text" | "password";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
};

export type TextAreaProps = {
  id?: string;
  name: string;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  className?: string;
  textareaClassName?: string;
  textCount?: boolean;
};
