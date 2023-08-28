import "../styles/globals.css";
// include styles from the ui package
import "@fmg/ui/styles.css";
import { QueryClient } from "@tanstack/react-query";

import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
