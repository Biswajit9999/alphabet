import { useEffect, useState } from "react";
import "./App.css";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function App() {
  const [output, setOutput] = useState("");

  const addLetter = (letter) => {
    setOutput((prev) => prev + letter);
  };

  const backspace = () => {
    setOutput((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // ignore shortcuts like Ctrl+C, Cmd+R
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      if (/^[a-zA-Z]$/.test(event.key)) {
        setOutput((prev) => prev + event.key.toUpperCase());
      } else if (event.key === "Backspace") {
        setOutput((prev) => prev.slice(0, -1));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="page">
      <div className="card">
        <h1>Alphabet Buttons</h1>
        <p className="subtitle">
          Click letters (or use your keyboard) to build text.
        </p>

        <div
          className="output"
          data-placeholder="Your text will appear here..."
        >
          {output}
        </div>

        <div className="toolbar">
          <button
            type="button"
            className={`backspace ${output ? "" : "muted"}`}
            onClick={backspace}
          >
            Backspace
          </button>
        </div>

        <div className="keys">
          {LETTERS.map((letter) => (
            <button
              key={letter}
              type="button"
              className="key"
              onClick={() => addLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;