import React from 'react';
import { SignIn } from '@clerk/clerk-react';

function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="w-full max-w-md">
        <SignIn />
      </div>
    </div>
  );
}

export default SignInPage;
