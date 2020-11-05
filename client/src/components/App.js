import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SolarSystemLoading  from 'react-loading';

import './App.css';

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

const Main = (props) => {
  return (
    <DynamicImport load={() => import("./pages/main/main")}>
      {(Component) =>
        Component === null ? <SolarSystemLoading  color={"grey"} /> : <Component {...props} />
      }
    </DynamicImport>
  );
};

const Admin = (props) => {
  return (
    <DynamicImport load={() => import("./pages/admin/admin")}>
      {(Component) =>
        Component === null ? <SolarSystemLoading  color={"grey"} /> : <Component {...props} />
      }
    </DynamicImport>
  );
};

function App() {
  return (
    <Router>
      <div className="App" >
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route path='/admin' component={Admin}/>
        </Switch> 
      </div>
    </Router>
    
  );
}

export default App;
