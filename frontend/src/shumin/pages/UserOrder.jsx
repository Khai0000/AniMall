import '../styles/UserOrder.css';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, Suspense } from 'react';
import { setInitialOrders } from '../../ZongMing/slices/orderSlice';
import { lazy } from 'react';
import axios from 'axios';

const OrderCard=lazy(()=>import("../components/OrderCard"));

const UserOrder = () => {
    const order = useSelector((state) => state.orders.order);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(()=>{
        const fetchReceipts = async () =>{
            try{
                const response = await axios.get(`http://localhost:4000/api/orders/user/receipts?userId=${user.user.userUid}`);
                if(response.status===200){
                    const userReceipts = response.data.flatMap(order => order.receipts);
                    dispatch(setInitialOrders(userReceipts));
                }
            }catch(error){
                console.error('Error fetching receipts:', error);
            }
        };
        fetchReceipts();
    },[dispatch,user.user.userUid]);

    return (
        <div>
            <div id='Upper-section-userorder'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check-fill" viewBox="0 0 16 16">
                    <path fill="#3C95A9" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
                </svg>
                <span id='Upper-section-order'>My Order</span>
            </div>
            <div>
                {order && order.length !== 0 ?(
                    <Suspense fallback={<div>Loading...</div>}>
                        {order.map((receipt) => (
                            <OrderCard key={receipt._id} receipt={receipt} />
                        ))}
                    </Suspense>
                ) : <div className="NoProductContainer">
                    <p>There is no order yet!</p>
                </div>}
            </div>
        </div>
    )
}

export default UserOrder;