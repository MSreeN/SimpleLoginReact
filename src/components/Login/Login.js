import React, { useState, useEffect, useReducer, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

function emailReducer(state, action) {
  if (action.type === "USER_INPUT")
    return { value: action.val, isValid: action.val.includes("@") };
  if (action.type === "INPUT_BLUR")
    return { value: state.value, isValid: state.value.includes("@") };
}

function passwordReducer(state, action) {
  function sample() {
    return action.val.trim().length > 6;
  }
  if (action.type === "USER_INPUT")
    return { value: action.val, isValid: sample() };
  if (action.type === "INPUT_BLUR")
    return { value: state.value, isValid: sample() };
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: isEmailValid } = emailState;
  const { isValid: isPasswordValid } = passwordState;
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFormIsValid(isEmailValid && isPasswordValid);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [isEmailValid, isPasswordValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(emailState.isValid && event.target.value.trim().length>6)
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR", val: emailState.value });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR", val: passwordState.value });
  };

  // const submitHandler = (event) => {
  //   event.preventDefault();
  //   props.onLogin(emailState.value, passwordState.value);
  // };

const submitHandler = (e)=> {
  if (formIsValid) {
    props.onLogin(emailState.value, passwordState.value);
  } else if (!emailState.isValid) {
    emailInputRef.current.focus();
  } else {
    passwordInputRef.current.focus();
  }
}
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          isValid={emailState.isValid}
          id="email"
          label="E-mail"
          type="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          //this ref cannot be accessed through props, instead it can be accessed using other argument that is passed to the child component 'ref'.
          ref={passwordInputRef}
          isValid={passwordState.isValid}
          id="password"
          label="password"
          type="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
