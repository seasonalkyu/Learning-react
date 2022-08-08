import React, { useState, useCallback } from "react";

const InsertForm = ({ onInsert, disabled }) => {
    const [inputValue, setInputValue] = useState("");
    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        if (typeof onInsert == "function")
            onInsert(inputValue);
        setInputValue("");
        }, [onInsert, inputValue]);

     
    return (
        <form onSubmit={handleSubmit} style = {{
            backgroundColor: "#ffffff", 
            borderRadius: 16,
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <input value={inputValue} onChange={(event) => {
                setInputValue(event.target.value);
            }} style={{
                flex: 1,
                border: "none",
                color: "#000000",
                padding: "6px 12px",
                backgroundColor: "transparent"
            }} disabled={disabled}/>
            <button type="submit" style={{
                border: "none",
                borderRadius: 16,
                backgroundColor: "#3ab6bc",
                color: "#ffffff",
                cursor: "pointer",
                padding: "8px 16px"
            }}>등록</button>
        </form>  
    )
}

export default InsertForm;

/*
const InsertForm = ({ onInsert }) => {
    onInsert라는 이벤트 핸들러 함수를 props로 전달받고 있다

const [inputValue, setInputValue] = useState("");
    state 선언

const handleSubmit = (event) => {
    event.preventDefault();
    if(typeof onInsert == "function")
        onInsert(inputValue);
    setInputValue("");
}
    html의 form은 submit 되면 새로고침이 일어나는데, 이것을 먼저 멈춘다
    onInsert 함수가 존재한다면 inputValue를 매개변수로 주고 실행한다
    inputValue를 ""로 바꾼다
<form onSubmit={handleSubmit}>
    form 에 이벤트 핸들러를 등록한다
borderRadius: 16
    모서리를 둥글게 깎는다
    16px 만큼이다

<input value={inputValue} onChange={(event) => {
    setInputValue(event.target.value);
}}/>
    익명함수로 이벤트 핸들러 등록

<button type="submit">등록</button>
    form 안에서는 버튼마다 type을 지정하는 것이 좋다

*/