import React, { Fragment } from "react";

import styles from "./Header.module.css";
import mealImg from "../../assets/meals.jpg";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>ReactMeals-eg</h1>
        <button>Cartagena</button>
      </header>
      <div className={styles['main-image']}>
        <img src={mealImg} alt="A table with delicious meals..." />
      </div>
    </Fragment>
  );
};

export default Header;
