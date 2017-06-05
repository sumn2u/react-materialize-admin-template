import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/LoginPage';
import Dashboard from './containers/DashboardPage';
import FormPage from './containers/FormPage';
import TablePage from './containers/TablePage';
import MapPage from './containers/MapPage';
import PaginationTablePage from './containers/PaginationTablePage';


export default (
  <Route>
    <Route path="/login" component={LoginPage}/>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
     
      <Route path="form" component={FormPage}/>
      <Route path="table" component={TablePage}/>
      <Route path="maps" component={MapPage}/>
      <Route path="datatable" component={PaginationTablePage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);
