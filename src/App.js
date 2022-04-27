import React, { useState, useDeferredValue, Suspense, useTransition, startTransition, useEffect } from "react";
import "./style.css";
import { getTvMetadataResource, tvMetadataApi } from "./Suspense/helpers/Api";
import { Spinner } from "./Suspense/Spinner";

export function TestUpdateComponentWhenRenderPhase(props) {
  console.log("render");
  const [count, setCount] = useState(1);

  const onClick = id => {
    setCount(prevCount => {
      return prevCount + 1;
    });
  };

  if (count === 2) {
    setCount(prevCount => {
      return prevCount + 1;
    });
  }

  if (count === 3) {
    setCount(prevCount => {
      return prevCount + 1;
    });
  }

  return (
    <div>
      <span>{count}</span>
      <button onClick={onClick}>증가</button>
    </div>
  );
}

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
  const [value, setValue] = useState("");
  const deferredValue = useDeferredValue(value);
  console.log("TestDeferredForConcurrent re-render");
  console.log(`value: ${value} / deferredvalue: ${deferredValue}`);

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
  console.log("TestDeferredForOld re-render");
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

export function TestTransitionForConcurrent(props) {
  const [value, setValue] = useState("");
  const [gridValue, setGridValue] = useState("");
  const [isPending, startTransition] = useTransition();
  console.log("TestTransitionForConcurrent re-render");
  console.log(`value: ${value} / gridValue ${gridValue}`);

  const onChange = e => {
    setValue(e.target.value);
    startTransition(() => {
      setGridValue(() => {
        debugger;
        return e.target.value;
      });
    });
  };

  return (
    <div className="App">
      <h1>{props.caption}</h1>
      {isPending && <div>Updating...</div>}
      <input value={value} onChange={onChange} />
      <Grid value={gridValue} />
    </div>
  );
}

export function TestTransitionForOld(props) {
  console.log("TestTransitionForOld re-render");
  const [value, setValue] = useState("");
  const [gridValue, setGridValue] = useState("");

  const onChange = e => {
    setValue(e.target.value);
    setGridValue(e.target.value);
  };

  return (
    <div className="App">
      <h1>{props.caption}</h1>
      <input value={value} onChange={onChange} />
      <Grid value={gridValue} />
    </div>
  );
}

export function TestSuspend(props) {
  return (
    <Suspense fallback={<Spinner />}>
      <TvShowList />
    </Suspense>
  );
}

function TvShowList() {
  const tvMetadata = getTvMetadataResource().read();
  const tvshows = tvMetadata.map(item => (
    <div className="item" key={item.id}>
      <div className="name">{item.name}</div>
      <div className="score">{item.score}</div>
    </div>
  ));
  return <div className="tvshow-list">{tvshows}</div>;
}

export function TestNoSuspend(props) {
  const [tvMetadata, setTvMetadata] = useState(null);

  useEffect(() => {
    tvMetadataApi().then(value => {
      setTvMetadata(value);
    });
  }, []);

  if (tvMetadata === null) return <Spinner />;

  const tvshows = tvMetadata.map(item => (
    <div className="item" key={item.id}>
      <div className="name">{item.name}</div>
      <div className="score">{item.score}</div>
    </div>
  ));
  return <div className="tvshow-list">{tvshows}</div>;
}

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
