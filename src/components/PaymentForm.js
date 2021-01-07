import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function PaymentForm({ data, dispatch }) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Parents details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <TextField
                        required
                        value={data.pName}
                        onChange={(event) => dispatch({ type: "pName", value: event.target.value })}
                        id="name"
                        name="name"
                        label="Name"
                        fullWidth
                        autoComplete="given-name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={data.phno}
                        onChange={(event) => dispatch({ type: "phno", value: event.target.value })}
                        id="phno"
                        name="phno"
                        label="Phone Number"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={data.relation}
                        onChange={(event) => dispatch({ type: "relation", value: event.target.value })}
                        id="relation"
                        name="relation"
                        label="Relation"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={data.pAge}
                        onChange={(event) => dispatch({ type: "pAge", value: event.target.value })}
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
                        value={data.pAadhaarNumber}
                        onChange={(event) => dispatch({ type: "pAadhaarNumber", value: event.target.value })}
                        id="aadhaar"
                        name="aadhhaar"
                        label="Aadhaar number"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}