import styles from '../styles/History.module.css';

export default function HistoryPanel({ history, onSelect, onClose }) {
    return (
        <div className={styles.panel}>
            <div className={styles.header}>
                <span className={styles.title}>Histórico</span>
                <button className={styles.close} onClick={onClose}>❌</button>
            </div>
            <div className={styles.content}>
                {history.length === 0 ? (
                    <p className={styles.empty}>Nenhuma operação ainda.</p>
                ) : (
                    <ul className={styles.list}>
                        {history.map((item, idx) => (
                            <li key={idx} className={styles.item} onClick={() => onSelect(item)}>
                                <div>{item.expression}</div>
                                <div className={styles.result}>= {item.result}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
