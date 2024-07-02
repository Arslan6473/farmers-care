import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllproducts, selectProductsStatus, selecttotalItems, fetchFilterProductsAsync, fetchCategoriesAsync } from '../../product/productSlice';
import { ITEMS_PER_PAGE } from '../../../app/contant';
import Loader from '../../common/loader/Loader';
import Pagination from '../../common/pagination/Pagination';



function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllproducts);
  const [search, setSearch] = useState("")
  const productStatus = useSelector(selectProductsStatus);
  const [page, setPage] = useState(1);
  const totalItems = useSelector(selecttotalItems);

  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
    const searchQuery = { _search: search }
    dispatch(fetchFilterProductsAsync({ pagination ,searchQuery}));
    dispatch(fetchCategoriesAsync())
  }, [page, dispatch]);

  useEffect(() => {
    setPage(1);
  }, [totalItems]);

  const handlePage = (page) => {
    setPage(page);
  };

  if (productStatus === "Loading") {
    return (
      <div className='w-full flex justify-center items-center p-14'>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-2 pb-12 sm:px-6 lg:px-8">
        <h2 className='text-center text-5xl font-bold uppercase p-6 py-12 mb-3'>All Products</h2>
        <form className="form relative  ">
          <input
            className="input rounded-full w-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-lg"
            placeholder="Search..."
            required=""
            type="text"
            onChange={e => setSearch(e.target.value)}
          />
          <button type="reset" className="absolute right-3 -translate-y-1/2 top-1/2 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </form>
        <div className='mt-6'>
          <Link to="/product-form">
            <div className='bg-[#256550] cursor-pointer text-white w-[20%] my-6 rounded-lg h-14 pt-3 px-6 '><h3 className=" text-center text-lg font-bold">Add Product</h3></div>
          </Link>
          <div className="grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
            {products && products.map((product) => (
              <div className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-b-none rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <Link to={`/product-form/${product._id}`}>
                <div className='bg-[#256550] text-white rounded-b-lg h-16 pt-3 px-2  '><h3 className=" text-center text-xl font-bold">Edit Product</h3></div></Link>
              </div>
            ))}
          </div>
        </div>
        <Pagination handlePage={handlePage} totalItems={totalItems} page={page} />
      </div>
    </>
  );
}

export default ProductList;
