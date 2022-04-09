import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

const TableCom = (props) => {
  const rows = props.rows;

  const onDeleteHandle = (id) => {
    const filtered = rows.filter((row) => {
      return row.id !== id;
    });
    localStorage.setItem('todos', JSON.stringify(filtered));
    props.setStoredTodo(filtered);
  };

  const onEditHandle = (row) => {
    console.log(row.id);
    return props.onEditChange(row);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='ToDo'>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align='right'>Date</TableCell>
            <TableCell align='center'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.titleVal}
              </TableCell>
              <TableCell>{row.descriptionVal}</TableCell>
              <TableCell>{row.statusVal}</TableCell>
              <TableCell align='right'>{row.date}</TableCell>
              <TableCell align='center'>
                <IconButton onClick={() => onEditHandle(row)} color='secondary'>
                  <EditTwoToneIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDeleteHandle(row.id)}
                  color='error'
                >
                  <DeleteTwoToneIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCom;
