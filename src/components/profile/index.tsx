import { useAppSelector } from '../../app/hooks';
import { selectCurrent } from '../../features/user/userSlice';
import { Card, CardContent, CardHeader, CardMedia } from '@mui/material';
import { BASE_URL } from '../../constants';
import { Link } from 'react-router-dom';
import { MdAlternateEmail } from 'react-icons/md';

export const Profile = () => {
  const current = useAppSelector(selectCurrent);
  if (!current) {
    return null;
  }

  const { name, email, avatarUrl, id } = current;
  return (
    <Card className="py-4 w-[302px]">
      <CardMedia
        component="img"
        className="object-cover rounded0xl"
        alt="card profile"
        image={`${BASE_URL}${avatarUrl}`}
      />
      <CardContent>
        <Link to={`/users/${id}`}>
          <h4 className="font-bold text-large mb-2">{name}</h4>
        </Link>
        <Link to={`/users/${id}`} className="flex items-center gap-1">
          <MdAlternateEmail />
          {email}
        </Link>
      </CardContent>
    </Card>
  );
};
