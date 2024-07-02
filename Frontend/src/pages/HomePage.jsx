import React from 'react'
import Crops from '../features/crop/components/Crops'
import ImageSlider from '../features/common/imageSilder/ImageSlider'


function HomePage() {
    return (
        <>
          
            <ImageSlider/>
            <Crops />
           
        </>
    )
}

export default HomePage