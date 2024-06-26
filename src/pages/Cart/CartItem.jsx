/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { ShopContext } from './../../context/ShopContext'


const CartItem = (props) => {
    const { id, title_fa, price, images } = props.data

    const { selling_price } = price

    const { main } = images

    const { cartItems, addToCart, removeFromCart, updateCartItemAmount, convertToPersian } = useContext(ShopContext);

    return (
        <div className='flex justify-center items-center'>
            <div className='w-full grid grid-cols-2 my-10 rounded-2xl shadow-2xl border'>
                <figure className="flex justify-center items-center">
                    <img src={main} alt="product-image" />
                </figure>
                <div className='*:w-full flex flex-wrap justify-center'>
                    <h2 className="flex justify-start items-center font-bold text-xl p-5">
                        {title_fa}
                    </h2>
                    <span className='flex justify-start items-center text-lg  p-5'>
                        {convertToPersian(selling_price)}&nbsp;ریال
                    </span>
                    <div className="flex justify-start items-center p-5">
                        <button onClick={() => removeFromCart(id)} className='px-4 py-1 font-bold text-xl rounded-md bg-[#e6e6e6]'> - </button>
                        <input className='py-1 flex text-center w-[100px] text-xl' value={convertToPersian(cartItems[id])} onChange={(e) => {
                            updateCartItemAmount(Number(e.target.value), id)
                        }} />
                        <button onClick={() => addToCart(id)} className='px-4 py-1 font-bold text-xl rounded-md bg-[#e6e6e6]'> + </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem