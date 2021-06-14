import ReactDOM from "react-dom";
import { useState } from "react";

const rootElement = document.getElementById("root");

const Counter = (props) => {
  return <h1>{props.number}</h1>;
};

const App = (props) => {
  const [contadorValue, updateContador] = useState(0);
  const isEven = contadorValue % 2 === 0;
  const mensaje = isEven ? "Es par" : "Es impar";

  return (
    <div>
      <p>Skree</p>
      <Counter number={contadorValue} />
      <button
        onClick={() => {
          updateContador(contadorValue + 1);
        }}
      >
        Incrementar
      </button>
      <button
        onClick={() => {
          updateContador(0);
        }}
      >
        Reiniciar
      </button>
      <p>{mensaje}</p>
    </div>
  );
};

ReactDOM.render(<App />, rootElement);
