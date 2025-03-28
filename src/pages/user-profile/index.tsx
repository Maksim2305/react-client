import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  resetUser,
  selectCurrent,
  selectUser,
} from '../../features/user/userSlice';
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from '../../app/services/userApi';
import {
  followUser,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '../../app/services/followApi';
import { useEffect, useState } from 'react';
import ButtonBack from '../../components/button-back';
import { Button, Card, CardMedia } from '@mui/material';
import { BASE_URL } from '../../constants';
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { ProfileInfo } from '../../components/profile-info';
import { formatToClientDate } from '../../utils/format-to-client-date';
import CountInfo from '../../components/count-info';
import { EditProfile } from '../../components/edit-profile';

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const currentUser = useAppSelector(selectCurrent);
  const { data } = useGetUserByIdQuery(id ?? '');
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery();
  const [triggerCurrentQuery] = useLazyCurrentQuery();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(
    () => () => {
      dispatch(resetUser());
    },
    []
  );

  const onClose = () => {
    setIsOpen(false);
  };

  const handleFollow = async () => {
    try {
      if (id) {
        data?.isFollowing
          ? await unfollowUser(id).unwrap()
          : await followUser({ followingId: id }).unwrap();

        await triggerGetUserByIdQuery(id);

        await triggerCurrentQuery();
      }
    } catch (error) {}
  };
  return (
    <>
      <ButtonBack />
      <div className="flex items-center gap-4 h-100">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-1 h-100">
          <CardMedia
            component="img"
            className="border-4 border-white"
            alt="card profile"
            image={`${BASE_URL}${data?.avatarUrl}`}
            height={200}
            width={200}
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data?.name}

            {currentUser?.id !== id ? (
              <Button
                color={data?.isFollowing ? 'secondary' : 'primary'}
                onClick={handleFollow}
                variant="outlined"
                className="gap-2"
                endIcon={
                  data?.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data?.isFollowing ? 'Отписаться' : 'Подписаться'}
              </Button>
            ) : (
              <Button endIcon={<CiEdit />} onClick={() => setIsOpen(true)}>
                Редактировать
              </Button>
            )}
          </div>
        </Card>
        <Card className="flex flex-col space-y-4 p-5 flex-2 h-100">
          <ProfileInfo title="Почта" info={data?.email} />
          <ProfileInfo title="Местоположение" info={data?.location} />
          <ProfileInfo
            title="Дата Рождения"
            info={formatToClientDate(data?.dateOfBirth)}
          />
          <ProfileInfo title="Обо мне" info={data?.bio} />
          <div className="flex gap-2">
            <CountInfo count={data?.followers.length ?? 0} title="Подписчики" />
            <CountInfo count={data?.following.length ?? 0} title="Подписки" />
          </div>
        </Card>
      </div>
      <EditProfile isOpen={isOpen} onClose={onClose} />
    </>
  );
};
