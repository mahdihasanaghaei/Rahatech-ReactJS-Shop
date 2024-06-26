/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import { ShopContext } from './../../context/ShopContext'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Product = (props) => {


  const { id, title_fa, price, images, warehouse_stock } = props.data

  const { selling_price } = price

  const { main } = images

  const { addToCart, cartItems, convertToPersian, removeFromCart, removeAllFromCartEach } = useContext(ShopContext)

  const cartItemAmount = cartItems[id] || 0

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['Digikala-Product'],
    enabled: false,
    queryFn: async () => {
      try {
        const res = await axios.get(`https://one-api.ir/digikala/?token=142220:6675f6a2bf5b3&action=product_specifications&id=${id}`)
        return res.data.result[0].attributes
      } catch (error) {
        throw new Error('Failed to fetch products')
      }
    }
  })

  const [state, setState] = useState({
    successOpen: false,
    errorOpen: false,
    removeOpen: false,
    vertical: 'bottom',
    horizontal: 'right',
    errorMessage: ''
  })

  const { successOpen, errorOpen, vertical, horizontal, errorMessage, removeOpen } = state


  const handleAddToCart = () => {
    if (warehouse_stock > 0) {
      addToCart(id);
      setState(prevState => ({ ...prevState, successOpen: true }));
    } else {
      setState(prevState => ({ ...prevState, errorOpen: true, errorMessage: 'کالا موجود نیست' }));
    }
  }

  const handleSuccessClose = () => {
    setState(prevState => ({ ...prevState, successOpen: false }));
  };

  const handleErrorClose = () => {
    setState(prevState => ({ ...prevState, errorOpen: false }));
  }

  const handleRemoveOpen = () => {
    if (removeAllFromCartEach) {
      setState(prevState => ({ ...prevState, removeOpen: true }));
    }
  }

  const handleRemoveClose = () => {
    setState(prevState => ({ ...prevState, removeOpen: false }));
  }



  const action = (
    <>
      <Button onClick={() => { removeFromCart(id); handleSuccessClose(); }} color="secondary" size="large">
        لغو
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSuccessClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  return (
    <div className='w-full h-full grid'>
      <div className='grid *:w-full shadow-lg hover:shadow-2xl cursor-pointer'>
        <figure className='flex justify-center items-center w-full'>
          <img className='w-full sm:w-2/3 lg:w-4/5 xl:w-10/12' src={main} alt="product-image" />
        </figure>
        <h2 className='font-bold text-md lg:text-lg xl:text-xl flex justify-center items-center my-5 p-3'>
          {title_fa}
        </h2>
        <div className='grid grid-cols-1 xl:grid-cols-2 p-3 *:my-2'>
          <span className='flex justify-center items-center text-sm lg:text-md'>
            تعداد موجود در انبار : {convertToPersian(warehouse_stock)}
          </span>
          <span className="flex justify-center items-center text-sm lg:text-md">
            قیمت محصول : {convertToPersian(selling_price)}&nbsp;ریال
          </span>
        </div>
        <div className={cartItemAmount > 0 ? `2xl:grid-cols-3 grid grid-cols-1 gap-2` : `2xl:grid-cols-2 grid grid-cols-1 gap-2`}>
          <div className='flex justify-center items-center my-2'>
            <button onClick={() => { handleOpen(); refetch(); }} className='px-8 py-1 text-md font-bold rounded-2xl border border-black hover:bg-black hover:text-white transition-all duration-300'>
              مشاهده اطلاعات بیشتر
            </button>
          </div>
          <div className='flex justify-center items-center my-2'>
            <button
              onClick={handleAddToCart}
              className='px-8 py-1 text-md font-bold rounded-2xl border border-black hover:bg-black hover:text-white transition-all duration-300'>
              افزودن به سبد خرید {cartItemAmount > 0 && <> ({convertToPersian(cartItemAmount)}) </>}
            </button>
          </div>
          <>
            {cartItemAmount > 0 &&
              <>
                <div className='flex justify-center items-center'>
                  <button onClick={() => { removeAllFromCartEach(id); handleRemoveOpen(); }} className='text-red-500 text-lg'>
                    حذف
                  </button>
                </div>
              </>
            }
          </>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: '80%', maxWidth: 600, height: 400, overflow: 'scroll', direction: 'ltr' }}>
          {isLoading && <Typography>در حال بارگذاری...</Typography>}
          {error && <Typography>خطا در دریافت اطلاعات محصول.</Typography>}
          {data && (
            <>
              {data.map((product) => (
                <div key={product.id}>
                  <Typography>{product.title} : {product.values[0]}</Typography>
                </div>
              ))}
            </>
          )}
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={successOpen}
        autoHideDuration={3000}
        onClose={handleSuccessClose}
        message="کالا به سبد خرید اضافه شد"
        action={action}
        key={`${vertical}${horizontal}success`}
      />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={errorOpen}
        autoHideDuration={3000}
        onClose={handleErrorClose}
        message={errorMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleErrorClose}
          >
            <CloseIcon fontSize="small" className='mx-2' />
          </IconButton>
        }
        key={`${vertical}${horizontal}error`}
      />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={removeOpen}
        autoHideDuration={3000}
        onClose={handleRemoveClose}
        message='کالا از سبد خرید شما حذف شد'
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

export default Product
