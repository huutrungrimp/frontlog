import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export default function StartDateTime() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-07'));
  console.log(dayjs(value).format('YYYY-MM-DD, HH:mm A'))
  // console.log(value)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} sx={{ mr: 3, my: 3 }} />}
        label="Date & Time for Start"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
