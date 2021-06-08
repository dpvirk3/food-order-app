import React, { useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartCtxProvider from './store/CartCtxProvider';

function App() {
  const [cartVisible, setCartVisible] = useState(false);

  const showCartHandler = () => {
    setCartVisible(true);
  };

  const hideCartHandler = () => {
    setCartVisible(false);
  };

  return (
    <CartCtxProvider>
      {cartVisible && (
        <Cart isVisible={cartVisible}  onHide={hideCartHandler} />
      )}
      <Header onShow={showCartHandler}/>

      <main>
        <Meals />
      </main>
    </CartCtxProvider>
  );
}

export default App;
