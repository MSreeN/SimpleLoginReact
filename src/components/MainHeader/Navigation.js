import React, { useContext } from 'react';
import AuthContext from '../../Context/auth-context';
import Testing from '../../Context/Testing';

import classes from './Navigation.module.css';

const Navigation = (props) => {
  const context = useContext(AuthContext);
  const testingContext = useContext(Testing)
  console.log(testingContext.testingCode);
  return (
      
      <nav className={classes.nav}>
      <ul>
        {context.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
    

  );
};

export default Navigation;
