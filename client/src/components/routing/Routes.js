import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
//import Alert from '../layout/Alert';
import Profiles from '../profiles/Profiles';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = props => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/profiles" component={Profiles} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;