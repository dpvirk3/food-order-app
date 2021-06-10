import React from "react";

import styles from "./Input.module.css";
const Input = React.forwardRef((props, aRef) => {
  //use spread operator to get all properties of input element ofhtml
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={aRef} {...props.input} />
    </div>
  );
});

export default Input;
