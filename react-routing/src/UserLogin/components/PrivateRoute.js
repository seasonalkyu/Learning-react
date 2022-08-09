import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children: Component, ...props }) {
  const location = useLocation();
  return (
    <Route
      {...props}
      render={(componentProps) => {
        // location.state가 없으면, /login 페이지로 이동합니다.
        const isLoggedIn = !!location.state.user;

        if (!isLoggedIn) {
          return <Navigate to="/login" />;
        }

        return Component;
      }}
    />
  );
}

export default PrivateRoute;

/*
Router v5
private router 구현 
https://kimchanjung.github.io/programming/2020/06/24/react-router-private-router/
인증 및 부여된 권한 등급에 따라서 메뉴의 노출 및 접근이 제한
  import { Route, Redirect } from 'react-router';

  const PrivateRoute = ({component: Component, ...parentProps}) => {
    return (
      <Route
        {...parentProps}
        render={props => (
          checkAuth() ? (
          <Component {...props} parentMenu={this.props.menu} />
          ) : (
          <Redirect to="/403" />
          )
        )}
      />
    );
  }

권한을 체크하여 없다면 redirect
부모로부터 받은 props에는 component를 제외한 나머지 props를 담는다
<Route {...parentProps} /> 의 스프레드 문법을 해석하면
<Route exact path="/users" ... /> 처럼 Route 컴포넌트를 사용할 때 이용하는
설정 값들을 parentProps에 모두 넣은 것
*/

/*
private Route 설명
https://forgottenknowledge.tistory.com/entry/53-MPA-SPA
조건 불충족시 다른 페이지로 이동시키기
개인 정보 페이지 등


*/