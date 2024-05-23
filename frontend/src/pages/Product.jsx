import { Outlet } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialProduct } from '../shumin/slices/ProductSlice';
import axios from "axios";

function Product(){
    const dispatch = useDispatch();
    const products = useSelector((state)=>state.products);

    useEffect(()=>{
        const getProducts = async () =>{
            try{
                const productsResponse = await axios.get(
                    "http://localhost:4000/api/product"
                );
                if(productsResponse.status === 200){
                    const updatedProducts = productsResponse.data.map(product => ({
                        ...product,
                        hidden: product.stockLevel === 0 ? true : false
                    }));
                    dispatch(setInitialProduct(updatedProducts));
                }else{
                    console.log(productsResponse);
                }
            }catch(error){
                // Perform neccessary action;
            }
        };
        getProducts();
    },[products.length,JSON.stringify(products.map(item => item.stockLevel))]);

    return <Outlet/>
}

export default Product;