import '../styles/SellerOrder.css';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, Suspense, useState } from 'react';
import { setInitialOrders,setSelectedCategory } from '../../ZongMing/slices/orderSlice';
import axios from 'axios';
import { lazy } from 'react';

const SellerOrderCard=lazy(()=>import("../components/SellerOrderCard"));

const SellerOrder =()=>{
    const order = useSelector((state) => state.orders.order);
    const selectedCategory = useSelector((state) => state.orders.selectedCategory);
    const dispatch = useDispatch();
    const [receipt,setReceipts]=useState([]);
    const [filteredReceipts, setFilteredReceipts] = useState([]);
    const [sortedServiceReceipt, setSortedServiceReceipt] = useState([]);

    const parseDateTime = (dateString, timeString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        const [hour, minute] = timeString.split(':').map(Number);
        return new Date(year, month - 1, day, hour, minute).getTime();
    };

    const sortReceiptsByClosestService = (receipts) => {
        const currentTime = new Date().getTime();
    
        return [...receipts].sort((a, b) => {
            const closestToNow = (receipt) => {
                const closestService = receipt.products
                    .filter(product => product.type === 'service')
                    .reduce((closest, current) => {
                        const currentServiceTime = new Date(parseDateTime(current.date,current.quantity)).getTime();
                        return currentServiceTime >= currentTime && currentServiceTime < closest
                            ? currentServiceTime
                            : closest;
                    }, Infinity);
                return closestService;
            };
    
            const closestA = closestToNow(a);
            const closestB = closestToNow(b);
    
            return closestA - closestB;
        });
    };    
    

    useEffect(()=>{
        const fetchReceipts = async () =>{
            try{
                const response = await axios.get(`http://localhost:4000/api/orders/admin/receipts`);
                if(response.status===200){
                    const userDetails = response.data.map(order => ({
                        username: order.username,
                        email: order.email,
                        address: order.address,
                        phone:order.phone,
                        userId:order.userId
                    }));
                    const receiptsWithUsers = response.data.flatMap(order =>
                        order.receipts.map(receipt => ({
                            ...receipt,
                            user: userDetails.find(user => user.userId === order.userId)
                        }))
                    );
                    setReceipts(receiptsWithUsers);
                    dispatch(setInitialOrders(receiptsWithUsers)); 
                }
            }catch(error){
                console.error('Error fetching receipts:', error);
            }
        };
        fetchReceipts();
    },[dispatch,order]);

    useEffect(() => {
        let filteredReceipts = [];
    
        if (selectedCategory.includes("all")) {
            filteredReceipts = receipt;
        } else {
            filteredReceipts = receipt.map(receiptItem => {
                const filteredProducts = receiptItem.products.filter(product =>
                    selectedCategory.includes(product.type)
                );
    
                return { ...receiptItem, products: filteredProducts };
            }).filter(receiptItem => receiptItem.products.length > 0); // Filter out receipts with no products
        }

        const serviceReceipts = filteredReceipts.map(receiptItem => ({
            ...receiptItem,
            products: receiptItem.products.filter(product => product.type === "service")
        })).filter(receiptItem => receiptItem.products.length > 0); // Filter out receipts with no service products
    
        const sortedReceipts = sortReceiptsByClosestService(serviceReceipts);
        setSortedServiceReceipt(sortedReceipts);
        setFilteredReceipts(filteredReceipts);
        
    }, [selectedCategory, receipt]);

    console.log(sortedServiceReceipt);

    const toggleButton = (button) => {
        let updatedCategories = [];
        if (button === "all") {
            updatedCategories = ["all"];
        } else {
            if (selectedCategory.includes("all")) {
                updatedCategories = [button];
            } else {
                updatedCategories = selectedCategory.includes(button)
                    ? selectedCategory.filter((category) => category !== button)
                    : [...selectedCategory, button];
            }
        }
    
        dispatch(setSelectedCategory(updatedCategories));
    };

    useEffect(() => {
        let updatedCategories = [];
    
        if (selectedCategory.length === 0) {
            updatedCategories = ["all"];
        } else {
            updatedCategories = selectedCategory;
        }
    
        dispatch(setSelectedCategory(updatedCategories));
    }, [selectedCategory,dispatch]);
    

    return(
        <div>
            <div id='Upper-section-sellerorder'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check-fill" viewBox="0 0 16 16">
                    <path fill="#3C95A9" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
                </svg>
                <span id='Upper-section-order'> Orders</span>
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
                {filteredReceipts && filteredReceipts.length !== 0 ?(
                    <Suspense fallback={<div>Loading...</div>}>
                        {(selectedCategory.length === 1 && selectedCategory[0] === 'service'?sortedServiceReceipt:filteredReceipts).map((receipt) => (
                            <SellerOrderCard key={receipt._id} receipt={receipt} selectedCategory={selectedCategory} sortedServiceReceipt={sortedServiceReceipt}/>
                        ))}
                    </Suspense>
                ) : <div className="NoProductContainer">
                    <p>There is no order yet!</p>
                </div>}
            </div>
        </div>
    )
}

export default SellerOrder;