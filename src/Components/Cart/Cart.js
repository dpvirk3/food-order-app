import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import React, { Fragment, useContext, useState } from "react";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [doCheckout, setDoCheckout] = useState(false);
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [successSubmission, setSuccessSubmission] = useState(false);

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

  const submitOrderHandler = async (userDataFromCheckout) => {
    setSubmittingOrder(true);
    const response = await fetch(
      "https://react-food-cart-b1cd7-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userDataFromCheckout,
          orderedItems: cartCtx.items,
        }),
      }
    );

    setSubmittingOrder(false);

    if (response.ok) {
      setSuccessSubmission(true);
    } else {
      setSuccessSubmission(false);
    }
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

  const initModalContent = (
    <Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmt}</span>
      </div>
      {doCheckout && (
        <Checkout onConfirmOrder={submitOrderHandler} onCancel={props.onHide} />
      )}
      {!doCheckout && cartActions}
    </Fragment>
  );

  const submittingModalContent = (
    <Fragment>
      <p>Submitting your order</p>
    </Fragment>
  );

  const successSubmitContent = (
    <Fragment>
      <p>Order submitted successfully!</p>
      <button className={styles.button} onClick={props.onHide}>
        close
      </button>
    </Fragment>
  );

  return (
    <Modal onBackdropClick={props.onHide}>
      {!submittingOrder && !successSubmission && initModalContent}
      {submittingOrder && !successSubmission && submittingModalContent}
      {successSubmission && successSubmitContent}
    </Modal>
  );
};

export default Cart;
