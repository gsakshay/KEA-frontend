import React, { useState, useEffect, useReducer } from 'react';
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
import { axiosGet, axiosPost } from "../config/axiosClient"

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
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
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

const steps = ['Student details', 'Parents details', 'Payment details'];

const initialState = {
  rollNumber: "",
  name: "",
  age: "",
  aadhaarNumber: "",
  dob: "",
  boardId: "",

  pName: "",
  pAge: "",
  pAadhaarNumber: "",
  phno: "",
  relation: "",

  type: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "rollNumber":
      return { ...state, rollNumber: action.value };
    case "name":
      return { ...state, name: action.value };
    case "age":
      return { ...state, age: action.value };
    case "aadhaarNumber":
      return { ...state, aadhaarNumber: action.value };
    case "dob":
      return { ...state, dob: action.value };
    case "type":
      return { ...state, type: action.value };
    case "pName":
      return { ...state, pName: action.value };
    case "pAge":
      return { ...state, pAge: action.value };
    case "pAadhaarNumber":
      return { ...state, pAadhaarNumber: action.value };
    case "phno":
      return { ...state, phno: action.value };
    case "relation":
      return { ...state, relation: action.value };
    case "boardId":
      return { ...state, boardId: action.value };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const [data, dispatch] = useReducer(reducer, initialState);

  const [parentId, setParentID] = useState("")
  const [paymentId, setPaymentId] = useState("")
  const [centerId, setCenterId] = useState("")
  const [hallTicket, setHallTicket] = useState("")

  const [registrationCompleted, setRegistrationCompleted] = useState(false)

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm data={data} dispatch={dispatch} />;
      case 1:
        return <PaymentForm data={data} dispatch={dispatch} />;
      case 2:
        return <Review data={data} dispatch={dispatch} />;
      default:
        throw new Error('Unknown step');
    }
  }


  const history = useHistory()

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const register = () => {
    axiosPost('parent/add', {
      name: data.pName,
      age: data.pAge,
      aadhaarNumber: data.pAadhaarNumber,
      phno: data.phno,
      relation: data.relation
    })
      .then(res => {
        if (res.status === 200) {
          setParentID(res?.data?.parent?.aadhaarNumber)
          addPayment(res?.data?.parent?.aadhaarNumber)
          console.log(res?.data?.parent?.aadhaarNumber, "pid")
        }
      })
      .catch(err => console.log(err))

  }

  const addPayment = (pId) => {
    axiosPost('payment/add', {
      type: data.type
    })
      .then(res => {
        if (res.status === 200) {
          console.log(res.data)
          setPaymentId(res?.data?.payment?.id)
          console.log(res?.data?.payment?.id, "payid")
          getExamCenters(res?.data?.payment?.id, pId)
        }
      })
      .catch(err => console.log(err))
  }

  const getInvigilators = () => {
    axiosGet(`invigilators`)
      .then(res => {
        if (res.status === 200) {
          console.log(res?.data[Math.floor(Math.random() * Math.floor(res?.data?.length))])
        }
      })
      .catch(err => console.log(err, "there is an error"))
  }

  const getExamCenters = (payId, pId) => {
    axiosGet(`exam_center`)
      .then(res => {
        if (res.status === 200) {
          setCenterId()
          getHallTicket(res?.data[Math.floor(Math.random() * Math.floor(res?.data?.length))]?.id, payId, pId)
        }
      })
      .catch(err => console.log(err, "there is an error"))
  }

  const getHallTicket = (cId, payId, pId) => {
    axiosGet(`hall_ticket`)
      .then(res => {
        if (res.status === 200) {
          setHallTicket(res?.data?.hallTicket?.ticket_number)
          setTimeout(() => {
            registerStudent(res?.data?.hallTicket?.ticket_number, cId, payId, pId)
          }, 500);
        }
      })
      .catch(err => console.log(err, "there is an error"))
  }

  const registerStudent = (hId, cId, payId, pId) => {
    axiosPost(`student`, {
      rollNumber: data.rollNumber,
      name: data.name,
      age: data.age,
      aadhaarNumber: data.aadhaarNumber,
      dob: data.dob,
      parentId: pId,
      centerId: cId,
      hallTicket: hId,
      paymentId: payId,
      boardId: data.boardId
    })
      .then(res => {
        if (res.status === 200) {
          setRegistrationCompleted(true)
        }
      })
      .catch(err => console.log(err))
  }

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
          <Typography component="h1" variant="h4" align="center">
            Student Registration
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {registrationCompleted ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Registration Successfull
                </Typography>
                <Typography variant="subtitle1">
                  Please collect the hall ticket and be ready at the center 1 hour before.
                </Typography>
                <Button onClick={() => history.push("/hallticket")} className={classes.button} color="primary">
                  Get hallticket
                  </Button>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}

                    {activeStep === steps.length - 1 ? <Button
                      variant="contained"
                      color="primary"
                      onClick={register}
                      className={classes.button}
                    >Register</Button> : <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >Next</Button>}

                  </div>
                </React.Fragment>
              )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}