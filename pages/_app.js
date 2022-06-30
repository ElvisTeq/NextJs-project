import "../styles/globals.css";
import Layout from "../components/layout/Layout"; // Wrapping layout here will be added to all our app

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
