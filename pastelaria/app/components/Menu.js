import styles from '../styles/Menu.module.css';
import Image from 'next/image';

const menuItems = [
    { id: 1, name: 'Queijo', price: 'R$ 10,00', image: '/images/pastel-default.png', inStock: true },
    { id: 2, name: 'Carne', price: 'R$ 11,00', image: '/images/pastel-default.png', inStock: false },
    { id: 3, name: 'Frango', price: 'R$ 12,00', image: '/images/pastel-default.png', inStock: true },
    { id: 4, name: 'Pizza', price: 'R$ 13,00', image: '/images/pastel-default.png', inStock: false },
    { id: 5, name: 'Queijo', price: 'R$ 10,00', image: '/images/pastel-default.png', inStock: true },
    { id: 6, name: 'Carne', price: 'R$ 11,00', image: '/images/pastel-default.png', inStock: false },
    { id: 7, name: 'Frango', price: 'R$ 12,00', image: '/images/pastel-default.png', inStock: true },
    { id: 8, name: 'Pizza', price: 'R$ 13,00', image: '/images/pastel-default.png', inStock: false },
    { id: 9, name: 'Frango', price: 'R$ 12,00', image: '/images/pastel-default.png', inStock: true },
    { id: 10, name: 'Pizza', price: 'R$ 13,00', image: '/images/pastel-default.png', inStock: false }
];

export default function Menu() {
    return (
        <main className={styles.menuContainer}>
            {menuItems.map((item) => (
                <div key={item.id} className={`${styles.menuItem} ${!item.inStock ? styles.outOfStock : styles.clickable}`}>
                    <h3 className={styles.name}>{item.name}</h3>
                    <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className={`${styles.image} ${!item.inStock ? styles.grayscale : ''}`}
                    />
                    <span className={styles.price}>{item.price}</span>
                    {!item.inStock && <span className={styles.soldOut}>Esgotado</span>}
                </div>
            ))}
        </main>
    );
}