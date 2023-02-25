import "../styles/globals.css";
import dynamic from "next/dynamic";
const ProgressBar = dynamic(() => import("./progress-bar.js"), { ssr: false });

export default function App({ Component, pageProps }) {
  return (
    <>
      <ProgressBar />
      <Component {...pageProps} />
    </>
  );
}
