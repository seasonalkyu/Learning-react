import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    const submitForm = e => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

    // DetailPage로 이동하는 코드를 작성하세요.
    // v5 버전
        // history.push(`/detail?email=${email}$password=${password}`);
    // v6 버전
        navigate(`/detail?email=${email}$password=${password}`);
    // history.push({
    //   pathname: '/detail',
    //   serach: `?eamil=${email}&password=${password}`,
    // });
    };

    return (
        <div>
        <form>
            <fieldset>
            {/* <legend>Email</legend> */}
            <label htmlFor="email">Email</label>
            <input
                placeholder="Enter email."
                required
                ref={emailRef}
                id="email"
                type="email"
                name="email"
                autoComplete="off"
            />
            </fieldset>
            <fieldset>
            <label htmlFor="password">Password</label>
            <input
                required
                ref={passwordRef}
                id="password"
                type="password"
                name="password"
                placeholder="Enter password."
            />
            </fieldset>
            <button type="submit" onClick={submitForm}>
            Login
            </button>
        </form>
        </div>
    );
    }
/*
ref란?
https://chanhuiseok.github.io/posts/react-7/
    리액트에서 DOM을 선택해서 직접 접근하기 위해 ref를 사용한다
    state로만 해결할 수 없고, DOM을 직접 접근해야할 때 사용한다
    예를 들어 특정 input에 focus주기, canvas 요소에 그림 그리기 등

        const emailRef = useRef();
    useRef()로 ref 객체를 반환하여 사용한다
        <input
        placeholder="Enter email."
        required
        ref={emailRef}
        ...
    input 요소에 ref 값을 부여함
    이제 emailRef.current는 이 input 요소를 가리킨다
        <input
            ref={(ref) => {
                this.myinput = ref;
            }}
        />
    위의 input 요소는 리액트 코드 내에서 this.myinput 요소로 접근이 가능해진다
    리액트 내에서 id처럼 쓰이게 된 것
예시 코드  
https://www.daleseo.com/react-refs/  
*/

/*
form 작성법
https://developer.mozilla.org/ko/docs/Learn/Forms/How_to_structure_a_web_form
    form 태그
    fieldset 태그
    legend 태그
    label 태그
    http://www.tcpschool.com/html-tag-attrs/input-autocomplete
        htmlFor 속성에 input태그의 id나 name을 적는다
    input 태그
    http://www.tcpschool.com/html-tag-attrs/input-autocomplete
        id, name attributes: label에 연결된다
        require attribute: 폼 데이터가 서버로 제출되기 전에 반드시 채워져 있어야함을 명시
        autocomplete 속성
            on이면 자동완성 기능을 사용함. 사용자가 이전에 입력했던 값들을 기반으로
            사용자가 입력한 값과 비슷한 값들을 드롭다운 옵션으로 보여준다
*/
/*
버튼 태그에 preventDefault() 를 하는 이유
https://studyingych.tistory.com/27
html에서 a태그나 submit 태그는 고유의 동작으로 페이지를 이동시키거나, form 안에 input등을 전송하는 동작이 있는데 e.preventDefault()는 그 동작을 중지시키는 역할을 한다.
input 또는 button 클릭 이벤트가 발생 했을때 페이지가 리로드가 되는데 그 현상을 막아줌
*/

/*
useNavigate
https://reactrouter.com/docs/en/v6/components/navigate
https://basemenks.tistory.com/278
    특정 event가 발생할 때 url을 조작할 수 있는 interface 제공
        <button onClick={() => navigate(-2)}>Go 2 pages back</button>
    이런식으로도 사용 가능하다
*/