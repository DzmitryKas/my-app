import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import SolarSystemLoading  from 'react-loading';
import {useDispatch, useSelector} from 'react-redux';

import Navbar from '../components/navBar/NavBar';
import {auth} from '../redux/actions/user';
import './App.scss';

class DynamicImport extends Component {
  state = { component: null };

  componentWillMount() {
    this.props.load().then((component) => {
      this.setState(() => ({
        component: component.default ? component.default : component,
      }));
    });
  }
  render() {
    return this.props.children(this.state.component);
  }
}

const Disk = (props) => {
  return (
    <DynamicImport load={() => import("../components/disk/Disk")}>
      {(Component) =>
        Component === null ? <SolarSystemLoading  color={"grey"} /> : <Component {...props} />
      }
    </DynamicImport>
  );
};

const Registration = (props) => {
  return (
    <DynamicImport load={() => import("./registration/Registration")}>
      {(Component) =>
        Component === null ? <SolarSystemLoading  color={"grey"} /> : <Component {...props} />
      }
    </DynamicImport>
  );
};

const Login = (props) => {
  return (
    <DynamicImport load={() => import("./registration/Login")}>
      {(Component) =>
        Component === null ? <SolarSystemLoading  color={"grey"} /> : <Component {...props} />
      }
    </DynamicImport>
  );
};

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user.isAuth);

  useEffect(() => {
    dispatch(auth());
  }, [])

  return (
    <Router>
      <div className="App" >
        <Navbar />
        <div className="wrap">
          {!isAuth ? 
              <Switch>
                <Route path='/registration' component={Registration}/>
                <Route path='/login' component={Login}/>
                <Redirect to='/login' /> 
              </Switch>
              :
              <Switch>
                <Route exact path='/' component={Disk} />
                <Redirect to='/' /> 
              </Switch>
          }
        </div>         
      </div>
    </Router>
    
  );
}

export default App;
