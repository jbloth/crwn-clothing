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
