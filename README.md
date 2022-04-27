# 뇌피셜

useDeferredValue는 현재 받는 value가 아닌 이전에 받은 value를 넘겨준다.  
그리고 Effect 함수를 이용해서 급한 Event가 처리되어 DOM Update가 되고 re-render 될 때 원래 받은 value를 반환한다.

## 흐름

```typescript
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
```

1. Input에 1이 입력된다.
2. setValue를 통해 re-render되면서 value는 1이고 deferredValue는 이전에 받은 "" 값이 들어간다.
3. DOM Update 이후 Effect 함수가 실행되면서 re-render되고 이때 deferredValue는 1을 받는다.

# React 분석

- workLoopSync - work를 동기적으로 처리되므로 처리되는 동안 Browser에 반응이 없음
- workLoopConcurrent - React 18 Concurrent 적용 함수 / 각 Work 마다 Browser에 제어권 넘김

  - performUnitfWork -> beginWork 끝날 때 처리해야 할 work가 있다면 workInProgress에 할당해서 Loop를 돈다.

- beginWork
  - renderWithHooks
    - React Element 새로 만드는 함수
    - didScheduleRenderPhaseUpdateDuringThisPass로 Component 업데이트 중 발생하는 State Update 처리하는 듯
