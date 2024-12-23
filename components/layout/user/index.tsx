import { ActionIcon, AppShell, Burger, SimpleGrid } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import Sidebar from './sidebar';
import classes from './layout.module.css';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { IconDashboard, IconSettings, IconRocket, IconWallet, IconMenu2, IconChevronRight } from '@tabler/icons-react';
import { Text } from '@mantine/core';
import Footer from './footer';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { data: session, status } = useSession();
  if (status === 'loading') return <div>Loading...</div>;
  if (!session) router.push('/signin');


  return (
    <AppShell
      navbar={{
        width: 500,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      footer={{
        height: isMobile ? 80 : 0,
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
      {isMobile &&
        <AppShell.Footer>
          <Footer />
        </AppShell.Footer>
      }
    </AppShell>
  );
}

export default UserLayout;
