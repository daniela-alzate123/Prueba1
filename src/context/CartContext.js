import { createContext, useEffect, useState } from "react";

import React from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";


export const CartContext = createContext()



const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([])
    const [total, setTotal] = useState(0)



    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const savedCart = await AsyncStorage.getItem("cartItems")
                if (savedCart) {
                    const parsedCart = JSON.parse(savedCart)
                    setCartItems(parsedCart)
                    calculateTotal(parsedCart)
                }

            } catch (error) {
                console.error("error")

            }

        }
        loadCartItems()

    }, [])
    

    useEffect(() => {
        const saveCartItems = async () =>{
            try {
                await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems))
            } catch (error) {
                console.error("error")
            }
        }
        saveCartItems()
        calculateTotal(cartItems)
    
    }, [cartItems])



    const calculateTotal = (items) => {
        const newTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        setTotal(newTotal)

    }

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id)
            if (existingItem) {
                return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
            } else {
                return [...prevItems, { ...product, quantity: 1 }]
            }

        })

    }



    
     const removeFromCart = (productId) => {
        setCartItems((prevItems) => {
          return prevItems
            .map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0);
        });
      };


    return (
        <CartContext.Provider
        value={{
            cartItems,
            total,
            addToCart,
            removeFromCart

        }}
        >
             {children}
        </CartContext.Provider>
    )
}

export default CartProvider