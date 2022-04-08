import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

const CreateTodoCard = (props) => {
  return (
    <Grid item xs={4}>
      <Paper
        elevation={2}
        sx={{
          padding: 2,
        }}
        xs={3}
      >
        <Box sx={{ display: 'grid', justifyContent: 'center' }}>
          <Typography
            variant='h5'
            component='h5'
            color='primary'
            sx={{ borderBottom: 2 }}
          >
            Create Todo
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', justifyContent: 'center' }}>
          {props.children}
        </Box>
      </Paper>
    </Grid>
  );
};

export default CreateTodoCard;
