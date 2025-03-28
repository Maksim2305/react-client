import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ButtonBack = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  return (
    <Button
      sx={{ mb: 2 }}
      startIcon={<ArrowBackIcon />}
      onClick={handleClick}
      variant="outlined"
    >
      Назад
    </Button>
  );
};

export default ButtonBack;
