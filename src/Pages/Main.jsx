import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TodoItem from '../components/todo/TodoItem';
import { getTodosApi, postCreateTodoApi } from '../Api/api';

const CreateTodoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eaecea;
`;
const CreateTodoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-around;
  justify-items: baseline;
`;
const Title = styled.h1``;
const CreateTodoInput = styled.input`
  width: 400px;
  height: 50px;
  font-size: 15px;
  padding: 5px;
  margin: 10px;
`;
const Button = styled.button`
  width: 50px;
  height: 50px;
  padding: 10px;
  margin-bottom: 30px;
  font-size: 15px;
  color: white;
  background-color: black;
  border: none;
  cursor: pointer;
`;

const Main = () => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token');
  const [todoList, setTodoList] = useState([]);
  const [createTodo, setCreateTodo] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    try {
      setIsDeleted(false);
      if (token) {
        getTodosApi(token)
          .then((response) => setTodoList(response.data))
          .catch((error) => alert(error.response.data.message));
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onCreateTodoHandler = (e) => {
    e.preventDefault();
    try {
      postCreateTodoApi({ todo: createTodo }, token)
        .then((response) => {
          setIsDeleted(true);
          setCreateTodo('');
        })
        .catch((err) => alert(err.response.data.message));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CreateTodoContainer>
      <Title>할 일 목록</Title>
      <CreateTodoWrapper>
        <CreateTodoInput
          type="text"
          value={createTodo}
          onChange={(e) => {
            setCreateTodo(e.target.value);
          }}
        />
        <Button type="submit" onClick={onCreateTodoHandler}>
          추가
        </Button>
      </CreateTodoWrapper>

      {todoList.map((el) => {
        const { id, todo, isCompleted } = el;
        return (
          <TodoItem
            key={id}
            id={id}
            todo={todo}
            isCompleted={isCompleted}
            setIsDeleted={setIsDeleted}
          />
        );
      })}
    </CreateTodoContainer>
  );
};

export default Main;
