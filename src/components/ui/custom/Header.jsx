import React from 'react';
import { Button } from '../button';
import { UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className='p-3 px-5 flex justify-between shadow-md'>
      <img src="/logo.svg" width={35} height={50} alt="Logo" />
      {isSignedIn ? (
        <div className='flex items-center gap-2'>
          <Link to={'/dashboard'}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={'/auth/sign-in'}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
