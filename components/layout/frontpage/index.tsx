import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from './header';
import { useState } from 'react';

const FrontPageLayout = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();
  const [navigation, setNavigation] = useState<string>("home");  

  return (
    <AppShell padding={0}>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default FrontPageLayout;
