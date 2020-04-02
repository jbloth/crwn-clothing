export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

  if (existingCartItem) {
    // map macht ein neues array und das ist nötig wenn Komponente neu rendern soll
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }

  // Wenn das item noch nicht im cart ist, mach auch ein neues array und füge für
  // neues item qunatity hinzu
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

// export const clearItemFromCart = (cartItems, cartItemToDelete) => {
//   return cartItems.filter(cartItem => cartItem.id !== cartItemToDelete.id);
// };

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

  if (existingCartItem.quantity > 1) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }

  return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
};
