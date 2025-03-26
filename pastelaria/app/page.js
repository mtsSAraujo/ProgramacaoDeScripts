import Head from 'next/head';
import Header from '../app/components/Header';
import Menu from '../app/components/Menu';
import styles from '../app/styles/Home.module.css';

export default function Home() {
  return (
      <div className={styles.container}>
        <Head>
          <title>Pastelaria</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>

        <Header />
        <Menu />
      </div>
  );
}
