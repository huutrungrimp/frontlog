import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { deleteCustomer } from './customerSlice';
import { Stack, Button, Box, Typography } from '@mui/material';


export default function DeleteCustomer() {

  const id = useParams().id;

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onClick = (event: React.MouseEvent) => {

    dispatch(deleteCustomer(id));
    setTimeout(() => {
      document.location.reload();
    }, 500);
    navigate(-1)

  }

  return (
    <div className='financeContent gx-0'>
      <Box className='py-3 bg-light' sx={{ maxWidth: '500px', boxShadow: { xs: 3, md: 12 }, borderRadius: 4 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 'bold', marginBottom: 2, textAlign: 'center' }}>Are you sure to delete the customer?</Typography>
        <Stack spacing={2} direction="row" justifyContent="center">
          <Button sx={{ minWidth: '20px' }} variant="contained" onClick={() => { navigate(-1) }}>Cancel</Button>
          <Button sx={{ minWidth: '50px' }} variant="contained" onClick={onClick}>Yes</Button>
        </Stack>
      </Box>
    </div>
  )
}
