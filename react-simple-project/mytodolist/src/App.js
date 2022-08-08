import React, { useState, useMemo } from 'react';
import InsertForm from "./components/InsertForm";
import ListView from "./components/ListView";
function App() {
  const [todoList, setTodoList] = useState([]);
  const isLimitReached = useMemo(() => {
    return todoList.length >= 10;
  }, [todoList]);

  const handleInsert = (value) => {
    setTodoList((current) => {
      const newTodoList = [...current];
      newTodoList.push({
        key: new Date().getTime(), 
        value: value,
        isCompleted: false
      });
      return newTodoList;
    });
  }

  const handleComplete = (index) => {
    setTodoList((current) => {
      const newList = [...current];
      newList[index].isCompleted = true;
      return newList;
    });
  }

  const handleRemove = (index) => {
    setTodoList((current) => {
      const newList = [...current];
      newList.splice(index, 1);
      return newList;
    });
  }

  return (
    <div className="App">
        <ListView 
          todoList={todoList}
          onComplete={handleComplete} 
          onRemove={handleRemove} 
        />
        {isLimitReached 
        && <div style={{
            padding: "8px 16px",
            border: "1px solid #FA466A",
            backgroundColor: "#feecf0",
            color: "#FA466A",
            marginBottom: 16
            }}>
              ※ 할일 목록이 너무 많습니다.
            </div>
        }
        <InsertForm onInsert={handleInsert} disabled={isLimitReached}/>
    </div>
  );
}

export default App;


/*
key: new Date().getTime(), 
value: value,
isCompleted: false
  key : JSX에서 Array의 값을 표현할 때 각 요소를 구분하기 위한 값
        new Date()를 하면 현재 시각을 가지는 객체가 생성. getTime()을 하면 ms 단위의
        시각 값을 반환받는다
  value : onInsert로부터 전달받은 값
  isCompleted : 완료처리를 위한 flag
*/
/*
newTodoList.push({})
  array인 newTodoList 뒤에 요소를 추가한다
*/
/*
Array.splice(index, 1)
  시작할 인덱스, 삭제할 개수
Array.splice(index, 1, ...)
  시작할 인덱스, 삭제할 개수, 새로이 삽입할 요소
*/
/*
{isLimitReached 
        && <div style={{
  isLimitReached가 true라면 <div ~> 를 표현한다
*/
/*
<InsertForm onInsert={(value) => {
    console.log(value);
}} />
    onInsert 함수를 props로 전달한다
*/