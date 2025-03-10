import style from "@/app/styles/Subdivisao.module.css"

export default function Subdivisao(props) {
    return (
        <div style={{
            backgroundColor: props.preta ? "#000" : "#fff",
        }} className={style.subdivisao}>
            <div className= {
                `
                ${props.peca ? style.peca : ""}
                ${props.jogador2 && props.peca ? style.peca1 : ""}
                `
            }>

            </div>
        </div>
    );
}