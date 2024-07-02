import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { deleteCartItemAsync, selectAllCartItems, updateCartAsync } from '../features/cart/cartSlice';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice';
import { loggedInUserInfo, updateLoggedInUserAsync } from '../features/user/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Checkout() {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const dispatch = useDispatch();
    const products = useSelector(selectAllCartItems);
    const totalAmount = products.reduce((amount, item) => item.product.price * item.quantity + amount, 0);
    const totalItems = products.reduce((total, item) => item.quantity + total, 0);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const loggedInUser = useSelector(loggedInUserInfo);
    const orderPlaced = useSelector(selectCurrentOrder);

    const handleQuantity = (e, updatedItem) => {
        dispatch(updateCartAsync({ id: updatedItem._id, quantity: +e.target.value }));
    };

    const handleRemove = (e, id) => {
        dispatch(deleteCartItemAsync(id));
    };

    const handleAddress = (e, index) => {
        setSelectedAddress(loggedInUser.addresses[index]);
    };

    const notifyAddedAddress = () => toast.success("Address added successfully", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
    });

    const onSubmit = (data) => {
        const updatedUser = { ...loggedInUser, addresses: [...loggedInUser.addresses, data] };
        dispatch(updateLoggedInUserAsync(updatedUser));
        reset();
        notifyAddedAddress();
    };

    const notify = () => toast.error("Address and Payment method should be selected", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
    });

    const handleOrder = () => {
        if (selectedAddress && selectedPaymentMethod) {
            dispatch(createOrderAsync({
                products: [...products],
                user: loggedInUser._id,
                totalAmount,
                totalItems,
                status: "pending",
                selectedAddress,
                selectedPaymentMethod
            }));
        } else {
            notify();
        }
    };

    return (
        <>
            {!products.length && <Navigate to='/' replace />}
            {orderPlaced && <Navigate to={`/order-success/${orderPlaced._id}`} replace />}
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-5">
                    <div className='lg:col-span-3 bg-gray-100 py-5 px-3 my-6'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive your order.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">
                                                Full name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("fullname", { required: "Full name is required" })}
                                                    id="fullname"
                                                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#256550] sm:text-sm sm:leading-6"
                                                />
                                                {errors.fullname && <p className='text-red-500'>{errors.fullname.message}</p>}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                Phone
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="tel"
                                                    {...register("phone", { required: "Phone is required" })}
                                                    id="phone"
                                                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#256550] sm:text-sm sm:leading-6"
                                                />
                                                {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    {...register("email", { required: "Email is required" })}
                                                    type="email"
                                                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#256550] sm:text-sm sm:leading-6"
                                                />
                                                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="streetAddress" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("streetAddress", { required: "Street Address is required" })}
                                                    id="streetAddress"
                                                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#256550] sm:text-sm sm:leading-6"
                                                />
                                                {errors.streetAddress && <p className='text-red-500'>{errors.streetAddress.message}</p>}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("city", { required: "City is required" })}
                                                    id="city"
                                                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#256550] sm:text-sm sm:leading-6"
                                                />
                                                {errors.city && <p className='text-red-500'>{errors.city.message}</p>}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("state", { required: "State / Province is required" })}
                                                    id="state"
                                                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#256550]indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.state && <p className='text-red-500'>{errors.state.message}</p>}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                PIN code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("pinCode", { required: "PIN code is required" })}
                                                    id="pinCode"
                                                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#256550] sm:text-sm sm:leading-6"
                                                />
                                                {errors.pinCode && <p className='text-red-500'>{errors.pinCode.message}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button
                                    type="submit"
                                    className="rounded-md bg-[#256550] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#2c785f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add Address
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="lg:col-span-2 my-6">
                        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                            <ul className="divide-y divide-gray-200">
                                {products.map(item => (
                                    <li key={item._id} className="py-2 flex justify-between items-center">
                                        <span>{item.product.title}</span>
                                        <div className="flex items-center">
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantity(e, item)}
                                                className="mr-2 w-16 border border-gray-300 rounded text-center"
                                            />
                                            <span className="text-sm">Rs. {item.product.price}</span>
                                        </div>
                                        <button onClick={(e) => handleRemove(e, item._id)} className="ml-2 text-[#256550] hover:text-[#2c785f]">Remove</button>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t border-gray-200 mt-4 pt-4">
                                <div className="flex justify-between items-center">
                                    <span>Total Items:</span>
                                    <span>{totalItems}</span>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span>Total Amount:</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 mt-6">
                            <h3 className="text-lg font-semibold mb-2">Select Address</h3>
                            <ul className="divide-y divide-gray-200">
                                {loggedInUser?.addresses?.map((address, index) => (
                                    <li key={index} className="py-2 flex justify-between items-center">
                                        <span>{address.streetAddress}, {address.city}, {address.state}, {address.pinCode}</span>
                                        <input
                                            type="radio"
                                            name="address"
                                            onChange={(e) => handleAddress(e, index)}
                                            className="ml-2"
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 mt-6">
                            <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
                            <div className="flex flex-col">
                                <label className="inline-flex items-center mb-2">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="card"
                                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Card</span>
                                </label>
                                <label className="inline-flex items-center mb-2">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cash"
                                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Cash</span>
                                </label>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end">
                            <button
                                onClick={handleOrder}
                                className="rounded-md bg-[#256550] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#297159] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default Checkout;
