import React, { useReducer, useContext, createContext } from 'react';

// Create two contexts: one for the cart state and one for dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function to handle cart actions
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      // Adds a new item to the cart
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    case "REMOVE":
      // Removes an item from the cart based on index
      let updatedArray = [...state];
      updatedArray.splice(action.index, 1);
      return updatedArray;

    case "DROP":
      // Clears the entire cart
      return [];

    case "UPDATE":
      // Updates quantity and price of an existing item in the cart
      let updatedCart = [...state];
      updatedCart.find((food, index) => {
        if (food.id === action.id) {
          updatedCart[index] = {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: action.price + food.price,
          };
        }
        return updatedCart;
      });
      return updatedCart;

    default:
      console.error("Error in Cart Reducer");
      return state;
  }
};

// CartProvider component to provide state and dispatch to children components
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hooks for accessing the cart state and dispatch
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
