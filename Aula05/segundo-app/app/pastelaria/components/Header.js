import styles from "@/app/pastelaria/css/header.module.css"
import Image from 'next/image';

const Header = () => {
    return (
        <header className = {styles.mainHeader}>
            <div className={styles.topContainer}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Pastelaria do Seu Zé</h1>
                    <div className={styles.iconWrapper}>
                        <Image 
                            src="/images/icons/lanche-icon.png" 
                            alt="Ícone de Pastel"
                            width={48} 
                            height={48}
                            className={styles.icon}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;