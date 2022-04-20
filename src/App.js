import React, { useState, useDeferredValue, Suspense, useTransition, startTransition } from "react";
import "./style.css";
import { Spinner } from "./Suspense/Spinner";
import { TvShowDetails } from "./Suspense/TvShowDetails";
import { TvShowList } from "./Suspense/TvShowList";
export function TestAutomaticBatching(props) {
  console.log("render");
  const [count, setCount] = useState(1);

  const onClick = id => {
    setTimeout(() => {
      setCount(prevCount => {
        return prevCount + 1;
      });
      setCount(prevCount => {
        return prevCount + 2;
      });
      setCount(prevCount => {
        return prevCount + 3;
      });
    }, 500);
  };

  return (
    <div>
      <span>{count}</span>
      <button onClick={onClick}>증가</button>
    </div>
  );
}

export function TestDeferredForConcurrent(props) {
  console.log("TestTransitionForConcurrent re-render");
  const [value, setValue] = useState("");
  const deferredValue = useDeferredValue(value);

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <div className="App">
      <h1>{props.caption}</h1>
      <input value={value} onChange={onChange} />
      <Grid value={deferredValue} />
    </div>
  );
}

export function TestDeferredForOld(props) {
  console.log("TestTransitionForOld re-render");
  const [value, setValue] = useState("");

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <div className="App">
      <h1>{props.caption}</h1>
      <input value={value} onChange={onChange} />
      <Grid value={value} />
    </div>
  );
}
// export default function App(props) {
//   const [id, setId] = useState(1);
//   const [isPending, startTransition] = useTransition({
//     timeoutMs: 3000,
//   });

//   const onClick = id => {
//     startTransition(() => {
//       console.log("transition");
//       setId(id);
//     });
//   };

//   return (
//     <div className="container">
//       <h1>Top 10 TV Shows of All Time {isPending && "(loading)"}</h1>
//       <div className="flex">
//         <Suspense fallback={<Spinner />}>
//           <TvShowList onClick={onClick} />
//         </Suspense>
//         <Suspense fallback={<Spinner />}>
//           <TvShowDetails id={id} />
//         </Suspense>
//       </div>
//     </div>
//   );
// }

const BOARD_SIZE = 150;

const randomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const createBoard = (rows, columns) => {
  let array = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      row.push(0);
    }
    array.push(row);
  }
  return array;
};

const drawBoard = value => {
  const board = createBoard(BOARD_SIZE, BOARD_SIZE);
  return board.map((row, rowIndex) => {
    let cellsArrJSX = row.map((cell, cellIndex) => {
      let key = rowIndex + "-" + cellIndex;
      return <div style={{ backgroundColor: randomColor() }} className="cell" key={"cell-" + key} />;
    });
    return (
      <div key={"row-" + rowIndex} className="board-row">
        {cellsArrJSX}
      </div>
    );
  });
};

const Grid = React.memo(({ value }) => {
  return (
    <div>
      <h2 style={{ minHeight: 28 }}>{value}</h2>
      <div className="board">{drawBoard(value)}</div>
    </div>
  );
});

const ConcurrentTest = props => {
  const [value, setValue] = useState("");

  const deferredValue = useDeferredValue(value, {
    timeoutMs: 500,
  });

  const keyPressHandler = e => {
    setValue(e.target.value);
  };

  return (
    <div className="App">
      <h1>{props.caption}</h1>
      <input onKeyUp={keyPressHandler} />
      <Grid value={deferredValue} />
    </div>
  );
};
