import { Box, CardMedia, Typography } from '@mui/material';
import { BASE_URL } from '../../constants';

type Props = {
  name: string;
  avatarUrl: string;
  description?: string;
  className?: string;
};

const User: React.FC<Props> = ({
  name = '',
  avatarUrl = '',
  description = '',
  className = '',
}) => {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <CardMedia
        sx={{ width: 56, height: 56 }}
        component="img"
        image={`${BASE_URL}${avatarUrl}`}
        alt={name}
      />
      <Box>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default User;
