import React from 'react';
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Box,
  Paper,
} from '@mui/material';
import CreateTodoCard from './UI/CreateTodoCard';

const TodoForm = (props) => {
  const {
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
  } = props;

  return (
    <Grid item xs={4}>
      <Paper
        elevation={2}
        sx={{
          padding: 2,
        }}
        xs={3}
      >
        <CreateTodoCard isUpdate={isUpdate}>
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
        </CreateTodoCard>
        <Box sx={{ dislay: 'inline-block', marginX: 8 }}>
          {!isUpdate && (
            <Button
              variant='contained'
              sx={{ marginX: 1 }}
              onClick={onSubmitHandler}
            >
              Submit
            </Button>
          )}
          {isUpdate && (
            <Button
              variant='contained'
              sx={{ marginX: 1 }}
              onClick={onUpdateHandler}
            >
              update
            </Button>
          )}
          <Button
            variant='contained'
            sx={{ marginX: 1 }}
            onClick={onCancelHandler}
            color='error'
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default TodoForm;
