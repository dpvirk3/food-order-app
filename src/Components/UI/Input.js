import React from "react";

import styles from "./Input.module.css";
const Input = (props) => {
  //use spread operator to get all properties of input element ofhtml
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  );
};

export default Input;
