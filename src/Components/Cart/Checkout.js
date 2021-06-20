import styles from "./Checkout.module.css";

const Checkout = (props) => {
  return (
    <form>
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
      <div className={styles.control}>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
