import '../styles/SellerOrder.css';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, Suspense } from 'react';
import { setInitialOrders,setSelectedCategory } from '../slices/orderSlice';

// const CartCard=lazy(()=>import("../components/CartCard"));

const SellerOrder= () => {
    const order = useSelector((state) => state.orders);
    const dispatch = useDispatch();
    const { selectedCategory } = order;

    const toggleButton = (button) => {
        const updatedCategories = selectedCategory.includes(button)
          ? selectedCategory.filter((category) => category !== button)
          : [...selectedCategory, button];
    
        dispatch(setSelectedCategory(updatedCategories));
      };    

    return (
        <div>
            <div id='Upper-section-sellerorder'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check-fill" viewBox="0 0 16 16">
                    <path fill="#3C95A9" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
                </svg>
                <span id='Upper-section-order'>My Order</span>
                <div className="OrderButtonContainer">
                    <button
                        className={`categoryButton ${selectedCategory.includes("all") ? "selected" : ""
                            }`}
                        onClick={() => toggleButton("all")}
                    >
                        All
                    </button>
                    <button
                        className={`categoryButton ${selectedCategory.includes("product") ? "selected" : ""
                            }`}
                        onClick={() => toggleButton("product")}
                    >
                        Product
                    </button>
                    <button
                        className={`categoryButton ${selectedCategory.includes("pet") ? "selected" : ""
                            }`}
                        onClick={() => toggleButton("pet")}
                    >
                        Pet
                    </button>
                    <button
                        className={`categoryButton ${selectedCategory.includes("service") ? "selected" : ""
                            }`}
                        onClick={() => toggleButton("service")}
                    >
                        Service
                    </button>
                </div>
            </div>
            <div>

                {order.length !== 0 ? (
                    <>

                    </>
                ) : <div className="NoProductContainer">
                    <p>There is no order added yet!</p>
                </div>}
            </div>
        </div>
    )
}

export default SellerOrder;