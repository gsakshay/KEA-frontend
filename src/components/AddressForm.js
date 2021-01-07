import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { axiosGet, axiosPost } from "../config/axiosClient"


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));




export default function AddressForm({ data, dispatch }) {

  const [boardSelected, setBoardSelected] = useState("")
  const [boards, setBoards] = useState("")

  const classes = useStyles()

  const getBoards = () => {
    axiosGet(`kea_board`)
      .then(res => {
        if (res.status === 200) {
          setBoards(res.data)
          console.log(res.data)
        }
      })
      .catch(err => console.log(err, "there is an error"))
  }

  useEffect(() => {
    getBoards()
  }, [])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Student details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <TextField
            required
            value={data.name}
            onChange={(event) => dispatch({ type: "name", value: event.target.value })}
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            value={data.rollNumber}
            onChange={(event) => dispatch({ type: "rollNumber", value: event.target.value })}
            id="rollno"
            name="rollno"
            label="Roll Number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={data.age}
            onChange={(event) => dispatch({ type: "age", value: event.target.value })}
            type="number"
            id="age"
            name="age"
            label="Age"
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={data.aadhaarNumber}
            onChange={(event) => dispatch({ type: "aadhaarNumber", value: event.target.value })}
            id="aadhaar"
            name="aadhhaar"
            label="Aadhaar number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <form className={classes.container} noValidate>
                <TextField
                  id="date"
                  label="Date of birth"
                  type="date"
                  onChange={(event) => dispatch({ type: "dob", value: event.target.value })}
                  value={data.dob}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </Grid>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Board</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.boardId}
                onChange={(event) => {
                  setBoardSelected(event.target.value)
                  dispatch({ type: "boardId", value: event.target.value })
                }}
              >
                {
                  boards?.length && boards?.map(board => <MenuItem key={board?.id} value={board?.id}>KEA board</MenuItem>)
                }
              </Select>
            </FormControl>
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}