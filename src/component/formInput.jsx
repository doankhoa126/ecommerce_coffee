// MyForm.js

import React from 'react';
import { Box, TextField } from '@mui/material';

const MyForm = ({ id, name, label, value, onChange, type }) => {
  const [error, setError] = React.useState(false); // State to manage error state

  const handleBlur = (event) => {
    setError(event.target.value === '');
  };

  return (
    <Box component="form" sx={{ width: '100%' }} onSubmit={(e) => e.preventDefault()}>
      <TextField
        required
        id={id}
        name={name}
        value={value}
        label={label}
        type={type}
        variant="outlined"
        fullWidth
        error={error}
        onBlur={handleBlur}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={onChange}
        sx={{
          '& input': {
            color: 'black',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'black',
            },
            '&:hover fieldset': {
              borderColor: 'green',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'green',
            },
            '&.Mui-error fieldset': {
              borderColor: 'red',
            },
            color: 'green',
          },
          '& .MuiInputLabel-root': {
            color: 'black',
          },
          '& .MuiFormLabel-root.Mui-focused': {
            color: 'green',
          },
          '& .MuiFormLabel-root.Mui-error': {
            color: 'red',
          },
        }}
      />
    </Box>
  );
};

export default MyForm;
