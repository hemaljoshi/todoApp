import { useEffect, useState } from 'react';
import ListTodo from './ListTodo';
import { Container, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import TodoForm from './TodoForm';

const Todo = () => {
  let [storedTodo, setStoredTodo] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Todo');
  const [id, setId] = useState(0);

  const [titleErr, setTitleerr] = useState(true);
  const [descriptionErr, setDescriptionErr] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  let [err, setErr] = useState('');

  const getData = () => {
    axios
      .get('https://todo-app-000-default-rtdb.firebaseio.com/todo.json/')
      .then((response) => {
        let data = response.data;
        let todos = [];
        for (const key in data) {
          todos.push({
            id: key,
            titleVal: data[key].titleVal,
            descriptionVal: data[key].descriptionVal,
            statusVal: data[key].statusVal,
            date: data[key].date,
          });
        }
        setStoredTodo(todos);
        console.log(todos);
      })
      .catch((error) => {
        setStoredTodo([]);
        setErr(error);
      });
  };

  const setData = (todo) => {
    var filtered = Object.filter(todo, (to) => to.id === id);
    console.log(filtered);
    axios.post(
      'https://todo-app-000-default-rtdb.firebaseio.com/todo.json',
      todo
    );
  };

  function formatDate(date) {
    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear().toString().substr(-2),
    ].join('/');
  }

  const onTitleChange = (event) => {
    setTitle(event.target.value);
    if (title.length < 3) {
      setTitleerr(true);
    } else {
      setTitleerr(false);
    }
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
    if (description.length < 3) {
      setDescriptionErr(true);
    } else {
      setDescriptionErr(false);
    }
  };

  const onStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const onEditChange = (objRow) => {
    setIsUpdate(true);
    setTitle(objRow.titleVal);
    setDescription(objRow.descriptionVal);
    setStatus(objRow.statusVal);
    setId(objRow.id);
  };

  const onUpdateHandler = () => {
    // const editedRow = {
    //   id: id,
    //   titleVal: title,
    //   descriptionVal: description,
    //   statusVal: status,
    //   date: formatDate(new Date()),
    // };

    // const arr = storedTodo;
    // const index = arr.findIndex((todo) => todo.id === editedRow.id);
    // arr[index].titleVal = editedRow.titleVal;
    // arr[index].descriptionVal = editedRow.descriptionVal;
    // arr[index].statusVal = editedRow.statusVal;
    // arr[index].date = editedRow.date;
    // const obj = { ...arr };
    let uniquePropertyArray = Object.values(storedTodo).map((item) => {
      return item.id;
    });
    let index = uniquePropertyArray.findIndex((item) => item === id);
    console.log('Index ', index);

    let resultValue = Object.values(storedTodo)[index];
    console.log('Result Value', resultValue);

    resultValue.id = id;
    resultValue.titleVal = title;
    resultValue.descriptionVal = description;
    resultValue.statusVal = status;
    resultValue.date = formatDate(new Date());
    console.log('After Object Modification ', storedTodo);

    // console.log(obj);
    // // localStorage.setItem('todos', JSON.stringify(arr));
    // Object.assign(index, obj);
    // setStoredTodo(obj);
    // setData(obj);
    setIsUpdate(false);
    setTitle('');
    setDescription('');
    setStatus('Todo');
    console.log(err);
  };

  const onSubmitHandler = () => {
    let todo = {
      id: uuidv4(),
      titleVal: title,
      descriptionVal: description,
      statusVal: status,
      date: formatDate(new Date()),
    };

    // let todos = storedTodo || [];
    // todos = [...todos, todo];
    // localStorage.setItem('todos', JSON.stringify(todos));
    setData(todo);
    setStoredTodo(todo);
    setTitle('');
    setDescription('');
  };

  const onCancelHandler = () => {
    setIsUpdate(false);
    setTitle('');
    setDescription('');
    setStatus('Todo');
  };

  useEffect(() => {
    getData();
    setTitleerr(false);
    setDescriptionErr(false);
  }, []);

  const todoFormProps = {
    isUpdate,
    title,
    onTitleChange,
    titleErr,
    description,
    onDescriptionChange,
    descriptionErr,
    onStatusChange,
    status,
    onSubmitHandler,
    onUpdateHandler,
    onCancelHandler,
  };

  const listTodoProps = {
    storedTodo,
    setStoredTodo,
    onEditChange,
  };

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={3} marginTop={5}>
        <TodoForm {...todoFormProps} />
        <ListTodo {...listTodoProps} />
      </Grid>
    </Container>
  );
};

export default Todo;
