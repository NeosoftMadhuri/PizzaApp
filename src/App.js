
import './App.css';
import Index from './Components/Index'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import PageNotFound from './Components/PageNotFound';
import Profile from './Components/Profile';
import Registration from './Components/Registration';
import Dashboard from './Components/Dashboard';
import ShippingCart from './Components/ShippingCart';
import order from './Components/order';
import Allorder from './Components/Allorder';
function App() {
  return (
    <>
      {/* <Index/>
      <Registration/> */}
      {/* <Dashboard/> */}
      <Router>
          <Switch>
              <Route path="/" exact component={Index}/>
              <Route path="/register" component={Signup}/>
              <Route path="/login" component={Login}/>
              <Route path="/home" component={Home}/>
              <Route path="/profile" component={Profile}/>
              <Route path="/shoppingcart" component={ShippingCart}/>
              <Route path="/order" component={order}/>
              <Route path="/allorder" component={Allorder}/>
              {/* <Route path="/*" component={PageNotFound}/> */}
          </Switch>
      </Router>
    </>
  );
}

export default App;
