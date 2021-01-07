import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

export default function Review({ data, dispatch }) {
  const classes = useStyles();

  const paymentDetails = ['Net banking', 'Online wallets', 'DD']

  const [paymentMethod, setPaymentMethod] = useState()

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payments details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Method</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={paymentMethod}
              onChange={(event) => {
                setPaymentMethod(event.target.value)
                dispatch({ type: "type", value: event.target.value })
              }}
            >
              {
                paymentDetails.map(paymentMethod => <MenuItem key={paymentMethod} value={paymentMethod}>{paymentMethod}</MenuItem>)
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}