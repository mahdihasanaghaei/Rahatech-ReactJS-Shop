import { Link } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react'
import { ShopContext } from './../context/ShopContext'
import { useContext } from 'react'
import Logo from './../assets/images/logo.png'

const Navbar = () => {

    const { cartItems, data, convertToPersian } = useContext(ShopContext);

    const totalNumber = data?.reduce((total, product) => {
        return total + (cartItems[product.id] || 0);
    }, 0);

    return (
        <nav className='w-full flex justify-between items-center bg-black p-5'>
            <figure className='w-[100px] h-[100px]'>
                <img className='w-full h-full' src={Logo} alt="logo" />
            </figure>
            <ul className='flex *:px-10'>
                <li>
                    <Link className='text-white text-xl' to='/'>
                        فروشگاه 
                    </Link>
                </li>
                <li>
                    <Link className='text-white text-xl' to='/faq'>
                        سوالات متداول
                    </Link>
                </li>
            </ul>
            <ul className='flex justify-end items-center *:p-3 *:mx-1'>
                <li>
                    <Link to='/cart' className='text-white flex w-full h-full *:mx-1 p-3 bg-white *:text-black rounded-2xl'>
                        <ShoppingCart size={32} />
                        <span className='flex !text-white justify-center items-center text-lg font-bold bg-black rounded-full px-2'>
                            {convertToPersian(totalNumber)}
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar