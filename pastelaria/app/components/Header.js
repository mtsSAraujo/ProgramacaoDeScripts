import styles from '../styles/Header.module.css';
import {FaHamburger} from 'react-icons/fa';
import {FaBeerMugEmpty} from "react-icons/fa6";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    Pastelaria do seu Zé
                    <div className={styles.iconContainer}>
                        <FaHamburger className={styles.icon} />
                        <FaBeerMugEmpty className={styles.icon} />
                    </div>
                </div>
            </div>
        </header>
    );
}
