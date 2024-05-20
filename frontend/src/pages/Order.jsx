import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setInitialOrders } from '../ZongMing/slices/orderSlice';
import { Outlet } from 'react-router-dom';

function Order() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderResponse = await axios.get('http://localhost:4000/api/orders');
        if (orderResponse.status === 200) {
          dispatch(setInitialOrders(orderResponse.data));
        } else {
          console.log(orderResponse);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (!orders) {
      fetchOrders();
    }
  }, [dispatch, orders]);

  return <Outlet />;
}

export default Order;
