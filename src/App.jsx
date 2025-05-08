import { useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useEffect } from "react";

function App() {
  const [advice, setAdvice] = useState();
  const [loading, setIsLoading] = useState(false);
  const [color, setColor] = useState(false);

  const refs = useRef();

  function handleEnter() {
    setColor(true);
  }
  function handleLeave() {
    setColor(false);
  }

  async function fetchAdvice() {
    setIsLoading(true);
    try {
      const data = await fetch("https://api.adviceslip.com/advice");
      const response = await data.json();
      console.log(response);
      refs.current.focus();
      setAdvice(response.slip.advice);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAdvice();
  }, []);
  return (
    <div>
      <h2>Advices Fetching</h2>
      <p ref={refs}>{loading ? <ClipLoader /> : advice}</p>

      <button onClick={fetchAdvice}>Fetch advice one by one</button>
      <button
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{ backgroundColor: color ? "yellow" : "red" }}
      >
        color change
      </button>
    </div>
  );
}

export default App;
