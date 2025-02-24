import Square from './Square';
import styles from '../styles/Board.module.css';

const Board = () => {
    const renderBoard = () => {
        let board = [];
        for (let i = 0; i < 8; i++) {
            let row = [];
            for (let j = 0; j < 8; j++) {
                const isBlack = (i + j) % 2 !== 0;
                row.push(<Square key={`${i}-${j}`} isBlack={isBlack} row={i} />);
            }
            board.push(<div key={i} className={styles.row}>{row}</div>);
        }
        return board;
    };

    return <div className={styles.board}>{renderBoard()}</div>;
};

export default Board;
