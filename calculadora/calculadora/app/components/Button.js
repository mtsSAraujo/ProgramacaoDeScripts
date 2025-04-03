import styles from '../styles/Button.module.css';

export default function Button({ value, onClick }) {
    return (
        <button className={styles.button} onClick={() => onClick(value)}>
            {value}
        </button>
    );
}
