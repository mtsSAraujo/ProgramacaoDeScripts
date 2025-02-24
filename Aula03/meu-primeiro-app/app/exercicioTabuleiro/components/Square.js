import styles from '../styles/Square.module.css';
import Piece from './Piece';

const Square = ({ isBlack, row }) => {
    const shouldHavePiece = isBlack && (row < 3 || row > 4);
    const isGreen = row < 3; // Peças verdes nas 3 primeiras linhas

    return (
        <div className={`${styles.square} ${isBlack ? styles.black : styles.white}`}>
            {shouldHavePiece && <Piece isGreen={isGreen} />}
        </div>
    );
};

export default Square;
