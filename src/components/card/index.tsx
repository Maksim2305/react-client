import { useState } from 'react';
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from '../../app/services/likesApi';
import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from '../../app/services/postsApi';
import { useDeleteCommentMutation } from '../../app/services/commentsApi';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectCurrent } from '../../features/user/userSlice';
import {
  Box,
  CardContent,
  CircularProgress,
  Card as MuiCard,
  Typography,
} from '@mui/material';
import User from '../user';
import { formatToClientDate } from '../../utils/format-to-client-date';
import { RiDeleteBinLine } from 'react-icons/ri';
import MetaInfo from '../meta-info';
import { FcDislike } from 'react-icons/fc';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { FaRegComment } from 'react-icons/fa';
import { ErrorMessage } from '../error-message';
import { hasErrorField } from '../../utils/has-error-field';

type Props = {
  avatarUrl: string;
  name: string;
  authorId: string;
  content: string;
  commentId?: string;
  likesCount?: number;
  commentsCount?: number;
  createdAt: Date;
  id?: string;
  cardFor: 'comment' | 'post' | 'current-post';
  likedByUser?: boolean;
};

const Card = ({
  avatarUrl = '',
  name = '',
  authorId = '',
  content = '',
  commentId = '',
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  id = '',
  cardFor = 'post',
  likedByUser = false,
}: Props) => {
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrent);

  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case 'post':
          await deletePost(id).unwrap();
          await triggerGetAllPosts().unwrap();
          break;
        case 'current-post':
          await deletePost(id).unwrap();
          await triggerGetAllPosts().unwrap();
          navigate('/');
          break;
        case 'comment':
          await deleteComment(commentId).unwrap();
          await triggerGetPostById(id).unwrap();
          break;
        default:
          throw new Error('Invalid cardFor prop');
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      } else {
        setError(error as string);
      }
    }
  };

  return (
    <MuiCard className="mb-5">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'transparent',
          padding: '8px',
        }}
      >
        <Link to={`/users/${authorId}`}>
          <User
            name={name}
            className="text-small font-semibold leading-non text-default-600"
            avatarUrl={avatarUrl}
            description={createdAt && formatToClientDate(createdAt)}
          ></User>
        </Link>
        {currentUser && authorId === currentUser.id && (
          <div className="cursor-pointer" onClick={handleDelete}>
            {deleteCommentStatus.isLoading || deletePostStatus.isLoading ? (
              <CircularProgress />
            ) : (
              <RiDeleteBinLine />
            )}
          </div>
        )}
      </Box>
      <CardContent className="px-3 py-2 mb-5">
        <Typography>{content}</Typography>
      </CardContent>
      {cardFor !== 'comment' && (
        <div className="gap-3">
          <div className="flex gap-5 items-center">
            <div className="flex gap-5 items-center p-2">
              <MetaInfo
                count={likesCount}
                Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
              />
              <Link to={`/posts/${id}`}>
                <MetaInfo count={commentsCount} Icon={FaRegComment} />
              </Link>
            </div>
          </div>
          <ErrorMessage error={error} />
        </div>
      )}
    </MuiCard>
  );
};

export default Card;
