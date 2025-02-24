import style from "./css/style.module.css"
import Estilo from "@/app/estilo/components/Estilo";

export default function EstiloPage() {
    return (
        <div>
            <h1 className={style.h1}>Aula Estilo</h1>
            <button className={style.button}>Clique aqui</button>
            <Estilo texto={"vai chover"} direita temp={30}></Estilo>
            <Estilo texto={"vai chover"} temp={18}></Estilo>
        </div>
    )
}