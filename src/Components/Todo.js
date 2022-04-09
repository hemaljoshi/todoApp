import { useEffect, useState } from 'react';
import ListTodo from './ListTodo';
import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from '@mui/material';
import CreateTodoCard from './UI/CreateTodoCard';
import { v4 as uuidv4 } from 'uuid';

const Todo = () => {
  let [storedTodo, setStoredTodo] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Todo');
  const [titleErr, setTitleerr] = useState(true);
  const [descriptionErr, setDescriptionErr] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState(0);

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
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

  const onEditChange = (objRow) => {
    setIsUpdate(true);
    setTitle(objRow.titleVal);
    setDescription(objRow.descriptionVal);
    setStatus(objRow.statusVal);
    setId(objRow.id);
  };

  const onUpdateHandler = () => {
    const editedRow = {
      id: id,
      titleVal: title,
      descriptionVal: description,
      statusVal: status,
      date: formatDate(new Date()),
    };
    const arr = JSON.parse(localStorage.getItem('todos'));
    const index = arr.findIndex((todo) => todo.id === editedRow.id);
    arr[index].titleVal = editedRow.titleVal;
    arr[index].descriptionVal = editedRow.descriptionVal;
    arr[index].statusVal = editedRow.statusVal;
    arr[index].date = editedRow.date;
    setStoredTodo(arr);
    localStorage.setItem('todos', JSON.stringify(arr));
    setIsUpdate(false);
    setTitle('');
    setDescription('');
    setStatus('Todo');
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

  const onSubmitHandler = () => {
    let todo = {
      id: uuidv4(),
      titleVal: title,
      descriptionVal: description,
      statusVal: status,
      date: formatDate(new Date()),
    };

    let todos = storedTodo || [];
    todos = [...todos, todo];
    localStorage.setItem('todos', JSON.stringify(todos));
    setStoredTodo(todos);
    setTitle('');
    setDescription('');
  };

  useEffect(() => {
    setTitleerr(false);
    setDescriptionErr(false);
  }, []);

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={3} marginTop={5}>
        <CreateTodoCard>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <TextField
              variant='outlined'
              label='Title'
              sx={{ margin: 2 }}
              value={title}
              onChange={onTitleChange}
              helperText={titleErr && 'Title should greater than 4 character'}
              error={titleErr}
            ></TextField>
            <TextField
              multiline
              maxRows={4}
              variant='outlined'
              label='Description'
              sx={{ margin: 2 }}
              value={description}
              onChange={onDescriptionChange}
              helperText={
                descriptionErr && 'Description should greater than 4 character'
              }
              error={descriptionErr}
            ></TextField>
            <FormControl sx={{ m: 2, minWidth: 80 }}>
              <InputLabel id='status'>Status</InputLabel>
              <Select
                labelId='status'
                defaultValue={'Todo'}
                id='status-select'
                onChange={onStatusChange}
                label='Status'
                value={status}
              >
                <MenuItem value={'Todo'}>Todo</MenuItem>
                <MenuItem value={'In Progress'}>In Progress</MenuItem>
                <MenuItem value={'Completed'}>Completed</MenuItem>
              </Select>
            </FormControl>
          </FormControl>
          {!isUpdate && (
            <Button
              variant='contained'
              sx={{ marginX: 10 }}
              onClick={onSubmitHandler}
            >
              Submit
            </Button>
          )}
          {isUpdate && (
            <Button
              variant='contained'
              sx={{ marginX: 10 }}
              onClick={onUpdateHandler}
            >
              update
            </Button>
          )}
        </CreateTodoCard>
        <Grid item xs={8}>
          <ListTodo
            toDos={storedTodo}
            setTodo={setStoredTodo}
            onEditChange={onEditChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Todo;
