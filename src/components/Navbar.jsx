import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import { ShopContext } from './../context/ShopContext';
import { useContext } from 'react';
import { FiMenu, FiX } from 'react-icons/fi'; // Import close icon from react-icons
import Logo from './../assets/images/logo.png';

const Navbar = () => {
    const { cartItems, data, convertToPersian } = useContext(ShopContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const totalNumber = data?.reduce((total, product) => {
        return total + (cartItems[product.id] || 0);
    }, 0);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className='relative w-full flex justify-between items-center bg-black p-5'>
            <figure className='w-[100px] h-[100px]'>
                <img className='w-full h-full' src={Logo} alt="logo" />
            </figure>
            <button 
                className='lg:hidden text-white'
                onClick={toggleMenu}
            >
                <FiMenu size={32} />
            </button>
            <ul className='hidden lg:flex items-center'>
                <li className='m-2'>
                    <Link className='text-white text-xl' to='/'>
                        فروشگاه 
                    </Link>
                </li>
                <li className='m-2'>
                    <Link className='text-white text-xl' to='/faq'>
                        سوالات متداول
                    </Link>
                </li>
                <li className='m-2'>
                    <Link to='/cart' className='text-white flex w-full h-full p-3 bg-white *:text-black rounded-2xl'>
                        <ShoppingCart size={32} />
                        <span className='flex !text-white justify-center items-center text-lg font-bold bg-black rounded-full px-2'>
                            {convertToPersian(totalNumber)}
                        </span>
                    </Link>
                </li>
            </ul>

            {menuOpen && (
                <div
                    className='fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden'
                    onClick={closeMenu}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full bg-black p-5 z-50 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <button className='text-white mb-5' onClick={toggleMenu}>
                    <FiX size={32} />
                </button>
                <ul className='flex flex-col *:my-2'>
                    <li className='mb-5'>
                        <Link className='text-white text-xl' to='/' onClick={toggleMenu}>
                            فروشگاه 
                        </Link>
                    </li>
                    <li className='mb-5'>
                        <Link className='text-white text-xl' to='/faq' onClick={toggleMenu}>
                            سوالات متداول
                        </Link>
                    </li>
                    <li>
                        <Link to='/cart' className='text-white flex w-full h-full p-3 bg-white *:text-black rounded-2xl justify-around' onClick={toggleMenu}>
                            <ShoppingCart size={32} />
                            <span className='flex !text-white justify-center items-center text-lg font-bold bg-black rounded-full px-2'>
                                {convertToPersian(totalNumber)}
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
