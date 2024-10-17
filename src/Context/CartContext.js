import { createContext, useState, useEffect } from 'react';

// Create Cart Context
export const CartContext = createContext();

// CartProvider component
export const CartProvider = ({ children }) => {
  // Load cart items from localStorage only on the client-side
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart items to localStorage whenever cart changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Add product to cart
  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Increase product quantity in cart
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease product quantity in cart
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  // Toggle the selection of an item
  const selectItem = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Get total price of all items in cart
  const totalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Get total price of selected items in cart
  const selectedItemsTotal = () => {
    return cartItems
      .filter((item) => item.selected)
      .reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Order all selected items
  const orderSelectedItems = () => {
    const selectedItems = cartItems.filter((item) => item.selected);
    if (selectedItems.length > 0) {
      console.log('Order placed for selected items:', selectedItems);
      // You can replace this with API call or other logic
      clearCart();  // Optionally clear cart after order is placed
    } else {
      console.log('No items selected to order.');
    }
  };

  // Order individual item
  const orderItem = (id) => {
    const orderedItem = cartItems.find((item) => item.id === id);
    if (orderedItem) {
      console.log('Ordering item:', orderedItem);
      // You can replace this with API call or other logic
      removeFromCart(id);  // Optionally remove item after order is placed
    }
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    selectItem,
    totalPrice,
    selectedItemsTotal,
    orderSelectedItems,
    orderItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
