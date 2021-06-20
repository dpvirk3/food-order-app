import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import { useContext, useState } from "react";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [doCheckout, setDoCheckout] = useState(false);

  const totalAmt = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const addItemHandler = (item) => {
    cartCtx.addItem({ id: item.id, amount: 1 });
  };

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const onOrderHandler = (event) => {
    setDoCheckout(true);
  };

  //example cart item
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={addItemHandler.bind(null, item)}
            onRemove={removeItemHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  const cartActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onHide}>
        close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={onOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onBackdropClick={props.onHide}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmt}</span>
      </div>
      {doCheckout && <Checkout onCancel={props.onHide} />}
      {!doCheckout && cartActions}
    </Modal>
  );
};

export default Cart;
