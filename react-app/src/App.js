import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import SplashPage from './components/SplashPage';
import CreateEvent from './components/CreateEvent';
import CreateVenue from './components/CreateVenue';
import UserEvents from './components/UserEvents';
import EditEvent from './components/EditEvent';
import EditVenue from './components/EditVenue';
import CreateCategory from './components/CreateCategory';
import Tickets from './components/Tickets';
import EventRegistration from './components/EventRegistration';
import UserPurchases from './components/UserPurchases';
import {gapi} from 'gapi-script';

const clientId = '657310180864-a0tkbu56qpf7c3hsm19vdushdi6egofv.apps.googleusercontent.com'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
    function start(){
      gapi.client.init({
        clientId: clientId,
        scope: "https://www.googleapis.com/auth/cloud-platform.read-only"
      })
    };
    gapi.load('client:auth2', start);
    setLoaded(true);
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  // useEffect=(() => {
  //   function start(){
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: ""
  //     })
  //   }
  //   gapi.load('client:auth2', start)
  // });

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <NavBar />
          <SplashPage />
        </ProtectedRoute>
        <ProtectedRoute path='/create-event' exact={true} >
          <CreateEvent />
        </ProtectedRoute>
        <ProtectedRoute path='/create-venue/:id' exact={true} >
          <CreateVenue />
        </ProtectedRoute>
        <ProtectedRoute path='/events/:id' exact={true} >
          <UserEvents />
        </ProtectedRoute>
        <ProtectedRoute path='/edit-event/:id' exact={true} >
          <EditEvent />
        </ProtectedRoute>
        <ProtectedRoute path='/edit-venue/:id' exact={true} >
          <EditVenue />
        </ProtectedRoute>
        <ProtectedRoute path='/create-category/:id' exact={true} >
          <CreateCategory />
        </ProtectedRoute>
        <ProtectedRoute path='/tickets' exact={true} >
          <Tickets />
        </ProtectedRoute>
        <ProtectedRoute path='/tickets/:id' exact={true} >
          <EventRegistration />
        </ProtectedRoute>
        <ProtectedRoute path='/tickets/:userId/purchases' exact={true} >
          <UserPurchases />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
