import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState, lazy, Suspense } from 'react';
import { checkoutItems,setCartItems } from '../slices/CartSlice';
import { editPet } from '../slices/PetSlice';
import { editProduct } from '../slices/ProductSlice';

const CartCard = lazy(() => import("../components/CartCard"));

function MyCart() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const cartItems = useSelector((state) => state.cart);
    const [totalPrice, setTotalPrice] = useState(0);
    const userUid = user.userUid;
    const products = useSelector((state) => state.products);
    const pets = useSelector((state) => state.pets);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/cart/${userUid}`);
                if (response.status === 200) {
                    dispatch(setCartItems(response.data.items));
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    console.log(products);

    useEffect(() => {
        let newTotalPrice = 0;

        cartItems.forEach((item) => {
            if (item.checked) {
                if (item.type === "service") {
                    newTotalPrice += item.price;
                } else {
                    newTotalPrice += item.price * item.quantity;
                }
            }
        });

        setTotalPrice(Number(newTotalPrice));
    }, [cartItems]);

    const handleOnCheckoutButtonClick = async () => {
        let numOfCheckedItem = 0;
        const checkedItems = cartItems.filter((item) => item.checked);
        console.log("check",checkedItems)

        if (checkedItems.length === 0) {
            alert("No item to checkout!");
            return;
        }

        if (!user.address || !user.email) {
            alert("Please fill in your address and email before checkout.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/orders/receipts', {
                userId: user.userUid,
                username: user.username,
                email: user.email,
                address: user.address,
                phone:user.phone,
                products: checkedItems.map(item => ({
                    productId: item.productId,
                    price: item.price,
                    type: item.type,
                    quantity: item.type === "service" ? item.slot : item.quantity,
                    image: item.image[0],
                    title: item.title,
                    date: item.type === "service" ? item.date : "",
                })),
                totalPrice: totalPrice.toFixed(2)
            });

            if (response.status === 201) {
                numOfCheckedItem = checkedItems.length;
                alert(`${numOfCheckedItem} item(s) checked out successfully!`);

                await Promise.all(
                    checkedItems.map(async (item) => {
                        try {
                            const response = await axios.delete(`http://localhost:4000/api/cart/remove/${user.userUid}/${item._id}`);
                            if (response.status === 200) {
                                dispatch(checkoutItems({ itemId: item.productId }));
                                return response.data;
                            }
                        } catch (error) {
                            console.error(`Error removing item ${item._id} from cart:`, error);
                            throw error;
                        }
                    })
                );

                await Promise.all(
                    checkedItems.map(async (item) => {
                        if (item.type !== "service") {
                            const product = products.find(p => p._id === item.productId);
                            const pet = pets.find(p => p._id === item.productId);
                
                            let newStockLevel;
                            let updateEndpoint;
                            let dispatchAction;
                
                            if (product) {
                                newStockLevel = product.stockLevel - item.quantity;
                                updateEndpoint = `http://localhost:4000/api/product/product/${item.productId}`;
                                dispatchAction = editProduct({ id: item.productId, stockLevel: newStockLevel });
                            } else if (pet) {
                                newStockLevel = pet.stockLevel - item.quantity;
                                updateEndpoint = `http://localhost:4000/api/pet/pet/${item.productId}`;
                                dispatchAction = editPet({ _id: item.productId, stockLevel: newStockLevel });
                            }
                
                            if (newStockLevel !== undefined && updateEndpoint && dispatchAction) {
                                try {
                                    const stockUpdateResponse = await axios.put(updateEndpoint, {
                                        stockLevel: newStockLevel
                                    });
                
                                    if (stockUpdateResponse.status === 200) {
                                        dispatch(dispatchAction);
                                    } else {
                                        console.error('Failed to update stock level:', stockUpdateResponse);
                                    }
                                } catch (error) {
                                    console.error(`Error updating stock level for ${item.productId}:`, error);
                                }
                            }
                        }
                    })
                );                

                // refresh cart items after removal
                const updatedCartResponse = await axios.get(`http://localhost:4000/api/cart/${user.userUid}`);
                if (updatedCartResponse.status === 200) {
                    dispatch(setCartItems(updatedCartResponse.data.items));
                }

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
                {cartItems.length !== 0 ? (
                    <>
                        <div>
                            <Suspense fallback={<div>Loading...</div>}>
                                {cartItems.map((item) => (
                                    <CartCard key={item.productId} product={item} />
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
