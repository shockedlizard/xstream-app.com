// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import type { AppProps } from 'next/app';
import { createTheme, MantineProvider } from '@mantine/core';
import { useRouter } from 'next/router';
import UserLayout from '@/components/layout/user';
import FrontPageLayout from '@/components/layout/frontpage';
import '@/styles/globals.css';
import '@mantine/charts/styles.css';
import AuthLayout from '@/components/layout/auth';
import { SessionProvider } from "next-auth/react"

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const Layout = router.pathname.startsWith('/dashboard') ? UserLayout : router.pathname.startsWith('/signin') || router.pathname.startsWith('/signup') || router.pathname.startsWith('/forgot-password') ? AuthLayout : FrontPageLayout;
  return (
    <SessionProvider session={pageProps.session}>
      <MantineProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </SessionProvider>
  );
}

