import { Header } from '../header';
import { Container } from '../container';
import { Navbar } from '../nav-bar';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  selectIsAuthenticated,
  selectUser,
} from '../../features/user/userSlice';
import { useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { Profile } from '../profile';
export const Layout = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <div className="flex-1 p-4">
          <Navbar />
        </div>
        <div className="flex-2 p-4">
          <Outlet />
        </div>
        <div className="flex-col flex gap-5 items-center p-4">
          {!user && <Profile />}
        </div>
      </Container>
    </>
  );
};
