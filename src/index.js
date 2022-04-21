import React from "react";
import ReactDOM from "react-dom/client";
import OldReactDOM from "react-dom";
import "./index.css";
import { TestAutomaticBatching, TestDeferredForOld, TestDeferredForConcurrent, TestTransitionForOld, TestTransitionForConcurrent } from "./App";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// React Stack
const rootElement = document.getElementById("root");
// OldReactDOM.render(<TestAutomaticBatching />, rootElement);
OldReactDOM.render(<TestDeferredForOld />, rootElement);
// OldReactDOM.render(<TestTransitionForOld />, rootElement);

// Concurrent Mode
const rootElementConcurrent = document.getElementById("root-concurrent");
// ReactDOM.createRoot(rootElementConcurrent).render(<TestAutomaticBatching />);
// ReactDOM.createRoot(rootElementConcurrent).render(<TestDeferredForConcurrent />);
ReactDOM.createRoot(rootElementConcurrent).render(<TestTransitionForConcurrent />);
