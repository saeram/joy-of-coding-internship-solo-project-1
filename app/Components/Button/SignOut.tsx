'use client';
import { Button } from '@/components/ui/button';
import { useClerk } from '@clerk/nextjs';
import { ExitIcon } from '@radix-ui/react-icons';
import React from 'react'

const SignOut = () => {
    const { signOut } = useClerk();

  return (
    <Button className="hover:font-bold"
        onClick={() => signOut({ redirectUrl: '/signin' })}
        
    ><ExitIcon className="mr-3"/>Sign Out</Button>
  )
}

export default SignOut
