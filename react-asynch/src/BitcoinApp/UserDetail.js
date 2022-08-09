import React from 'react';
import styled from 'styled-components';
import { colors } from '../style/colors';

export default function UserDetail({
  email,
  bitcoinAddress,
  bitcoinBalance,
  className,
}) {
  return (
    <Container className={className}>
      <Email>
        <h4>Email</h4>
        <span>{email}</span>
      </Email>

      <Bitcoin>
        <div>
          <strong className="title">Bitcoin Address</strong>
          <span className="content">{bitcoinAddress}</span>
        </div>

        <div>
          <strong className="title">Bitcoin Balance</strong>
          <span className="content">{bitcoinBalance} BTC</span>
        </div>
      </Bitcoin>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.pink0};

  width: 500px;
  padding: 24px;

  border-radius: 10px;
`;

const Email = styled.div`
    display: flex;

    h4 {
        margin: 0;
        font-size: 18px;
        font-weight: bold;
        width: 120px;
    }

    span {
        font-size: 14px;
        align-self: flex-end;
    }
`;

const Bitcoin = styled.div`
    .title {
        display: inline-block;
        width: 120px;

        font-size: 14px;
        color: ${colors.pink5};
    }

    .content {
        font-size: 12px;
        color: ${colors.pink9};
    }
`;