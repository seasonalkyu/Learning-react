import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PrivateRoute from './components/PrivateRoute';

import { registerUser, loginUser } from './service/auth';

// location.state.user 정보에 따라 페이지를 이동하는 코드를 작성하세요.
export default function UserLogin() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <PrivateRoute path="/detail" element={<UserDetailPage />}/>
      </Routes>
    </Router>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  // 로그인 기능을 구현하세요.

  const handleSubmit = formData => {
    // loginUser를 활용해 유저 정보를 검색하세요.
    // 유저 정보가 없다면, 로그인이 되지 않습니다.
    // 유저 정보를 찾으면, location.state.user에 유저 정보를 저장하고 detail page로 이동하세요.

    const foundUser = loginUser(formData);

    if (!foundUser) return;

    const locationObject = {
      pathname: '/detail',
      state: { user: foundUser },
    };

    navigate(locationObject);
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
      <div>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

function RegisterPage() {
  const navigate = useNavigate();
  // 회원가입 기능을 구현하세요.

  const handleSubmit = formData => {
    // registerUser를 활용하여 유저를 등록하세요.
    // 등록했으면 로그인 페이지로 이동하세요.
    registerUser(formData);
    navigate('/login');
  };

  return (
    <div>
      <h2>Register Page</h2>
      <RegisterForm onSubmit={handleSubmit} />
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

function UserDetailPage() {
  // 회원의 정보를 출력하는 기능을 구현하세요.
  // 유저 정보는 location.state.user에 있습니다.
  // PrivateRoute 컴포넌트는 유저 정보가 없을 경우 로그인 페이지로 사용자를 리다이렉트합니다.

  const location = useLocation();
  const user = location.state.user;

  useEmptyLocationState();

  if (!user) {
    return <Navigate to="/login" />;
  }
  const email = user.email;

  return (
    <div>
      <h2>Welcome!</h2>

      <div>
        <em>email : {email}</em>
      </div>

      <div>
        <Link to="/login">Logout</Link>
      </div>
    </div>
  );
}

// location state를 지우는 헬퍼 함수입니다.
function useEmptyLocationState() {
  const navigate = useNavigate();

  useEffect(() => {
    return () => navigate('', {replace: true});
  }, [navigate]);
}

/*
Redirect 대신 Navigate를 사용하는법
https://devalice.tistory.com/112
  // v5
  <Switch>
    <Redirect exact patch="/" to="login" />
  </Switch>

  // v6
  <Routes>
    <Route path="/" element={<Navigate replace to="/login"/>} />
  </Routes>
*/
/*
history의 push와 replace의 차이점
https://medium.com/w-bs-log/history-push%EC%99%80-replace%EC%9D%98-%EC%B0%A8%EC%9D%B4-ed5f2f7db7dc
https://velog.io/@gwak2837/React-Router-History-push%EC%99%80-replace%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90
*/


/*
history=useHistory의 replace 대신 navigate=useNavigate의 replace 쓰기
https://velog.io/@sunhwa508/%EC%A0%95%EB%A7%90-%EB%A7%8E%EC%9D%B4-%EB%B0%94%EB%80%90-react-router-v6-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%B4%9D-%EC%A0%95%EB%A6%AC
// This is a React Router v5 app
const history = useHistory();

history.push('/home');
history.replace('/home');

// This is a React Router v6 app
const navigate = useNavigate();

navigate('/home');
navigate('/home', {replace: true});
*/

/*
React 


*/