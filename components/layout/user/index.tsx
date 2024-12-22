import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Sidebar from './sidebar';
import classes from './layout.module.css';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();

  const { data: session, status } = useSession(); 
  if (status === 'loading') return <div>Loading...</div>;
  if (!session) router.push('/signin')  ;


  return (
    <AppShell
      navbar={{
        width: 500,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding={0}
      classNames={{
        main: classes.main,
        navbar: classes.navbar,
      }}
    >
      <AppShell.Navbar p="md">  
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default UserLayout;
