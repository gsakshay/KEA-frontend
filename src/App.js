import logo from './logo.svg';
import './App.css';
import Checkout from './components/Checkout';
import { BrowserRouter, Route, Redirect, Switch, useHistory } from "react-router-dom";
import Welcome from './components/Welcome';
import HallTicket from './components/HallTicket'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Welcome}></Route>
          <Route exact path='/register' component={Checkout}></Route>
          <Route exact path='/hallticket' component={HallTicket}></Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
