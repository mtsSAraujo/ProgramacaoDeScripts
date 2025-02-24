import styles from '../styles/Piece.module.css';

const Piece = ({ isGreen }) => {
    return <div className={`${styles.piece} ${isGreen ? styles.green : styles.orange}`} />;
};

export default Piece;
