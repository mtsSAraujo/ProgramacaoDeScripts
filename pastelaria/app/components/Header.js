import styles from '../styles/Header.module.css';
import {FaGlassWhiskey, FaHamburger} from 'react-icons/fa';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    Pastelaria do seu Zé
                    <div className={styles.iconContainer}>
                        <FaHamburger className={styles.icon} />
                        <FaGlassWhiskey className={styles.icon} />
                    </div>
                </div>
            </div>
        </header>
    );
}
