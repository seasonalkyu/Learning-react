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
Router v5
React Router의 render와 component
https://zereight.tistory.com/976
  <Route path="/dashboard" component="{Dashboard}" />
Route 태그에서 내가 원하는 URI로 이동하면 어떤 컴포넌트를 렌더링할 것인가를 정할 수 있다
  <Route 
    path="/dashboard" 
    component={() => <Dashboard isAuthed="{true}" />} 
    />
위와 같이 코딩하여 <Dashboard>에 prop을 넘길 수 있다
그런데 컴포넌트를 렌더링할 때마다 unmount 후 새로운 컴포넌트를 마운팅하는 것이므로 
component에 function을 넘기는 것은 추천되지 않는다
따라서 render를 사용한다
    <Route 
    path="/dashboard" 
    render={props => <Dashboard {...props} isAuthed="{true}" />} />
reder는 불필요하게 컴포넌트를 재마운트하지 않는다


https://nyang-in.tistory.com/228
  function App() {
    return (
      <BrowserRouter>
          <Route path="/home" render={() => <Home />} />
          <Route path="/profile" render={() => <Profile />} />
      </BrowserRouter>
    );
  }
위 방식은 reder에 prop을 전달할 수 없다
  function App() {
    return (
      <BrowserRouter>
        <Route path="/home" render={(props) => <Home {...props}/>} />
        <Route path="/profile" render={(props) => <Profile {...props}/>} />
      </BrowserRouter>
   );
  }
위 방식으로 render에 prop을 전달한다
*/

/*
<Router>
    <Switch>
        <Route exact path="/">
            <Portfolio />
        </Route>
        <Route path="/login">
            <LoginForm />
        </Route>
        <Route path="/register" component={Register} />
        <Redirect to="/notfound" />
    </Switch>
</Router>
SPA 라우팅에 걸러지지 않는 링크는 Redirect를 사용했지만 path"*"
를 이용해서 ~/, ~/login, ~/register 중 하나가 아니라면 /notfound로 이동하도록 코딩
<Router>
    <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
</Router>
*/