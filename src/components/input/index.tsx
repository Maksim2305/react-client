import { TextField } from '@mui/material';
import { useController, type Control } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  control: Control<any>;
  required?: string;
  endContent?: JSX.Element;
  className?: string;
};
export const Input: React.FC<Props> = ({
  name,
  label,
  placeholder,
  type,
  control,
  required = '',
  endContent,
  className,
}: Props) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: { required },
  });
  return (
    <div>
      <TextField
        id={name}
        className={className}
        label={label}
        type={type}
        placeholder={placeholder}
        value={field.value}
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        error={Boolean(errors[name]?.message)}
        helperText={`${errors[name]?.message ?? ''}`}
      ></TextField>
    </div>
  );
};
