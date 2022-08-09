import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserDetail from './UserDetail';
import * as authAPI from '../service/auth';
const WrappedUserDetail = styled(UserDetail)`
  & + & {
    margin-top: 12px;
  }
`;

// 유저 정보를 받아온 정보를 UserDetail에 넘겨 화면에 출력하세요.
// 데이터가 로딩 중인 경우 유저 정보를 불러오고 있다는 안내문을 띄웁니다.
export default function BitcoinApp() {
  const [users, setUsers] = useState(undefined);

  useEffect(() => {
    authAPI.getUsers().then(setUsers);
  }, []);

  return (
    <div>
      {!users ? (
        <div>유저 정보를 로딩중입니다.</div>
      ) : (
        users.map(user => (
          <WrappedUserDetail
            email={user.email}
            bitcoinAddress={user.bitcoinAddress}
            bitcoinBalance={user.bitcoinBalance}
          />
        ))
      )}
    </div>
  );
}

/*
scss 선택자
https://velog.io/@nowod_it/React-Styled-Components%EC%9D%98-Ampersand-%EC%9D%98%EB%AF%B8
*/
/*
useEffect() 란
https://cocoon1787.tistory.com/796
*/