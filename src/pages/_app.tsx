import '../styles/global.scss'

import styles from '../styles/app.module.scss';

import { Header } from '../components/Header'
import { Player } from '../components/Player';
import { PlayerContextProvider } from '../contexts/PlayerContexts';


function MyApp({ Component, pageProps }) {
  
  return (
    <PlayerContextProvider>
        <div className={styles.Wrapper}>
            <main>
              <Header />
              <Component {...pageProps} />
            </main>
              <Player />
        </div>
    </PlayerContextProvider>
  )
}

export default MyApp
