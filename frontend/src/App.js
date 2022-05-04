import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import {useDispatch} from 'react-redux';
import * as sessionActions from './store/session';
import SignUpFormPage from './components/SignUpFormPage';
// import EventsPage from './components/EventsPage';
import Navigation from './components/Navigation';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log('made it to useEffect')
    dispatch(sessionActions.restoreUser())
    .then((res) => {
      console.log('inside catch, result: ',res)
      setIsLoaded(true)
    })
    .catch((error) => {console.log('inside catch, error: ',error)});
  }, [dispatch]);

  // console.log(isLoaded)

  return(
    <>
      <Navigation isLoaded={isLoaded}/>
      {isLoaded && (
        <Switch>
          <Route path='/login'>
            <LoginFormPage />
          </Route>
          <Route path = '/signup'>
            <SignUpFormPage />
          </Route>
        </Switch>

      )}
    </>
  );
}

export default App;
