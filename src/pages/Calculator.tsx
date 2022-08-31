import React, { useState } from "react";

export default function Calculator() {
  const [input, setInput] = useState("0");
  const [previousInput, setPreviousInput] = useState("");

  const keyMapping = {
    dot: ".",
    divide: "÷",
    multiply: "x",
    minus: "-",
    plus: "+",
    equal: "=",
    ac: "all_clear",
    ce: "clear",
  };
  
  const calculate = (inputQuery: string) => {
    const inputArr = [];
    let currStart = 0;

    for (let i = 1; i < inputQuery.length; i++) {
      if (isNaN(parseInt(inputQuery[i])) && inputQuery[i] !== ".") {
        inputArr.push(inputQuery.substring(currStart, i), inputQuery[i]);
        currStart = i + 1;
      }
    }
    inputArr.push(inputQuery.substring(currStart));

    for (let i = 1; i < inputArr.length - 1; i++) {
      if (inputArr[i] === "÷") {
        const res = Number(inputArr[i - 1]) / Number(inputArr[i + 1]);
        inputArr.splice(i - 1, 3, res.toString());
        i = 0;
        continue;
      }
      if (inputArr[i] === "x") {
        const res = Number(inputArr[i - 1]) * Number(inputArr[i + 1]);
        inputArr.splice(i - 1, 3, res.toString());
        i = 0;
        continue;
      }
      if (inputArr[i] === "+") {
        const res = Number(inputArr[i - 1]) + Number(inputArr[i + 1]);
        inputArr.splice(i - 1, 3, res.toString());
        i = 0;
        continue;
      }
      if (inputArr[i] === "-") {
        const res = Number(inputArr[i - 1]) - Number(inputArr[i + 1]);
        inputArr.splice(i - 1, 3, res.toString());
        i = 0;
        continue;
      }
    }
    return inputArr[0];
  };

  const handleClearClick = () => {
    setPreviousInput("");
    setInput("0");
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let currentKey = e.currentTarget.name as keyof typeof keyMapping;
    if (isNaN(parseInt(currentKey))) {
      setInput((prevInput) => prevInput + keyMapping[currentKey]);
    } else {
      setInput((prevInput) => {
        if (prevInput === "0") return currentKey;
        return prevInput + currentKey;
      });
    }
  };

  const handleEqualsToClick = () => {
    setPreviousInput(input);
    const result = calculate(input);

    setInput(result);
  };

  return (
    <main>
      <section className="display">
        <div className="input previousInput">{previousInput}</div>
        <div className="input">{input}</div>
        {/* <input dir="rtl" value={input} onChange={handleInputChange}></input> */}
      </section>
      <section className="btn-container">
        <button name="ac" className="btn" onClick={handleClearClick}>
          AC
        </button>
        <button name="ce" className="btn" onClick={handleClearClick}>
          CE
        </button>
        <button name="plus" className="btn" onClick={handleClick}>
          +
        </button>
        <button name="multiply" className="btn" onClick={handleClick}>
          x
        </button>

        <button name="7" className="btn" onClick={handleClick}>
          7
        </button>
        <button name="8" className="btn" onClick={handleClick}>
          8
        </button>
        <button name="9" className="btn" onClick={handleClick}>
          9
        </button>
        <button name="minus" className="btn" onClick={handleClick}>
          -
        </button>

        <button name="4" className="btn" onClick={handleClick}>
          4
        </button>
        <button name="5" className="btn" onClick={handleClick}>
          5
        </button>
        <button name="6" className="btn" onClick={handleClick}>
          6
        </button>
        <button name="divide" className="btn" onClick={handleClick}>
          ÷
        </button>

        <button name="1" className="btn" onClick={handleClick}>
          1
        </button>
        <button name="2" className="btn" onClick={handleClick}>
          2
        </button>
        <button name="3" className="btn" onClick={handleClick}>
          3
        </button>
        <button
          name="equal"
          className="btn eql-btn"
          onClick={handleEqualsToClick}
        >
          =
        </button>

        <button name="0" className="btn zero-btn" onClick={handleClick}>
          0
        </button>
        <button name="dot" className="btn" onClick={handleClick}>
          .
        </button>
      </section>
    </main>
  );
}
