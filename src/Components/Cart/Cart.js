import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import { useContext } from "react";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmt = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const addItemHandler = (item) => {
    cartCtx.addItem({id: item.id, amount: 1})
  }

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  }

  //example cart item
  const cartItems = (
    <ul className={styles['cart-items']}>
      {cartCtx.items.map((item) => {
        return <CartItem 
        key= {item.id}
        name={item.name} 
        amount={item.amount}
        price={item.price}
        onAdd={addItemHandler.bind(null, item)}
        onRemove={removeItemHandler.bind(null, item.id)} />;
      })}
    </ul>
  );

  return (
    <Modal onBackdropClick={props.onHide}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmt}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onHide}>
          close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
