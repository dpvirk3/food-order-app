import React, { useState, useRef } from "react";

import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();

    //current is needed on the inputRef to get the html element
    //value always returns a string even if the input of type number
    const enteredAmt = inputRef.current.value;
    const enteredAmtNum = +enteredAmt;

    //validations
    if (
      enteredAmt.trim().length === 0 ||
      enteredAmtNum < 1 ||
      enteredAmtNum > 5
    ) {
      //set error state
      setErrState(true);
    }

    setErrState(false);
    props.onAddItem (enteredAmtNum);
  };

  const inputRef = useRef();

  const [errState, setErrState] = useState(false);

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          id: "Amount_" + props.id,
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {errState && <p>Amount should be between 1 and 5</p>}
    </form>
  );
};

export default MealItemForm;
