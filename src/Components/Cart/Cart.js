import styles from "./Cart.module.css";
import Modal from "../UI/Modal";


const Cart = (props) => {
  //example cart item
  const cartItems = (
    <ul className={styles["cart-item"]}>
      {[{ id: "C1", name: "Sushi", amount: 2, price: 12.99 },].map((item) => {
       return <li>{item.name}</li>;
      })}
    </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]}>close</button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
