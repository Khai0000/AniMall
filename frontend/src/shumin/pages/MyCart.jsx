import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState, lazy, Suspense } from 'react';
import { checkoutItems } from '../slices/CartSlice';

const CartCard = lazy(() => import("../components/CartCard"));

function MyCart() {
    const item = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let newTotalPrice = 0;

        item.forEach((item) => {
            if (item.checked) {
                if (item.type === "service") {
                    newTotalPrice += item.price;
                } else {
                    newTotalPrice += item.price * item.quantity;
                }
            }
        });

        setTotalPrice(Number(newTotalPrice));
    }, [item]);

    const handleOnCheckoutButtonClick = async () => {
        let numOfCheckedItem = 0;
        const checkedItems = item.filter((item) => item.checked);

        if (checkedItems.length === 0) {
            alert("No item to checkout!");
            return;
        }

        if (!user.address || !user.email) {
            alert("Please fill in your address and email before checkout.");
            return;
        }

        try {

            console.log("Checkout Data:", {
                userId: user.userUid,
                username: user.username,
                email: user.email,
                address: user.address,
                products: checkedItems.map(item => ({
                    productId: item.id,
                    price: item.price,
                    type: item.type,
                    quantity: item.quantity,
                    image: item.image,
                })),
                totalPrice: totalPrice
            });

            const response = await axios.post('http://localhost:4000/api/orders/receipts', {
                userId: user.id,
                username: user.username,
                email: user.email,
                address: user.address,
                products: checkedItems.map(item => ({
                    productId: item.id,
                    price: item.price,
                    type: item.type,
                    quantity: item.quantity,
                    image: item.image[0],
                })),
                totalPrice: totalPrice
            });

            if (response.status === 201) {
                numOfCheckedItem = checkedItems.length;
                dispatch(checkoutItems(checkedItems));
                alert(`${numOfCheckedItem} item(s) checked out successfully!`);
            } else {
                alert("Checkout failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during checkout:", error);
            alert("An error occurred during checkout. Please try again.");
        }
    };

    return (
        <div>
            <div id='Upper-section'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16 16C14.89 16 14 16.89 14 18C14 18.5304 14.2107 19.0391 14.5858 19.4142C14.9609 19.7893 15.4696 20 16 20C16.5304 20 17.0391 19.7893 17.4142 19.4142C17.7893 19.0391 18 18.5304 18 18C18 17.4696 17.7893 16.9609 17.4142 16.5858C17.0391 16.2107 16.5304 16 16 16ZM0 0V2H2L5.6 9.59L4.24 12.04C4.09 12.32 4 12.65 4 13C4 13.5304 4.21071 14.0391 4.58579 14.4142C4.96086 14.7893 5.46957 15 6 15H18V13H6.42C6.3537 13 6.29011 12.9737 6.24322 12.9268C6.19634 12.8799 6.17 12.8163 6.17 12.75C6.17 12.7 6.18 12.66 6.2 12.63L7.1 11H14.55C15.3 11 15.96 10.58 16.3 9.97L19.88 3.5C19.95 3.34 20 3.17 20 3C20 2.73478 19.8946 2.48043 19.7071 2.29289C19.5196 2.10536 19.2652 2 19 2H4.21L3.27 0M6 16C4.89 16 4 16.89 4 18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20C6.53043 20 7.03914 19.7893 7.41421 19.4142C7.78929 19.0391 8 18.5304 8 18C8 17.4696 7.78929 16.9609 7.41421 16.5858C7.03914 16.2107 6.53043 16 6 16Z" fill="#3C95A9" />
                </svg>
                <span id='Upper-section-warehouse'>My Cart</span>
            </div>
            <div>
                {item.length !== 0 ? (
                    <>
                        <div>
                            <Suspense fallback={<div>Loading...</div>}>
                                {item.map((item) => (
                                    <CartCard key={item.uniqueId} product={item} />
                                ))}
                            </Suspense>
                        </div>
                    </>
                ) : <div className="NoProductContainer">
                    <p>There is no item added yet!</p>
                </div>}
            </div>
            <div className='checkout-container'>
                <span className="total-price">Total : RM {totalPrice.toFixed(2)} </span>
                <button className="checkout-button" onClick={handleOnCheckoutButtonClick}>CHECK OUT</button>
            </div>
        </div>
    )
}

export default MyCart;
