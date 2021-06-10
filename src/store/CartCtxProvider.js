import {useReducer} from 'react';
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmt: 0
};

const cartReducer = (state, action) => {

  if (action.type === 'ADD_ITEM') {
    const updatedItems = state.items.concat(action.item);
    const updatedAmt = state.totalAmt + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmt: updatedAmt
    }
  }
  else if (action.type === 'REMOVE_ITEM') {
    console.log ('remove item not yet implemented');
  }

  return defaultCartState

}

const CartCtxProvider = (props) => {

  const [state, cartDispatch] = useReducer (cartReducer, defaultCartState);

  const addItemToCartHandler = (aItem) => {
    // cartCtx.items = [...cartCtx.items, item];
    cartDispatch ({type: 'ADD_ITEM', item: aItem});
  };

  const removeItemFromCartHandler = (aId) => {
    cartDispatch ({type: 'REMOVE_ITEM', id: aId});
  };
  //creat the instance of CartContext to be used in the app
  const cartCtx = {
    items: state.items,
    totalAmount: state.totalAmt,
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
