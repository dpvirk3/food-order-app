import CartContext from "./cart-context";

const CartCtxProvider = (props) => {
  const addItemToCartHandler = (item) => {
    cartCtx.items = [...cartCtx.items, item];
  };

  const removeItemFromCartHandler = (id) => {};
  //creat the instance of CartContext to be used in the app
  const cartCtx = {
    items: [],
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  //jSX to wrap any component which needs the context.
  // the code to manage the context will be here
  return (
    <CartContext.Provider value={cartCtx}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartCtxProvider;
