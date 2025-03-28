import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from '../../app/services/postsApi';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '../error-message';
import { Button, TextField } from '@mui/material';
import { IoMdCreate } from 'react-icons/io';
import { useCreateCommentMutation } from '../../app/services/commentsApi';
import { useParams } from 'react-router-dom';

type Comment = {
  comment: string;
};

const CreateComment = () => {
  const [createComment] = useCreateCommentMutation();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const params = useParams<{ id: string }>();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<Comment>();

  const error = errors?.comment?.message as string;

  const onSubmit = async (data: Comment) => {
    try {
      await createComment({
        content: data.comment,
        postId: params?.id ?? '',
      }).unwrap();
      setValue('comment', '');
      await triggerGetPostById(params?.id as string).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex-grow" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="comment"
        control={control}
        defaultValue={''}
        rules={{
          required: 'Обязательное поле',
        }}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              id="comment"
              placeholder="Введите сообщение"
              multiline
              fullWidth
              rows={3}
              sx={{ marginBottom: '20px' }}
            />
          );
        }}
      />

      {errors && <ErrorMessage error={error} />}

      <Button
        color="success"
        type="submit"
        variant="contained"
        endIcon={<IoMdCreate />}
      >
        Отправить
      </Button>
    </form>
  );
};

export default CreateComment;
