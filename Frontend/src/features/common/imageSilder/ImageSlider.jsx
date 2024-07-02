import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { getCurrentUser } from '../../auth/authSlice';


const fadeImages = [
  {
    url: 'https://images.unsplash.com/photo-1542547856-6a2768c7b580?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'First Slide'
  },
  {
    url: 'https://images.unsplash.com/photo-1629797476185-b58789432b19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Second Slide'
  },
  {
    url: 'https://images.unsplash.com/photo-1691326564837-51e3619f1d70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Third Slide'
  },
  {
    url: 'https://images.unsplash.com/photo-1549888728-c4df900ccba7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Fourth Slide'
  },

];


function ImageSlider() {

  const user = useSelector(getCurrentUser)
  return (
    <div className="slide-container relative w-full h-[88vh]">
      <Fade>
        {fadeImages.map((fadeImage, index) => (
          <div key={index} className="relative h-full">
            <img className="w-full h-[88vh] object-cover" src={fadeImage.url} alt={`Slide ${index + 1}`} />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-4">
              <h1 className="md:text-7xl sm:text-5xl text-4xl text-center mb-5 font-bold leading-[50px] md:leading-[90px]">Empowering Farmers <br /> with Comprehensive Crop<br /> Health Solutions</h1>
              <Link to="/products"><div className="mb-5 text-lg hover:text-gray-300 font-medium cursor-pointer">Explore Products</div></Link>
              <div className="flex space-x-4">
                {!user && <> <Link to="/signup">
                  <button className="px-4 py-2 bg-[#256550] hover:bg-[#2b715a] rounded">Sign Up</button>
                </Link>
                  <Link to="/signin">
                    <button className="px-4 py-2 bg-[#256550] hover:bg-[#2b715a] rounded">Log In</button>
                  </Link>
                </>


                }

              </div>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
}

export default ImageSlider;
