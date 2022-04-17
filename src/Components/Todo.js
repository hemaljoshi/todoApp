import { useEffect, useState } from 'react';
import ListTodo from './ListTodo';
import { Container, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import TodoForm from './TodoForm';
import { db } from '../firebase';
import { set, ref, onValue, update } from 'firebase/database';

const Todo = () => {
  let [storedTodo, setStoredTodo] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Todo');
  const [id, setId] = useState(0);

  const [titleErr, setTitleerr] = useState(true);
  const [descriptionErr, setDescriptionErr] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

  const getData = () => {
    onValue(ref(db), (snapshot) => {
      if (snapshot.exists()) {
        const response = snapshot.val();
        const data = response.todo;
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
      } else {
        setStoredTodo([]);
      }
    });
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
    update(ref(db, `todo/${id}`), {
      titleVal: title,
      descriptionVal: description,
      statusVal: status,
      date: formatDate(new Date()),
    });
    setIsUpdate(false);
    setTitle('');
    setDescription('');
    setStatus('Todo');
  };

  const onSubmitHandler = () => {
    const uuid = uuidv4();
    set(ref(db, `todo/${uuid}`), {
      id: uuid,
      titleVal: title,
      descriptionVal: description,
      statusVal: status,
      date: formatDate(new Date()),
    });
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
    getData,
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
