import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainWrapper from './MainWrapper';
import Layout from '../Layout/index';


import NotFound404 from '../DefaultPage/404/index';
import LogIn from '../Account/LogIn/index';
import Register from '../Account/Register/index';

import Home from '../Home/index'
import Review from '../Review/index'
import Post from '../Post/index'
import Profile from '../Account/Profile'
import Add from '../Add/index'

import Reset from '../Account/Reset/index'
import Password from '../Account/Password/index'

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route path='/' exact={true} component={Home}></Route>
      <Route path='/review' component={Review}></Route>
      <Route path='/post' component={Post} />
      <Route path='/profile' component={Profile}></Route>
      <Route path='/add' component={Add}></Route>
    </div>
  </div>
);

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
       <Route path="/" exact={true} component={wrappedRoutes} />
        {/* <Route path="/lock_screen" component={LockScreen} /> */}
        {/* <Route path="/log_in" component={RegisterPhoto} /> */}
        <Route path="/login" component={LogIn} />
        <Route path="/register" component={Register} />
        <Route path='/reset' component={Reset} />
        <Route path='/password' component={Password} />
        <Route path='/review' component={wrappedRoutes} />
        <Route path='/post' component={wrappedRoutes} />
        <Route path='/profile' component={wrappedRoutes} />
        <Route path='/add' component={wrappedRoutes} />
        <Route path="*" component={NotFound404} />
        

        {/* <Route path="/register_photo" component={RegisterPhoto} /> */}
        {/* <Route path="/" component={wrappedRoutes} /> */}
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
