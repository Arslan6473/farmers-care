import React from 'react'
import Navbar from '../features/common/navbar/Navbar'
import Footer from '../features/common/footer/Footer'
import { Outlet } from 'react-router-dom'



function Rapper() {
  return (
    <>
   <Navbar/>
   <main>
    <Outlet/>
   </main>
   <Footer/>
    </>
  )
}

export default Rapper