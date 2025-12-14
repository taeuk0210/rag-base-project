import { TextField } from "@mui/material";

type TextFieldProps = {
  label: string;
  value: string;
  setValue: (value: string) => void;
};

const TextInput: React.FC<TextFieldProps> = ({ label, value, setValue }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      variant="filled"
    />
  );
};

export default TextInput;
