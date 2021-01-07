import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { ButtonBase } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AdmitCard from './AdmitCard'
import { axiosGet } from "../config/axiosClient"


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                KEA
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(900 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
        width: "125%"
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));


export default function HallTicket() {
    const classes = useStyles();

    const history = useHistory()

    const [rollNo, setRollNo] = useState("")
    const [details, setDetails] = useState(null);

    const getHallTicket = () => {
        axiosGet(`student/${rollNo}`)
            .then(res => {
                if (res.status === 200) {
                    setDetails(res?.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    console.log(details)

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        KEA
          </Typography>
                </Toolbar>
            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography component="h1" variant="h4" align="center">
                                Collect your hallticket
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" onClick={() => getHallTicket()} color="secondary">
                                Get hallticket
                            </Button>
                        </Grid>
                    </Grid>

                    <br></br>
                    <Grid container spacing={3}>
                        <TextField id="outlined-basic" value={rollNo} onChange={(event) => setRollNo(event.target.value)} fullWidth label="Roll Number" variant="outlined" />
                    </Grid>
                    <br></br>
                    {
                        details && <AdmitCard details={details} />
                    }
                </Paper>
                <Copyright />
            </main>
        </React.Fragment>
    );
}