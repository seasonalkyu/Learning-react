import React from 'react';
// 필요한 모듈을 추가로 import하세요.
import {
    Routes,
    BrowserRouter,
    Route,
    Link,
    useLocation,
    Navigate,
} from 'react-router-dom';
import LoginForm from './LoginForm';

export default function UserLogin() {
    return (
        <BrowserRouter>
        <Routes>
            {/* {' '} */}
            {/* <Route exact path="/"> */}
            {/* <HomePage /> */}
            {/* {' '} */}
            {/* </Route> */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/detail" element={<UserDetailPage />} />
            
            
        </Routes>
        </BrowserRouter>
    );
}

// HomePage 페이지 컴포넌트 구현
function HomePage() {
  return (
    <div>
      <h2>Home Page</h2>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

// LoginPage 페이지 컴포넌트를 구현하세요.
function LoginPage() {
  return (
    <div>
      <h2>Login Page</h2>
      <LoginForm />
      <div>
        <Link to="/">Back to home</Link>
      </div>
    </div>
  );
}

// DetailPage 페이지 컴포넌트를 구현하세요.
function UserDetailPage() {
  // email, password 정보를
  // query param 으로 받아와 저장하고, 정보를 보여주세요.
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const password = searchParams.get('password');

  if (!email || !password) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <h2>User Detail Page</h2>
      <p>
        <h3>User details</h3>
        <em>{email}</em>
        <br />
        <strong>{password}</strong>
      </p>
      {/* Link tag를 추가하세요. */}
      <Link to="login">Logout</Link>
    </div>
  );
}

/*
https://velog.io/@kwonh/React-react-router-dom-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0
BrowserRouter
    history API를 사용해서 URL과 UI를 동기화

Routes
Switch가 Routes로 변경되었다
exact 옵션이 삭제되고 기본으로 exact가 적용된다
path를 상대경로로 지정한다

Route
컴포넌트의 속성에 설정된 URL과 현재 경로가 일치하면 
해당하는 컴포넌트와 함수를 렌더링

Link
to 속성에 설정된 링크로 이동
기록이 history 스택에 저장
클릭 시 이동하는 url을 지정한다

Switch
자식 컴포넌트인 Route 또는 Redirect 중 매치되는 첫 번째 요소를 렌더링
BrowserRouter와 다르게 하나의 매칭되는 요소 중 하나만 렌더링
v6 부터 Routes로 통합

Redirect
v6부터 Routes로 통합
*/

/*
useLocation()
https://reactrouter.com/docs/en/v6/hooks/use-location


*/