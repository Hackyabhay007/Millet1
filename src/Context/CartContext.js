"use client";

import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { toast } from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          // Validate cart data
          if (Array.isArray(parsedCart) && parsedCart.every(item => 
            item?.id && 
            typeof item.quantity === 'number' && 
            typeof item.price === 'number'
          )) {
            setCartItems(parsedCart);
          } else {
            throw new Error('Invalid cart data');
          }
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        toast.error('Error loading your cart');
        localStorage.removeItem('cartItems'); // Clear invalid cart data
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      if (cartItems.length > 0) {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      } else {
        localStorage.removeItem('cartItems');
      }
    } catch (error) {
      console.error('Error saving cart:', error);
      toast.error('Error saving your cart');
    }
  }, [cartItems]);

  // Validate product data
  const validateProduct = useCallback((product) => {
    // Check if product is an object and has the required fields
    if (typeof product !== 'object' || product === null) {
        throw new Error('Product must be an object');
    }
    if (!product.id || !product.name || typeof product.price !== 'number' || typeof product.stock !== 'number') {
        throw new Error('Invalid product data');
    }
    return true; // If all checks pass, return true
}, []);
  // Add to cart
  const addToCart = useCallback((product, quantity = 1) => {
    try {
  console.log('Validating product:', product); // Log the product data
           validateProduct(product); // Ensure product is valid
           console.log('Product is valid:', product); // Log valid product

           if (quantity < 1) throw new Error('Invalid quantity');
        setCartItems((prevItems) => {
            const existingProduct = prevItems.find((item) => item.id === product.id);
            
            if (existingProduct) {
                const newQuantity = existingProduct.quantity + quantity;
                
                if (newQuantity > product.stock) {
                    toast.error(`Only ${product.stock} items available`);
                    return prevItems;
                }

                const updatedItems = prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: newQuantity }
                        : item
                );

                toast.success('Cart updated successfully!');
                return updatedItems;
            } else {
                if (quantity > product.stock) {
                    toast.error(`Only ${product.stock} items available`);
                    return prevItems;
                }

                toast.success('Item added to cart!');
                return [...prevItems, { 
                    ...product,
                    quantity,
                    selected: false,
                    addedAt: new Date().toISOString()
                }];
            }
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error('Failed to add item to cart: ' + error.message);
    }
}, [validateProduct]);

  // Remove from cart
  const removeFromCart = useCallback((id) => {
    try {
      if (!id) throw new Error('Invalid product ID');

      setCartItems((prevItems) => {
        const updatedItems = prevItems.filter((item) => item.id !== id);
        toast.success('Item removed from cart');
        return updatedItems;
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item');
    }
  }, []);

  // Clear cart
  const clearCart = useCallback(() => {
    try {
      setCartItems([]);
      localStorage.removeItem('cartItems');
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  }, []);

  // Update quantity
  const updateQuantity = useCallback((id, newQuantity) => {
    try {
      if (!id || typeof newQuantity !== 'number') {
        throw new Error('Invalid parameters');
      }

      setCartItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === id) {
            const validQuantity = Math.min(Math.max(1, newQuantity), item.stock);
            
            if (validQuantity !== newQuantity) {
              toast.error(`Only ${item.stock} items available`);
            }
            
            return { ...item, quantity: validQuantity };
          }
          return item;
        })
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  }, []);

  // Increase quantity
  const increaseQuantity = useCallback((id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  }, [cartItems, updateQuantity]);

  // Decrease quantity
  const decreaseQuantity = useCallback((id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity - 1);
    }
  }, [cartItems, updateQuantity]);

  // Select/Deselect item
  const selectItem = useCallback((id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  }, []);

  // Select all items
  const selectAllItems = useCallback((selected = true) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => ({ ...item, selected }))
    );
  }, []);

  // Memoized calculations
  const cartCalculations = useMemo(() => {
    const totals = cartItems.reduce(
      (acc, item) => {
        const itemTotal = item.price * item.quantity;
        return {
          total: acc.total + itemTotal,
          selectedTotal: item.selected ? acc.selectedTotal + itemTotal : acc.selectedTotal,
          itemCount: acc.itemCount + item.quantity,
          selectedCount: item.selected ? acc.selectedCount + item.quantity : acc.selectedCount,
        };
      },
      { total: 0, selectedTotal: 0, itemCount: 0, selectedCount: 0 }
    );

    return {
      ...totals,
      hasItems: cartItems.length > 0,
      selectedItems: cartItems.filter((item) => item.selected),
      isEmpty: cartItems.length === 0,
    };
  }, [cartItems]);

  // Order selected items
  const orderSelectedItems = useCallback(async () => {
    try {
      const selectedItems = cartItems.filter((item) => item.selected);
      if (selectedItems.length === 0) {
        toast.error('No items selected');
        return;
      }

      // Process order (replace with your order logic)
      console.log('Processing order for:', selectedItems);
      
      toast.success('Order placed successfully!');
      
      // Remove ordered items
      setCartItems((prevItems) => prevItems.filter((item) => !item.selected));
    } catch (error) {
      console.error('Error processing order:', error);
      toast.error('Failed to process order');
    }
  }, [cartItems]);

  // Additional utility functions
  const isItemInCart = useCallback((id) => 
    cartItems.some(item => item.id === id)
  , [cartItems]);

  const getItemQuantity = useCallback((id) => 
    cartItems.find(item => item.id === id)?.quantity || 0
  , [cartItems]);

  const value = {
    // Cart state
    cartItems,
    isLoading,
    ...cartCalculations,

    // Core functions
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,

    // Selection functions
    selectItem,
    selectAllItems,

    // Order functions
    orderSelectedItems,

    // Utility functions
    isItemInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};