import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { postLoginApi } from '../../Api/api';

const LoginWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eaecea;
`;
const Title = styled.h1`
  margin-bottom: 50px;
`;
const LoginInput = styled.input`
  width: 300px;
  margin: 10px;
  padding: 10px;
`;
const Button = styled.button`
  width: 300px;
  margin: 30px;
  padding: 10px;
  font-size: 15px;
  background-color: black;
  color: white;
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isCheckValid = email.includes('@') && password.length >= 8;

  const onLoginHandler = (e) => {
    e.preventDefault();
    try {
      postLoginApi({ email, password })
        .then((response) => {
          window.localStorage.setItem('token', response.data.access_token);
          navigate('/');
        })
        .catch((error) => alert(error.response.data.message));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LoginWrapper>
        <Title>로그인</Title>
        <p>이메일</p>
        <LoginInput
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="이메일을 입력하세요"
        />
        <p>비밀번호</p>
        <LoginInput
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="비밀번호를 입력하세요"
        />
        <Button type="submit" onClick={onLoginHandler} disabled={!isCheckValid}>
          로그인
        </Button>
        <Link to="/signup">회원가입</Link>
      </LoginWrapper>
    </>
  );
};

export default Login;
