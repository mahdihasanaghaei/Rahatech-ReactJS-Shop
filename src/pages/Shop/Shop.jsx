import { useState, useContext, useEffect } from 'react';
import Product from './Product';
import { ShopContext } from './../../context/ShopContext';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const Shop = () => {
    const { data } = useContext(ShopContext);
    
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        setFilteredProducts(data);
    }, [data])

    const showAllProducts = () => {
        setFilteredProducts(data)
    };

    const showAvailableProducts = () => {
        const availableProducts = data.filter(product => product.warehouse_stock > 0)
        setFilteredProducts(availableProducts)
    };

    return (
        <div>
            <div className='w-full flex justify-start items-center my-20 border bg-[#E9364E] p-5 rounded-b-3xl'>
                <h1 className='font-bold text-3xl my-5 text-white'>
                    محصولات
                </h1>
            </div>
            <div className='p-5'>
                <div dir='ltr' className='flex justify-end items-center'>
                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                        <Button onClick={showAvailableProducts}>محصولات موجود</Button>
                        <Button onClick={showAllProducts}>همه محصولات</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
                {filteredProducts?.map((product) => <Product key={product.id} data={product} />)}
            </div>
        </div>
    )
}

export default Shop;
