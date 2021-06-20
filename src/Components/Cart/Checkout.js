import React, { useRef, useState } from "react";
import styles from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [inputState, setInputState] = useState({
    nameValid: true,
    streetValid: true,
    cityValid: true,
    postCodeValid: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postalCodeInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    const street = streetInputRef.current.value;
    const city = cityInputRef.current.value;
    const postalCode = postalCodeInputRef.current.value;
    const inNameValid = !isEmpty(name);
    const inStreetValid = !isEmpty(street);
    const inCityValid = !isEmpty(city);
    const inPostCodeValid = isFiveChars(postalCode);

    setInputState({
      nameValid: inNameValid,
      streetValid: inStreetValid,
      cityValid: inCityValid,
      postCodeValid: inPostCodeValid,
    });

    const formIsValid =
      inNameValid && inStreetValid && inCityValid && inPostCodeValid;
    if (!formIsValid) {
      return;
    }

    props.onConfirmOrder({
      name: name,
      street: street,
      city: city,
      postalCode: postalCode,
    });
    console.log(name, street, city, postalCode);
  };

  const postCodeControlClasses = `${styles.control} ${
    inputState.nameValid ? "" : styles.invalid
  }`;

  //the cancel button gets the onClick which is props
  //to pass the action up to close the modal. - this could be context
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div
        className={`${styles.control} ${
          inputState.nameValid ? "" : styles.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!inputState.nameValid && <p>Please enter a vaid name.</p>}
      </div>
      <div
        className={`${styles.control} ${
          inputState.streetValid ? "" : styles.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!inputState.streetValid && <p>Please enter a vaid street.</p>}
      </div>
      <div
        className={`${styles.control} ${
          inputState.cityValid ? "" : styles.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!inputState.cityValid && <p>Please enter a vaid city.</p>}
      </div>
      <div className={postCodeControlClasses}>
        <label htmlFor="postalCode">Postal Code</label>
        <input type="text" id="postalCode" ref={postalCodeInputRef} />
        {!inputState.postCodeValid && (
          <p>Please enter a vaid postal code (5 characters).</p>
        )}
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles["button--alt"]}
          onClick={props.onCancel}
        >
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
