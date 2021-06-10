import {useReducer} from 'react';
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmt: 0
};

const cartReducer = (state, action) => {

  if (action.type === 'ADD_ITEM') {
   // const updatedItems = state.items.concat(action.item);
    const updatedAmt = state.totalAmt + action.item.price * action.item.amount;
   
   //check if the added item exists in the list
   const addedItemIndex = state.items.findIndex(
     item =>  item.id === action.item.id
   );

   const existingItem = state.items[addedItemIndex];

   let updatedItemArray;
   if (existingItem) {
    const updatedItem = {...existingItem, 
      amount: existingItem.amount + action.item.amount};
      updatedItemArray = [...state.items];
      updatedItemArray[addedItemIndex]=updatedItem;
   }
   else {
     updatedItemArray = state.items.concat(action.item);
   }
   
    return {
      items: updatedItemArray,
      totalAmt: updatedAmt
    }
  }
  else if (action.type === 'REMOVE_ITEM') {
    const removedItemIndex = state.items.findIndex(
      item=> item.id === action.id
    );


    const removedItem = state.items[removedItemIndex];
    const remainingCount = removedItem.amount - 1;
    const updatedAmt = state.totalAmt - removedItem.price;
    let updatedItemArray;

    if (removedItem && remainingCount > 0) {
      const updatedItem = {...removedItem, 
        amount: removedItem.amount - 1};
      updatedItemArray = [...state.items];
      updatedItemArray[removedItemIndex] = updatedItem;
    }
    else if (removedItem && remainingCount ===0) {
      // updatedItemArray = [...state.items];
      // updatedItemArray.splice(removedItemIndex, 1);
      //alternately use filer function on array
      updatedItemArray = state.items.filter (item =>
        item.id !== action.id);
    }
    return {
      items: updatedItemArray,
      totalAmt: updatedAmt
    }
    //console.log ('remove item not yet implemented');
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
