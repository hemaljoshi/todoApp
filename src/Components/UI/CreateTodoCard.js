import React, { Fragment } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const CreateTodoCard = (props) => {
  return (
    <Fragment>
      <Box sx={{ display: 'grid', justifyContent: 'center' }}>
        <Typography
          variant='h5'
          component='h5'
          color='primary'
          sx={{ borderBottom: 2 }}
        >
          {!props.isUpdate ? 'Create Todo' : 'Update Todo'}
        </Typography>
      </Box>
      <Box sx={{ display: 'grid', justifyContent: 'center' }}>
        {props.children}
      </Box>
    </Fragment>
  );
};

export default CreateTodoCard;
