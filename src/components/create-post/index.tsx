import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from '../../app/services/postsApi';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '../error-message';
import { Button, TextField } from '@mui/material';
import { IoMdCreate } from 'react-icons/io';

type Post = {
  post: string;
};

const CreatePost = () => {
  const [createPost] = useCreatePostMutation();
  const [triggerAllPosts] = useLazyGetAllPostsQuery();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<Post>();

  const error = errors?.post?.message as string;

  const onSubmit = async (data: Post) => {
    try {
      await createPost({ content: data.post }).unwrap();
      setValue('post', '');
      await triggerAllPosts().unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex-grow" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="post"
        control={control}
        defaultValue={''}
        rules={{
          required: 'Обязательное поле',
        }}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              id="post"
              placeholder="О чем думаете?"
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
        Добавить пост
      </Button>
    </form>
  );
};

export default CreatePost;
