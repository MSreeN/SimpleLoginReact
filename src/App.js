import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./Context/auth-context";
import Testing from "./Context/Testing";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storageIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storageIsLoggedIn === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    // <React.Fragment>
    <AuthContext.Provider value = {
      {
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler
      }
      
    }>
    <Testing.Provider value={{
      testingCode: 1
    }}>
      <MainHeader  onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    {/* // </React.Fragment> */}
    </Testing.Provider>
    </AuthContext.Provider>
  );
}

export default App;
