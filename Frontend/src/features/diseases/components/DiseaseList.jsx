import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDiseasesAsync, selectAllDiseases, selectDiseasesStatus, selectTotalDisease } from '../diseaseSlice';
import Loader from '../../common/loader/Loader';
import Pagination from '../../common/pagination/Pagination';
import { ITEMS_PER_PAGE } from '../../../app/contant';
import { Link } from 'react-router-dom';

function DiseaseList() {
    const dispatch = useDispatch();
    const diseases = useSelector(selectAllDiseases);
    const diseasesStatus = useSelector(selectDiseasesStatus);
    const [page, setPage] = useState(1);
    const totalItems = useSelector(selectTotalDisease);

    useEffect(() => {
        const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
        dispatch(fetchAllDiseasesAsync(pagination));
    }, [page, dispatch]);

    useEffect(() => {
        setPage(1);
    }, [totalItems]);

    const handlePage = (page) => {
        setPage(page);
    };

    if (diseasesStatus === "Loading") {
        return (
            <div className='w-full flex justify-center items-center p-14'>
                <Loader />
            </div>
        );
    }

    return (
        <>
            <div className="mx-auto max-w-7xl px-2 pb-12 sm:px-6 lg:px-8">
                <h2 className='text-center text-5xl font-bold uppercase p-6 py-12 mb-3'>Diseases List</h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
                    {diseases && diseases.map((disease) => (
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
                    ))}
                </div>
                <Pagination handlePage={handlePage} totalItems={totalItems} page={page} />
            </div>
        </>
    );
}

export default DiseaseList;
