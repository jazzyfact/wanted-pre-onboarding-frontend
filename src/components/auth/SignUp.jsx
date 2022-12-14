import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { postSignUpApi } from '../../Api/api';

const SignInWrapper = styled.div`
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
const SignInInput = styled.input`
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

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isCheckValid = email.includes('@') && password.length >= 8;

  const onSingUpHandler = (e) => {
    e.preventDefault();
    try {
      postSignUpApi({ email, password })
        .then((response) => {
          alert('회원가입 완료되었습니다');
          window.localStorage.setItem('token', response.data.access_token);
          navigate('/login');
        })
        .catch((error) => alert(error.response.data.message));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SignInWrapper>
      <Title>회원가입</Title>
      <p>이메일</p>
      <SignInInput
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="이메일을 입력하세요"
      />
      <p>비밀번호</p>
      <SignInInput
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="비밀번호를 입력하세요"
      />
      <Button type="submit" onClick={onSingUpHandler} disabled={!isCheckValid}>
        회원가입
      </Button>
    </SignInWrapper>
  );
};

export default SignUp;
