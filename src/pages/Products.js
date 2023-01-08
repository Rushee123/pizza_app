import data from '../Data';
import Product from './Product';
import { useState, useEffect } from 'react';
// import { CartContext } from '../CartContext'
// import { useContext } from 'react'

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {

        setProducts(data)
    }, []);


    return (
        <div className="container mx-auto pb-24">
            <h1 className="text-lg font-bold my-8">Products</h1>
            <div className="grid grid-cols-5 my-8 gap-24">
                {
                    products.map(product => <Product key={product._id} product={product} />)
                }
            </div>
        </div>
    )
}

export default Products;
