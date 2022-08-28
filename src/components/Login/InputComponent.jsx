import React, { useRef, useImperativeHandle } from "react";

const InputComponent = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: focusInput,
      //returns the focusInput function to be accessible from the parent Function or element
    };
  });

  return (
    <div
      className={`${props.className} ${
        props.isValid ? props.classNameInvalid : ""
      }`}
    >
      <label htmlFor={props.inputType}>{props.name}</label>
      <input
        ref={inputRef}
        type={props.inputType}
        id={props.inputType}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default InputComponent;
