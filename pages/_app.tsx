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
  breakpoints: {
    xs: '36em',     // 576px
    sm: '48em',     // 768px
    md: '62em',     // 992px
    lg: '75em',     // 1200px
    xl: '88em'      // 1408px
  }
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const Layout = router.pathname.startsWith('/dashboard') ? UserLayout : router.pathname.startsWith('/signin') || router.pathname.startsWith('/signup') || router.pathname.startsWith('/forgot-password') ? AuthLayout : FrontPageLayout;
  return (
    <SessionProvider session={pageProps.session}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </SessionProvider>
  );
}

