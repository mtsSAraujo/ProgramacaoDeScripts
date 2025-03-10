import Subdivisao from "./Subdivisao";
import style from "@/app/styles/Linha.module.css"

export default function Linha(props) {
    return (
        <div className={style.linha}>
            <Subdivisao preta = {props.preta} peca = {props.peca && props.preta} jogador2 = {props.jogador2}/>
            <Subdivisao preta = {!props.preta} peca = {props.peca && !props.preta} jogador2 = {props.jogador2}/>
            <Subdivisao preta = {props.preta} peca = {props.peca && props.preta} jogador2 = {props.jogador2}/>
            <Subdivisao preta = {!props.preta} peca = {props.peca && !props.preta} jogador2 = {props.jogador2}/>
            <Subdivisao preta = {props.preta} peca = {props.peca && props.preta} jogador2 = {props.jogador2}/>
            <Subdivisao preta = {!props.preta} peca = {props.peca && !props.preta} jogador2 = {props.jogador2}/>
            <Subdivisao preta = {props.preta} peca = {props.peca && props.preta} jogador2 = {props.jogador2}/>
            <Subdivisao preta = {!props.preta} peca = {props.peca && !props.preta} jogador2 = {props.jogador2}/>
        </div>
    );
}