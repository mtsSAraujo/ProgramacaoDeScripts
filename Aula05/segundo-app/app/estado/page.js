"use client";

import { useState, useEffect } from "react";

export default function Estado() {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [value, setValue] = useState(0)
    
    function quandoMover(e) {
        setX(e.clientX);
        setY(e.clientY);
        setValue(x+y)
    }

    function soma(x, y) {
        console.log(x+y)
    }

    return (
        <div style= {{
           display: "flex",
           flexDirection: "column",
           alignItems: "center",
           justifyContent: "center",
           height: "100vh",
        }} onMouseMove={quandoMover}>
            <h1>Estado - Evento</h1>
            <span>Eixo X: {x}</span>
            <span>Eixo Y: {y}</span>
            <span>Valor de soma: {value}</span>
            <button onClick={() => soma(x, y)}>Clique Aqui</button>
        </div>
    )
}
