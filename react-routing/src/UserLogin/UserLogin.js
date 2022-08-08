import React, { useState } from 'react';
import {
  Link,
  BrowserRouter,
  Route,
  useLocation,
  Navigate,
  Routes,
  useNavigate,
} from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const users = [{email: "a@a.com", password: "1234"}];

// '/register' path를 추가하세요.
export default function UserLogin() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/detail" element={<UserDetailPage/>}/>
        <Route path="/register" element={<RegisterPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

function HomePage() {
  return (
    <div>
      <h2>Welcome to my homepage.</h2>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

// users 리스트에 등록된 회원인 경우에만 회원의 상세한 정보를 띄우는 코드를 작성하세요.
function LoginPage() {
    const navigate = useNavigate();
  const handleSubmit = formData => {
    const { email, password } = formData;
    const foundUser = users.find(
      user => user.email === email && user.password === password
    );

    //     if (foundUser) {
    //       history.push(`/detail?email=${email}&password=${password}`);
    //     }
    //   };
    if (foundUser) 
        return navigate(`/detail?email=${email}&password=${password}`);
  };

  return (
    <div>
      <h2>Login Page</h2>
      <LoginForm onSubmit={handleSubmit} />
      <div>
        <ul>
          <li>
            <Link to="/">Back to home</Link>
          </li>

          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

function UserDetailPage() {
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
      <Link to="/">Logout</Link>
    </div>
  );
}

// '/register'로 이동 시 RegisterForm으로 렌더링하는 코드를 작성하세요.
function RegisterPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = formData => {
    console.log('유저를 등록하세요.');
    const { email } = formData;
    const foundUser = users.find(user => user.email === email);

    if (foundUser) {
      return setError('이미 등록된 이메일입니다.');
    }

    users.push(formData);
    navigate('/login');
  };

  return (
    <div>
      <h2>Register Page</h2>
      <RegisterForm onSubmit={handleSubmit} />
      <div>
        <ul>
          <li>
            <Link to="/">Back to home</Link>
          </li>

          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
      <div>{error}</div>
    </div>
  );
}

/*
history.push 대신 navigate 사용
https://velog.io/@hemtory/ReactHistoryPushReplaceNavigate
*/