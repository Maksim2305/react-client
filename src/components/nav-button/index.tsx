import type React from 'react';
import { MyButton } from '../button';
import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  icon: JSX.Element;
  href: string;
};

const NavButton: React.FC<Props> = ({ children, icon, href }) => {
  return (
    <MyButton type="button" className="flex justify-start text-xl" icon={icon}>
      <Link to={href}>{children}</Link>
    </MyButton>
  );
};

export default NavButton;
