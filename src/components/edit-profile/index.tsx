import { useContext, useState } from 'react';
import { type User } from '../../app/types';
import { ThemeContext } from '../theme-provider';
import { useUpdateUserMutation } from '../../app/services/userApi';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Input } from '../input';
import { ErrorMessage } from '../error-message';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
};

export const EditProfile: React.FC<Props> = ({ isOpen, onClose, user }) => {
  const { theme } = useContext(ThemeContext);
  const [updaUser, { isLoading }] = useUpdateUserMutation();
  const [error, setError] = useState('');
  const [selectFile, setSelectedFile] = useState<File | null>(null);
  const { id } = useParams<{ id: string }>();

  const { handleSubmit, control } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: user?.email,
      name: user?.name,
      dateOfBirth: user?.dateOfBirth,
      bio: user?.bio,
      location: user?.location,
    },
  });

  return (
    <Dialog
      open={isOpen}
      onClose={(event, reason) => {
        if (reason === 'backdropClick') return;
        onClose();
      }}
      className={`${theme}`}
    >
      <DialogTitle>Редактировать профиль</DialogTitle>
      <DialogContent>
        <Box component="form" className="flex flex-col gap-4 w-100">
          <form className="flex flex-col gap-4">
            <Input
              control={control}
              name="email"
              label="Email"
              type="email"
              className="w-100"
            />
            <Input
              control={control}
              name="name"
              label="Имя"
              type="text"
              className="w-100"
            />
            <input
              type="file"
              name="avatarurl"
              placeholder="Выберите файл"
              className="w-100"
            />
            <Input
              control={control}
              name="dateOfBirth"
              label="Дата рождения"
              type="date"
              className="w-100"
            />
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <TextField rows={4} {...field} placeholder="Ваша биография" />
              )}
            />
            <Input
              control={control}
              name="location"
              label="Местоположение"
              type="text"
              className="w-100"
            />
            <ErrorMessage error={error} />
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Отмена
        </Button>
        <Button loading={isLoading} color="primary" type="submit">
          Обновить профиль
        </Button>
      </DialogActions>
    </Dialog>
  );
};
