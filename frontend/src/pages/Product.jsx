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
                    dispatch(setInitialProduct(productsResponse.data));
                }else{
                    console.log(productsResponse);
                }
            }catch(error){
                // Perform neccessary action;
            }
        };
        products.length===0&&getProducts();
    });

    return <Outlet/>
}

export default Product;