import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/input';
import { Button, Link } from '@mui/material';
import {
  useLazyCurrentQuery,
  useRegisterMutation,
} from '../../app/services/userApi';
import { useNavigate } from 'react-router-dom';
import { hasErrorField } from '../../utils/has-error-field';
import { ErrorMessage } from '../../components/error-message';

type RegisterField = {
  email: string;
  password: string;
  name: string;
};

type Props = {
  setSelected: (value: string) => void;
};

export const Register: React.FC<Props> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterField>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const onSubmit = async (data: RegisterField) => {
    try {
      await register(data).unwrap();
      setSelected('login');
    } catch (error) {
      console.error(error);
      if (hasErrorField(error)) {
        setError(error.data.error);
      }
    }
  };

  return (
    <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="name"
        label="name"
        type="text"
        required="Обязательное поле"
        className="w-full"
      />
      <Input
        control={control}
        name="email"
        label="email"
        type="email"
        required="Обязательное поле"
        className="w-full"
      />
      <Input
        control={control}
        name="password"
        label="пароль"
        type="password"
        required="Обязательное поле"
        className="w-full"
      />
      <ErrorMessage error={error} />

      <p className="text-center text-small">
        Уже есть аккаунт?{' '}
        <Link className="cursor-pointer" onClick={() => setSelected('login')}>
          Войти
        </Link>
      </p>
      <div className="gap-2 justify-end">
        <Button
          color="primary"
          type="submit"
          className="text-center w-full"
          loading={isLoading}
        >
          Зарегистрироваться
        </Button>
      </div>
    </form>
  );
};
