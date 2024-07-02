import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllCropsAsync, selectAllCrops, selectCropsStatus } from '../cropSlice';
import Loader from '../../common/loader/Loader';

function Crops() {
    const dispatch = useDispatch()
    const crops = useSelector(selectAllCrops)
    const status = useSelector(selectCropsStatus)

    useEffect(() => {
        dispatch(fetchAllCropsAsync())
    }, [dispatch])

    if (status === "Loading") {
        return <><div className='w-full flex justify-center items-center p-14'><Loader /></div></>
    }
    return (
        <>  
             
            <div className="mx-auto max-w-7xl px-2 pb-12 sm:px-6 lg:px-8">
                <h2 className='text-center text-5xl font-bold uppercase p-6 py-12 mb-3'>Popular Crops</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-1 lg:grid-cols-2">
                    {crops && crops.map((crop) => (
                        <Link key={crop._id} to={`crop/${crop._id}`} className="group">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-b-none rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    src={crop.thumbnail}
                                    alt={crop.title}
                                   
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
     
                            </div>  
                            <div className='bg-[#256550] text-white rounded-b-lg'><h3 className=" p-8 text-2xl text-center font-bold">{crop.title}</h3></div>                       
                        </Link>
                    ))}
                </div>
            </div>

        </>

    )
}

export default Crops