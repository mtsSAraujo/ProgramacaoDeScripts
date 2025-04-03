import styles from '../styles/Display.module.css';
import HistoryIcon from './HistoryIcon';

export default function Display({ expression, result, onToggleHistory }) {
    const operadores = ['+', '-', '*', '/'];

    let firstLine = '';
    let secondLine = expression;

    if (result !== '') {
        return (
            <div className={styles.display}>
                <HistoryIcon onClick={onToggleHistory} />
                <div className={styles.result}>{result}</div>
            </div>
        );
    }

    for (let op of operadores) {
        const index = expression.lastIndexOf(op);
        if (index > 0 && index < expression.length - 1) {
            firstLine = expression.slice(0, index + 1);
            secondLine = expression.slice(index + 1);
            break;
        }
    }

    return (
        <div className={styles.display}>
            <HistoryIcon onClick={onToggleHistory} />
            <div className={styles.top}>{firstLine}</div>
            <div className={styles.bottom}>{secondLine}</div>
        </div>
    );
}
