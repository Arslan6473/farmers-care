import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchSingleCropAsync, selectCropsStatus, selectSingleCrop } from '../cropSlice'
import Loader from '../../common/loader/Loader'
import { fetchSelectedDiseasesAsync, selectAllDiseases, selectDiseasesStatus } from '../../diseases/diseaseSlice'
import { fetchSelectedPestsAsync, selectAllPests, selectPestsStatus } from '../../pests/pestSlice'

function CropDetail() {
    const params = useParams()
    const dispatch = useDispatch()
    const crop = useSelector(selectSingleCrop)
    const diseases = useSelector(selectAllDiseases)
    const pests = useSelector(selectAllPests)

    const status = useSelector(selectCropsStatus)
    const diseasesStatus = useSelector(selectDiseasesStatus)
    const petsStatus = useSelector(selectPestsStatus)


    useEffect(() => {
        dispatch(fetchSingleCropAsync(params.id))
    }, [dispatch, params.id])

    useEffect(() => {
        if (crop && crop.name) {
            console.log(crop.name)
            dispatch(fetchSelectedDiseasesAsync(crop.name))
            dispatch(fetchSelectedPestsAsync(crop.name))

        }
    }, [dispatch, crop])

    if (status === "Loading") {
        return <><div className='w-full flex justify-center items-center p-14'><Loader /></div></>
    }


    return (
        <>
            <div>{
                crop && <><img className="w-full h-[88vh] object-cover" src={crop.thumbnail} alt={crop.title} />
                    <div className="mx-auto max-w-7xl px-2 pb-12 sm:px-6 lg:px-8">
                        <div className='text-5xl p-3 font-semibold py-6 '>{crop.title}<span className='ml-4 text-3xl text-[#256550] font-medium'>{crop.monthOfGrowth}</span></div>
                        <p className='p-3 text-justify text-md'>{crop.description}</p>
                    </div></>}
                <div className='mx-auto max-w-7xl px-2 pb-12 sm:px-6 lg:px-8'>
                    <div>
                        <div className='text-5xl p-3 font-semibold py-6 '>Diseases</div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-5">
                            {diseasesStatus === "Loading" ? <><div className='w-full flex justify-center items-center p-14'><Loader /></div></> :
                                diseases && diseases.map((disease) => (
                                    <Link key={disease._id} to={`disease/${disease._id}`} className="group">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-b-none rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                            <img
                                                src={disease.thumbnail}
                                                alt={disease.title}
                                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                            />
                                        </div>
                                        <div className='bg-[#256550] text-white rounded-b-lg h-16 pt-3 px-2  '><h3 className=" text-sm  text-center font-bold">{disease.title}</h3></div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className='text-5xl p-3 font-semibold py-6 '>Pests</div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-5">
                            {petsStatus === "Loading" ? <><div className='w-full flex justify-center items-center p-14'><Loader /></div></> :
                                pests && pests.map((pest) => (
                                    <Link key={pest._id} to={`pest/${pest._id}`} className="group">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-b-none rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                            <img
                                                src={pest.thumbnail}
                                                alt={pest.title}
                                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                            />
                                        </div>
                                        <div className='bg-[#256550] text-white rounded-b-lg h-16 pt-3 px-2  '><h3 className=" text-sm text-center font-bold">{pest.title}</h3></div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default CropDetail
