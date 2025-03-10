import style from "@/app/styles/Subdivisao.module.css"

export default function Subdivisao(props) {
    return (
        <div style={{
            backgroundColor: props.preta ? "#000" : "#fff",
        }} className={style.subdivisao}>
            
        </div>
    );
}