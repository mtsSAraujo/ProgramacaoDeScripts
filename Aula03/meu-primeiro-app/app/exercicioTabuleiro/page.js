import Board from "@/app/exercicioTabuleiro/components/Board";
import style from "@/app/exercicioTabuleiro/styles/style.module.css"

export default function Home() {
    return (
        <div className={style.container}>
            <h1 className={style.h1}>Tabuleiro de Damas</h1>
            <Board />
        </div>
    );
}
