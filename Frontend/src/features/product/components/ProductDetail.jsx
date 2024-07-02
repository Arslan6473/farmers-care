import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleproductAsync, selectProductsStatus, selectSingleproduct } from '../productSlice';
import { useParams } from 'react-router-dom';
import Loader from '../../common/loader/Loader';
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCartAsync, selectAllCartItems } from '../../cart/cartSlice';
import { loggedInUserInfo } from '../../user/userSlice';

function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(selectSingleproduct);
    const cartItems = useSelector(selectAllCartItems);
    const loggedInUser = useSelector(loggedInUserInfo);
    const status = useSelector(selectProductsStatus);

   

    const notifyAddProduct = () => toast.success("Added to cart", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
    });

    const notifyProductAlready = () => toast.error("Already added to cart", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
    });

    useEffect(() => {
        dispatch(fetchSingleproductAsync(id));
    }, [dispatch, id]);

    const handleCart = (e) => {
        e.preventDefault();
        if (cartItems.findIndex((cartItem) => cartItem.product._id === product._id) < 0) {
            const newProduct = { product: product._id, quantity: 1, user: loggedInUser._id };
            dispatch(addToCartAsync(newProduct));
            notifyAddProduct();
        } else {
            notifyProductAlready();
        }
    };

    if (status === "Loading") {
        return (
            <div className='w-full flex justify-center items-center p-14'>
                <Loader />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-2 pb-12 sm:px-6 lg:px-8 my-8">  {/* Add top and bottom margin */}
            {product &&
                <div className="flex flex-col items-center pt-5">
                    <div className="mx-auto max-w-7xl px-2 pb-12 sm:px-6 lg:px-8 ">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 lg:gap-8 h-full">
                            <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                <img src={product.thumbnail} alt={product.title} className="object-cover object-center w-full h-full" />
                            </div>
                            <div className="sm:col-span-8 lg:col-span-7 flex flex-col justify-between">  {/* Ensure the button is at the bottom */}
                                <div>
                                    <h2 className="text-2xl font-bold text-[#256550]">{product.title}</h2>

                                    <section aria-labelledby="information-heading" className="mt-2 mb-4">  {/* Add gap between sections */}
                                        <h3 id="information-heading" className="sr-only">Product information</h3>
                                        <p className="text-2xl text-gray-900">Price: {product.price}</p>
                                    </section>

                                    <section aria-labelledby="information-heading" className="mb-4">  {/* Add gap between sections */}
                                        <p className="text-2xl text-gray-900">Discount: {product.discountPercentage} %</p>
                                    </section>

                                    <section aria-labelledby="information-heading" className="mb-4">  {/* Add gap between sections */}
                                        <p className="text-2xl text-gray-900">Ingredients: {product.ingredients}</p>
                                    </section>

                                    <section aria-labelledby="information-heading" className="mb-4">  {/* Add gap between sections */}
                                        <p className="text-2xl text-gray-900">Company: {product.company}</p>
                                    </section>

                                    <section aria-labelledby="information-heading" className="mb-4">  {/* Add gap between sections */}
                                        <p className="text-2xl text-gray-900">Crops: {product.crops}</p>
                                    </section>

                                    <section aria-labelledby="information-heading" className="mb-4 flex justify-start gap-x-3 items-center">  {/* Add gap between sections */}
                                        <p className="text-2xl text-gray-900">Rating: {product.rating} </p>
                                        <FaStar />
                                    </section>

                                    <section aria-labelledby="information-heading" className="mb-4">  {/* Add gap between sections */}
                                        <p className="text-2xl text-gray-900">Pack Size: {product.packSize}</p>
                                    </section>

                                    <section aria-labelledby="information-heading" className="mb-4 flex flex-col justify-start items-start">  {/* Add gap between sections */}
                                        <h3 className="text-2xl text-gray-900">Description</h3>
                                        <p className="text-xl p-2 text-justify text-gray-900">{product.description}</p>
                                    </section>
                                </div>

                                <section aria-labelledby="options-heading" className="mt-10">
                                    <h3 id="options-heading" className="sr-only">Product options</h3>
                                    <button
                                        onClick={handleCart}
                                        type="submit"
                                        className="mt-9 flex w-full items-center justify-center rounded-md border border-transparent bg-[#256550] px-8 py-3 text-base font-medium text-white hover:bg-[#2b715a] focus:outline-none focus:ring-2 focus:ring-[#2b715a] focus:ring-offset-2"
                                    >
                                        Add to bag
                                    </button>
                                    <ToastContainer />
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ProductDetail;
