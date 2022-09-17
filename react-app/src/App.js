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
import VenuePage from './components/VenuePage';
import UserEvents from './components/UserEvents';
import EditEvent from './components/EditEvent';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

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
        <ProtectedRoute path='/create-venue' exact={true} >
          <VenuePage />
        </ProtectedRoute>
        <ProtectedRoute path='/events/:id' exact={true} >
          <UserEvents />
        </ProtectedRoute>
        <ProtectedRoute path='/edit-event/:id' exact={true} >
          <EditEvent />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
