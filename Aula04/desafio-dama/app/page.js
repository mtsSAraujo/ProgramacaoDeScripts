import style from "@/app/styles/style.module.css"
import Linha from "@/app/components/Linha"

export default function Home() {
  return (
  <div className= {style.container}>
      <h1 style= {{
        color: "white",
      }}>Dama</h1>
      <Linha peca/>
      <Linha preta peca/>
      <Linha peca/>
      <Linha preta/>
      <Linha/>
      <Linha preta peca jogador2/>
      <Linha peca jogador2/>
      <Linha preta peca jogador2/>
  </div>
  );
}
