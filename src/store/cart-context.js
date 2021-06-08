import React from 'react';


//use context because needed in multiple places
// initialize to get auto completion
//addItem and removeItem are functions

//provider could be here, but to keep this lean, create
// a separate CartCtxProvider
const CartContext = React.createContext (
    {
        items: [],
        totalAmount: 0,
        addItem : (item) => {},
        removeItem: (id) => {}
    }
)

export default CartContext;