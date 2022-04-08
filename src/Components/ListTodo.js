import { Paper, Typography, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'date', headerName: 'Date', width: 90 },
  {
    field: 'titleVal',
    headerName: 'Title',
    width: 130,
    editable: true,
  },
  {
    field: 'descriptionVal',
    headerName: 'Description',
    width: 345,
    editable: true,
  },
  {
    field: 'statusVal',
    headerName: 'Status',
    width: 95,
  },
];

export default function ListTOdo(props) {
  let rows = props.toDos;

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
          <DataGrid rows={rows} columns={columns} checkboxSelection />
        </Box>
        <Button variant='contained' sx={{ margin: 2 }}>
          Delete
        </Button>
      </Paper>
    </Box>
  );
}
