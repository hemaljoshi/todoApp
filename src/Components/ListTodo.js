import { Paper, Typography, Box } from '@mui/material';
import Table from './Table';

export default function ListTOdo(props) {
  let rows = props.toDos;
  let setStoredTodo = props.setTodo;
  return (
    <Box>
      <Paper
        sx={{
          padding: 2,
        }}
        elevation={2}
      >
        <Box sx={{ display: 'grid', justifyContent: 'left', padding: 1 }}>
          <Typography
            variant='h5'
            component='h5'
            color='primary'
            sx={{
              borderBottom: 2,
            }}
          >
            ToDo's
          </Typography>
        </Box>
        <Box sx={{ height: 293, width: '100%', marginTop: 1 }}>
          <Table
            rows={rows}
            setStoredTodo={setStoredTodo}
            onEditChange={props.onEditChange}
          ></Table>
        </Box>
      </Paper>
    </Box>
  );
}
