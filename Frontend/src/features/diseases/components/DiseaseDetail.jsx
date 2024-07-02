import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleDiseaseAsync, selectDiseasesStatus, selectSingleDisease } from '../diseaseSlice'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../common/loader/Loader'
import { fetchFilterProductsAsync, selectAllproducts } from '../../product/productSlice'

function DiseaseDetail() {
    const param = useParams()
    const dispatch = useDispatch()
    const disease = useSelector(selectSingleDisease)
    const status = useSelector(selectDiseasesStatus)
    const products = useSelector(selectAllproducts)

    useEffect(() => {
        const pagination = { _page: 1, _per_page: 4 };
        dispatch(fetchSingleDiseaseAsync(param.diseaseId))
        dispatch(fetchFilterProductsAsync({ pagination }))
    }, [param, dispatch])

    if (status === "Loading") {
        return <><div className='w-full flex justify-center items-center p-14'><Loader /></div></>
    }
    return (
        <>
            <div className='mx-auto max-w-7xl px-2 pb-12 sm:px-6 lg:px-8'>
                {disease && <>
                    <div className='flex justify-center flex-col mt-7 items-center'>
                        <div className=" h-80 overflow-hidden w-80 rounded-b-none rounded-lg bg-gray-200 ">
                            <img
                                src={disease.thumbnail}
                                alt={disease.title}
                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                            />
                        </div>
                        <div className='bg-[#256550] text-white w-80   rounded-b-lg h-16 pt-3 px-2  '><h3 className=" text-sm  text-center font-bold">{disease.title}</h3></div>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-1 mt-4'>
                        <h4 className='text-md font-medium pt-2'>Caused By</h4>
                        <h5 className='text-md font-medium text-[#256550]'>{disease.causedBy}</h5>
                        <p className='pt-4 text-justify px-4'>{disease.description}</p>
                    </div></>}

            </div>

            <div className='mx-auto max-w-7xl px-2 pb-12 sm:px-6 lg:px-8'>
                <div className='mt-3'>
                    <h2 className='text-left text-3xl font-bold uppercase  py-8 mb-3'>Recomended Products</h2>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
                        {products && products.map((product) => (
                            <Link key={product._id} to={`/products/product/${product._id}`} className="group">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-b-none rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    />
                                </div>
                                <div className='bg-[#256550] text-white rounded-b-lg h-16 pt-3 px-2  '><h3 className=" text-center text-xl font-bold">Buy Now</h3></div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DiseaseDetail
