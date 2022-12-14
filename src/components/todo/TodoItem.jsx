import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { updateTodoApi, deleteTodoApi } from '../../Api/api';

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
`;
const TodoItemInput = styled.input`
  width: 300px;
  height: 50px;
  font-size: 15px;
  margin-right: 10px;
`;
const Text = styled.div`
  flex: 1;
  font-size: 21px;
  width: 300px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;
const TodoItemCheckbox = styled.input`
  width: 30px;
  height: 50px;
  margin-right: 10px;
`;
const Button = styled.button`
  width: 50px;
  height: 50px;
  padding: 5px;
  margin: 3px;
  font-size: 15px;
  color: white;
  background-color: #159f5d;
  border: none;
  cursor: pointer;
`;
const DeleteButton = styled.button`
  width: 50px;
  height: 50px;
  padding: 5px;
  margin: 3px;
  font-size: 15px;
  color: white;
  background-color: #ed1212;
  border: none;
  cursor: pointer;
`;
const TodoItem = ({ id, todo, isCompleted, setIsDeleted }) => {
  const token = window.localStorage.getItem('token');
  const [editTodoInput, setEditTodoInput] = useState(todo);
  const [isDoneTodo, setIsDoneTodo] = useState(isCompleted);
  const [isEditTodo, setIsEditTodo] = useState(false);

  const checkboxHandler = (e) => {
    setIsDoneTodo(e.target.checked);
  };
  const onEditTodoHandler = () => {
    setIsEditTodo(true);
  };
  const onCancelHandler = () => {
    setIsEditTodo(false);
    setEditTodoInput(todo);
  };
  const onUpdateTodoHandler = () => {
    try {
      updateTodoApi(id, { todo: editTodoInput, isCompleted: isDoneTodo }, token)
        .then((responese) => {
          setIsEditTodo(false);
          setIsDeleted(true);
          console.log(responese);
        })
        .catch((error) => alert(error.response.data.message));
    } catch (error) {
      console.log(error);
    }
  };
  const onDeletehandler = () => {
    try {
      deleteTodoApi(id, token)
        .then((response) => setIsDeleted(true))
        .catch((err) => alert(err.response.data.message));
    } catch (error) {
      console.log(error);
    }
  };

  if (isEditTodo) {
    return (
      <TodoItemWrapper>
        <TodoItemCheckbox
          type="checkbox"
          defaultChecked={isDoneTodo}
          onChange={checkboxHandler}
        />
        <TodoItemInput
          type="text"
          value={editTodoInput}
          onChange={(e) => {
            setEditTodoInput(e.target.value);
          }}
        />
        <Button type="button" onClick={onUpdateTodoHandler}>
          완료
        </Button>
        <DeleteButton type="button" onClick={onCancelHandler}>
          취소
        </DeleteButton>
      </TodoItemWrapper>
    );
  } else {
    return (
      <TodoItemWrapper>
        <TodoItemCheckbox
          type="checkbox"
          onChange={checkboxHandler}
          defaultChecked={isDoneTodo}
        />
        <Text className={isDoneTodo ? 'line-through' : undefined}>
          {editTodoInput}
        </Text>
        <Button type="button" onClick={onEditTodoHandler}>
          수정
        </Button>
        <DeleteButton type="button" onClick={onDeletehandler}>
          삭제
        </DeleteButton>
      </TodoItemWrapper>
    );
  }
};

export default TodoItem;
