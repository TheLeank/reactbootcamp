import ReactDOM from "react-dom";
import { useState } from "react";

const WarningNotused = () => {
  return <h1>Todavía no se ha usado el contador</h1>;
};

const ListOfClicks = ({ clicks }) => {
  return <p>{clicks.join(", ")}</p>;
};

const App = () => {
  const [counters, setCounters] = useState({
    left: 0,
    right: 0
  });

  const [clicks, setClicks] = useState([]);

  const handleClickLeft = () => {
    const newCounterState = {
      ...counters,
      left: counters.left + 1
    };
    setCounters(newCounterState);
    setClicks((prevclicks) => [...prevclicks, "L"]);
  };

  const handleClickRight = () => {
    const newCounterState = {
      ...counters,
      right: counters.right + 1
    };
    setCounters(newCounterState);
    setClicks((prevclicks) => [...prevclicks, "R"]);
  };

  return (
    <div>
      {counters.left}
      <button onClick={handleClickLeft}>left</button>
      <button onClick={handleClickRight}>right</button>
      {counters.right}
      <p>Clicks totales: {clicks.length}</p>
      {clicks.length === 0 ? (
        <WarningNotused />
      ) : (
        <ListOfClicks clicks={clicks} />
      )}
    </div>
  );
};

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
