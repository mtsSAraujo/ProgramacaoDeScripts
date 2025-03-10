import style from "@/app/styles/style.module.css"
import Linha from "@/app/components/Linha"

export default function Home() {
  return (
  <div className= {style.container}>
      <h1 style= {{
        color: "white",
      }}>Dama</h1>
      <Linha/>
      <Linha preta/>
      <Linha/>
      <Linha preta/>
      <Linha/>
      <Linha preta/>
      <Linha/>
      <Linha preta/>
  </div>
  );
}
