import '../styles/SellerProduct.css';
import { NavLink } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import React, { useEffect,useState,lazy,Suspense,useRef } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import "../styles/ProductCard.css";
import SellerProductCardSkeleton from '../components/SellerProductCardSkeleton';
import { setScrollPosition } from "../slices/ProductHistorySlice";
import ProductSlice, { addProduct } from "../slices/ProductSlice";
import { ProductData } from "../data/DummyProductData";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SellerProductCard=lazy(()=>import("../components/SellerProductCard"));

function SellerProduct(){
    const products = useSelector((state)=> state.products);
    const productHistory=useSelector((state)=>state.productHistory);

    const {scrollPosition,selectedProductType}=productHistory;
    const dispatch=useDispatch();

    const [filteredProducts,setFilteredProducts]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const containerRef=useRef(null);

    //useEffect for restoring last scrolling position
    useEffect(()=>{
        if(containerRef.current&& scrollPosition){
            containerRef.current.scrollTop=scrollPosition;
        }
    });
    
    //useEffect for filtering data
    useEffect(()=>{
        let filteredData = [...products];;
        setIsLoading(true);

        //add ----------------------------------------------------------------------------------------

        setIsLoading(false);
        setFilteredProducts(filteredData);
    }, [products]);

    useEffect(() => {
        const handleScroll = () => {
          if (containerRef.current) {
            dispatch(setScrollPosition(containerRef.current.scrollTop));
          }
        };
    
        const container = containerRef.current;
        container.addEventListener("scroll", handleScroll);
    
        return () => {
          container.removeEventListener("scroll", handleScroll);
        };
    }, [dispatch, containerRef]);

    useEffect(() => {
        if ( products.length === 0) {
            ProductData.forEach((product) => {
                dispatch(addProduct(product));
            }
        );
        }
    }, [dispatch, products]);

    const navigate = useNavigate();

    const handleNavigateToAddProduct = () => {
        navigate('/seller/addproduct');
    };

    return(
        <div>
            <div id='Upper-section'>
                <svg id='Upper-section-icon' xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 25 22" fill="none">
                    <path d="M19.6875 15.1247H5.32812C5.15625 15.1247 5.01562 15.2794 5.01562 15.4684L5.01172 17.531C5.01172 17.7201 5.15234 17.8748 5.32422 17.8748H19.6875C19.8594 17.8748 20 17.7201 20 17.531V15.4684C20 15.2794 19.8594 15.1247 19.6875 15.1247ZM19.6875 19.2499H5.31641C5.14453 19.2499 5.00391 19.4046 5.00391 19.5936L5 21.6562C5 21.8453 5.14062 22 5.3125 22H19.6875C19.8594 22 20 21.8453 20 21.6562V19.5936C20 19.4046 19.8594 19.2499 19.6875 19.2499ZM19.6875 10.9995H5.33594C5.16406 10.9995 5.02344 11.1542 5.02344 11.3432L5.01953 13.4058C5.01953 13.5949 5.16016 13.7496 5.33203 13.7496H19.6875C19.8594 13.7496 20 13.5949 20 13.4058V11.3432C20 11.1542 19.8594 10.9995 19.6875 10.9995ZM23.8477 5.02652L13.2188 0.157921C12.9903 0.0536643 12.7454 0 12.498 0C12.2507 0 12.0058 0.0536643 11.7773 0.157921L1.15234 5.02652C0.457031 5.3488 0 6.09649 0 6.93013V21.6562C0 21.8453 0.140625 22 0.3125 22H3.4375C3.60938 22 3.75 21.8453 3.75 21.6562V10.9995C3.75 10.2432 4.32031 9.6244 5.02344 9.6244H19.9766C20.6797 9.6244 21.25 10.2432 21.25 10.9995V21.6562C21.25 21.8453 21.3906 22 21.5625 22H24.6875C24.8594 22 25 21.8453 25 21.6562V6.93013C25 6.09649 24.543 5.3488 23.8477 5.02652Z" fill="#3C95A9"/>
                </svg>
                <span id='Upper-section-warehouse'>My Warehouse</span>
                
                {/* <Link to={`/seller/addproduct`} className="add-product-link"> */}
                    <button id='Upper-section-add-product' onClick={handleNavigateToAddProduct}>
                        <svg id='Upper-section-add-product-icon' xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 39 39" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.46548 0.608655C15.7994 -0.202885 23.2006 -0.202885 30.5345 0.608655C34.5951 1.06301 37.8711 4.25534 38.3476 8.32325C39.2175 15.7491 39.2175 23.2508 38.3476 30.6766C37.8711 34.7445 34.5951 37.9369 30.5345 38.3912C23.2006 39.2029 15.7994 39.2029 8.46548 38.3912C4.40488 37.9369 1.1289 34.7445 0.652436 30.6766C-0.217479 23.2516 -0.217479 15.7506 0.652436 8.32561C0.893436 6.34933 1.7959 4.51221 3.21356 3.11198C4.63123 1.71176 6.48101 0.830494 8.46311 0.611021M19.5 7.68431C19.9715 7.68431 20.4237 7.8713 20.7571 8.20415C21.0905 8.53699 21.2778 8.98843 21.2778 9.45914V17.7251H29.5579C30.0294 17.7251 30.4816 17.9121 30.815 18.2449C31.1484 18.5778 31.3357 19.0292 31.3357 19.4999C31.3357 19.9707 31.1484 20.4221 30.815 20.7549C30.4816 21.0878 30.0294 21.2748 29.5579 21.2748H21.2778V29.5407C21.2778 30.0115 21.0905 30.4629 20.7571 30.7957C20.4237 31.1286 19.9715 31.3156 19.5 31.3156C19.0285 31.3156 18.5763 31.1286 18.2429 30.7957C17.9095 30.4629 17.7221 30.0115 17.7221 29.5407V21.2748H9.44212C8.9706 21.2748 8.5184 21.0878 8.18499 20.7549C7.85158 20.4221 7.66427 19.9707 7.66427 19.4999C7.66427 19.0292 7.85158 18.5778 8.18499 18.2449C8.5184 17.9121 8.9706 17.7251 9.44212 17.7251H17.7221V9.45914C17.7221 8.98843 17.9095 8.53699 18.2429 8.20415C18.5763 7.8713 19.0285 7.68431 19.5 7.68431Z" fill="#3C95A9"/>
                        </svg>
                    </button>
                {/* </Link> */}
            </div>
            <div ref={containerRef}>
                {isLoading?(
                    <div className="loadingContainer">
                        <CircularProgress className="circularProgress" />
                  </div>
                ): filteredProducts.length !== 0 ? (
                    <>
                    <div>
                        <Suspense fallback={<div>Loading...</div>}>
                        {products.map((product,index)=>(
                            <SellerProductCard key={index} product={product}/>
                        ))}
                        </Suspense>
                    </div>
                    </>
                ):<div className="NoProductContainer">
                    <p>There is no product yet!</p>
                </div>}
            </div>
        </div>
    )
}

export default SellerProduct;