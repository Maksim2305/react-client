import { Box, Card, CardContent, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { Login } from '../../features/user/login';
import { Register } from '../../features/user/register';

export const Auth = () => {
  const [value, setValue] = useState('login');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <Card className="max-w-full w-[340px] h-[450px]">
          <CardContent className="overflow-hidden">
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
              <Tab value={'login'} label="Вход"></Tab>
              <Tab value={'sign-up'} label="Регистрация"></Tab>
            </Tabs>
            <Box>
              {value === 'login' && <Login setSelected={setValue} />}
              {value === 'sign-up' && (
                <div>
                  <Register setSelected={setValue} />
                </div>
              )}
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
