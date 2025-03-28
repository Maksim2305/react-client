import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../app/services/postsApi';
import CreateComment from '../../components/create-comment';
import Card from '../../components/card';
import ButtonBack from '../../components/button-back';

export const CurrentPost = () => {
  const params = useParams<{ id: string }>();
  const { data } = useGetPostByIdQuery(params?.id ?? '');

  if (!data) {
    return <h2>Пост не найден</h2>;
  }

  const {
    author,
    authorId,
    comments,
    content,
    id,
    createdAt,
    likes,
    likedByUser,
  } = data;

  return (
    <>
      <ButtonBack />
      <Card
        authorId={authorId}
        content={content}
        createdAt={createdAt}
        cardFor="current-post"
        avatarUrl={author.avatarUrl ?? ''}
        name={author.name ?? ''}
        id={id}
        likedByUser={likedByUser}
        likesCount={likes.length}
        commentsCount={comments.length}
      />
      <CreateComment />
      <div className="mt-5">
        {data?.comments && data.comments.length ? (
          data.comments.map(comment => (
            <Card
              authorId={comment.userId}
              content={comment.content}
              cardFor="comment"
              avatarUrl={comment.user.avatarUrl ?? ''}
              name={comment.user.name ?? ''}
              commentId={comment.id}
              id={id}
            />
          ))
        ) : (
          <div>Напишите комментарий</div>
        )}
      </div>
    </>
  );
};
