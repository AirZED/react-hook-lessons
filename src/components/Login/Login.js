import React, { useEffect, useReducer, useState, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import InputComponent from "./InputComponent";

const initialState = { value: "", isValid: false, isHovered: false };

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.includes("@"),
      isHovered: true,
    };
  } else if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.includes("@"),
      isHovered: state.isHovered,
    };
  }
  if (action.type === "SUBMIT") {
    return initialState;
  }
  return initialState;
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6,
      isHovered: true,
    };
  } else if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6,
      isHovered: state.isHovered,
    };
  }

  if (action.type === "SUBMIT") {
    return initialState;
  }
  return initialState;
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, initialState);

  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    initialState
  );

  const enteredEmailHasError = emailState.isHovered && !emailState.isValid;
  const enteredPasswordHasError =
    passwordState.isHovered && !passwordState.isValid;

  //destructuring isValid from email and Password State;
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  //use as dependency what you use in your sideEffect function
  useEffect(() => {
    //Wait for 500milli seconds before execution
    const ids = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    //clears the timeOut for every time the function runs
    return () => {
      clearTimeout(ids);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const emailRefHandler = useRef();
  const passwordRefHandler = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      props.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailRefHandler.current.focus();
    } else {
      passwordRefHandler.current.focus();
    }

    dispatchEmail({ type: "SUBMIT" });
    dispatchPassword({ type: "SUBMIT" });
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <InputComponent
          ref={emailRefHandler}
          name={"E-Mail"}
          className={classes.control}
          classNameInvalid={enteredEmailHasError && classes.invalid}
          isValid={emailIsValid}
          type="email"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        {enteredEmailHasError && (
          <p className={classes["text-invalid"]}>Input Valid Email</p>
        )}
        <InputComponent
          ref={passwordRefHandler}
          name={"Password"}
          className={classes.control}
          classNameInvalid={enteredEmailHasError && classes.invalid}
          isValid={passwordIsValid}
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        {enteredPasswordHasError && (
          <p className={classes["text-invalid"]}>
            Entered Valid Password (Character not less then 6)
          </p>
        )}

        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!formIsValid && true}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
