import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { deleteCartItemAsync, selectAllCartItems, selectCartStatus, updateCartAsync } from './cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../common/loader/Loader';

function Cart() {
    const notifyRemove = () => toast.success("Product removed from cart", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
    });

    const dispatch = useDispatch();
    const products = useSelector(selectAllCartItems);
    const status = useSelector(selectCartStatus);

    const totalAmount = products.reduce((amount, item) => item.product.price * item.quantity + amount, 0);

    const totalItems = products.reduce((total, item) => item.quantity + total, 0);

    const handleQuantity = (e, updatedItem) => {
        dispatch(updateCartAsync({ id: updatedItem._id, quantity: +e.target.value }));
    };

    const handleRemove = (id) => {
        dispatch(deleteCartItemAsync(id));
        notifyRemove();
    };

    return (
        <>
            {!products.length && <Navigate to='/' replace={true}></Navigate>}
            {status === "Loading" ? (
                <div className="flex justify-center items-center"><Loader /></div>
            ) : (
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white mt-6'>
                    <h2 className='text-4xl p-1 font-semibold'>
                        Cart
                    </h2>
                    <div className="mt-8">
                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200">
                                {products.map((product) => (
                                    <li key={product._id} className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src={product.product.thumbnail}
                                                alt={product.product.title}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>
                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <p>{product.product.title}</p>
                                                    </h3>
                                                    <p className="ml-4">
                                                        Rs. {product.product.price}
                                                    </p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{product.product.brand}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <div>
                                                    <label htmlFor="quantity" className="inline mr-3 text-sm font-medium leading-6 text-gray-900">
                                                        Qty
                                                    </label>
                                                    <select id="quantity"  value={product.quantity} onChange={(e) => handleQuantity(e, product)}>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </div>
                                                <div className="flex">
                                                    <button
                                                        onClick={() => handleRemove(product._id)}
                                                        type="button"
                                                        className="font-medium text-[#256550] hover:text-[#2b715a]"
                                                    >
                                                        Remove
                                                    </button>
                                                    <ToastContainer />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>Rs. {totalAmount}</p>
                        </div>
                        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                            <p>Total items in cart</p>
                            <p>{totalItems} items</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <Link
                                to="/checkout"
                                className="flex items-center justify-center rounded-md border border-transparent bg-[#256550] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#2b715a]"
                            >
                                Checkout
                            </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                or{' '}
                                <Link to="/">
                                    <button
                                        type="button"
                                        className="font-medium text-[#256550] hover:text-[#2b715a]"
                                    >
                                        Continue Shopping
                                        <span aria-hidden="true"> &rarr;</span>
                                    </button>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Cart;
