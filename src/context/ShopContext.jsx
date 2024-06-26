/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {

    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

    const convertToPersian = (number) => {
        if (typeof number !== 'string') {
            number = number.toString()
        }
        number = number.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return number.replace(/\d/g, function (digit) {
            return persianDigits[digit]
        })
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ['Digikala-Products'],
        queryFn: async () => {
            try {
                const res = await axios.get('https://one-api.ir/digikala/?token=142220:6675f6a2bf5b3&action=category&id=3')
                return res.data.result[4].data.products
            } catch (error) {
                throw new Error('Failed to fetch products')
            }
        }
    })

    const getDefaultCart = () => {
        let cart = {}
        data?.forEach(product => {
            cart[product.id] = 0
        })
        return cart
    }

    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'))
        return storedCartItems || {}
    })

    useEffect(() => {
        if (data) {
            const storedCartItems = JSON.parse(localStorage.getItem('cartItems'))
            const defaultCart = getDefaultCart()
            const mergedCart = { ...defaultCart, ...storedCartItems }
            setCartItems(mergedCart)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {
        if (data) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
        }
    }, [cartItems, data])

    const addToCart = (itemId) => {
        setCartItems(prev => {
            const updatedItems = { ...prev, [itemId]: prev[itemId] + 1 }
            return updatedItems
        })
    }

    const removeFromCart = (itemId) => {
        setCartItems(prev => {
            const updatedItems = { ...prev, [itemId]: prev[itemId] - 1 }
            return updatedItems
        })
    }

    const removeAllFromCart = () => {
        const updatedCartItems = { ...cartItems }
        Object.keys(updatedCartItems).forEach(key => {
            if (updatedCartItems[key] !== 0) {
                updatedCartItems[key] = 0;
            }
        });
        setCartItems(updatedCartItems);
    }


    const removeAllFromCartEach = (itemId) => {
        setCartItems(prev => {
            const updatedItems = { ...prev, [itemId]: 0 }
            return updatedItems
        })
    }

    const updateCartItemAmount = (newAmount, itemId) => {
        setCartItems(prev => {
            const updatedItems = { ...prev, [itemId]: newAmount }
            return updatedItems
        })
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0
        for (const itemId in cartItems) {
            const quantity = cartItems[itemId]
            if (quantity > 0) {
                const item = data?.find(product => product.id === Number(itemId))
                if (item) {
                    totalAmount += quantity * item.price.selling_price
                }
            }
        }
        return totalAmount
    }


    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemAmount,
        getTotalCartAmount,
        data,
        convertToPersian,
        removeAllFromCart,
        removeAllFromCartEach
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                props.children
            )}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
