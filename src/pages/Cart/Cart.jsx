import { useContext, useState } from "react";
import { ShopContext } from './../../context/ShopContext'
import CartItem from "./CartItem";
import { useNavigate } from 'react-router-dom'
import { FaShoppingBasket } from "react-icons/fa";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'


const Cart = () => {

  const { cartItems, getTotalCartAmount, data, convertToPersian, removeAllFromCart } = useContext(ShopContext);

  const [state, setState] = useState({
    removeOpen: false,
    vertical: 'bottom',
    horizontal: 'right',
  })

  const { vertical, horizontal, removeOpen } = state

  const handleRemoveOpen = () => {
    if (removeAllFromCart) {
      setState(prevState => ({ ...prevState, removeOpen: true }));
    }
  }

  const handleRemoveClose = () => {
    setState(prevState => ({ ...prevState, removeOpen: false }));
  }

  const cartAmount = getTotalCartAmount()

  const navigate = useNavigate()

  return (
    <div>
      <div className='w-full flex justify-start items-center my-20 bg-[#E9364E] p-5 rounded-b-3xl'>
        <h1 className='flex justify-center items-center font-bold text-3xl my-5 text-white'>
          سبد خرید
        </h1>
      </div>
      <div className={cartAmount > 0 ? `flex p-5` : `hidden`}>
        <button onClick={() => { removeAllFromCart(); handleRemoveOpen(); }} className='border p-5 border-red-700 rounded-2xl text-red-700 hover:bg-red-700 hover:text-white transition-all duration-300'>
          حذف همه موارد
        </button>
      </div>
      <div className={cartAmount > 0 ? `flex flex-wrap justify-between p-5` : `flex flex-wrap justify-center p-5`}>
        <div className='w-full lg:w-2/3'>
          {data?.map((product) => {
            if (cartItems[product.id] !== 0) {
              return <CartItem data={product} key={product.id} />
            }
            return null;
          })}
        </div>
        <div className={cartAmount > 0 ? `w-full lg:w-1/4 flex my-10` : `w-4/5 flex`}>
          <div className='w-full max-h-56 sticky top-0 left-0 bg-[#525252] rounded-2xl'>
            {cartAmount > 0 ? (
              <div className='w-full'>
                <div className='flex justify-center items-center font-bold text-lg text-white my-5'>
                  مبلغ نهایی : {convertToPersian(cartAmount)}&nbsp;ریال
                </div>
                <div className='grid grid-cols-1'>
                  <div className='my-5 flex justify-center items-center'>
                    <button
                      onClick={() => navigate('/')}
                      className='text-white border border-white flex justify-center items-center px-8 py-1 text-lg font-bold rounded-2xl hover:bg-white hover:text-black transition-all duration-300'
                    >
                      ادامه خرید
                    </button>
                  </div>
                  <div className='flex justify-center items-center'>
                    <button className='border text-white border-white flex justify-center items-center px-8 py-1 text-lg font-bold rounded-2xl hover:bg-white hover:text-black transition-all duration-300'>
                      پرداخت
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex justify-center items-center flex-col bg-white border border-slate-200 rounded-2xl *:my-5'>
                <div className='text-slate-500 text-7xl md:text-8xl lg:text-9xl'>
                  <FaShoppingBasket />
                </div>
                <div className='font-bold text-xl md:text-2xl lg:text-3xl'>
                  سبد خرید شما خالی است
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={removeOpen}
        autoHideDuration={3000}
        onClose={handleRemoveClose}
        message='سبد خرید شما خالی شد'
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleRemoveClose}
          >
            <CloseIcon fontSize="small" className='mx-2' />
          </IconButton>
        }
        key={`${vertical}${horizontal}remove`}
      />
    </div>
    
  )
}


export default Cart