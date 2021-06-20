import styles from "./Checkout.module.css";

const Checkout = (props) => {
  const submitHandler = (event) => {
      event.preventDefault();
  };


  //the cancel button gets the onClick which is props 
  //to pass the action up to close the modal. - this could be context
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" />
      </div>
      <div className={styles.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" />
      </div>
      <div className={styles.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" />
      </div>
      <div className={styles.control}>
        <label htmlFor="postalCode">Postal Code</label>
        <input type="text" id="postalCode" />
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles['button--alt']} onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
