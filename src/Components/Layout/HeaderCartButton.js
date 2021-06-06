import React from "react";

import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';

//3 spans to show icon, label and count as badge
const HeaderCartButton = (props) => {
  return (
    <button className={styles.button}>
      <span className={styles.icon}>
          <CartIcon/>
      </span>
      <span >Your Cart</span>
      <span className={styles.badge}>3</span>
    </button>
  );
};

export default HeaderCartButton;
