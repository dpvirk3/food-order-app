import React, { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

//3 spans to show icon, label and count as badge
const HeaderCartButton = (props) => {
  //we import the cartContext not the provider

  //this automatically returns the context from the nearest 
  //higher level provider
  const cartCtx = useContext(CartContext);

  //could use items.length = but we will be storing amount in the 
  //items to indicate multiple orders of the same meal.
  //so use built in array function reduce
  const numOfCartItems = cartCtx.items.reduce(
      (curNumber, item) => {return curNumber + item.amount}, 0
  )

  const [btnHighLighted, setBtnHighlighted] = useState(false);

  //add bump from css to have animation
  const btnClasses = `${styles.button} ${btnHighLighted? styles.bump :''} `;
 
  const cartItems = cartCtx.items;
  
  //when the cartItems changes, set btn highlighted for animation
  //remove animation after 300 ms - the duration of animation
  useEffect (() => {
    if (cartItems.length > 0) {
      setBtnHighlighted(true);

      const timerFunc = setTimeout(() => {
        setBtnHighlighted(false);
      }, 300);

      return (() => clearTimeout(timerFunc));
    }
  }, [cartItems]);


  return (
    <button className={btnClasses } onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
