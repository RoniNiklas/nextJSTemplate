import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { withTRPC } from '@trpc/next';
import { AppRouter } from './api/trpc/[trpc]';

const MyApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default withTRPC<AppRouter>({
  config() {
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/trpc`;
    return {
      url,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      },
    };
  },
  ssr: true,
})(MyApp);
