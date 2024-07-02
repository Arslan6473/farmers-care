import { Link } from 'react-router-dom'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-[#256550] text-white py-12 ">
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
    <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
    <div>
      <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
      <p className="mb-4">
        A farmers helping web application where users can search pesticides deseases and products related to their crops.
      </p>
    </div>
    <div>
      <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
      <ul>
        <li>
          <Link
            to="/"
            className="hover:text-white transition-colors duration-300"
          >
            Crops
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className="hover:text-white transition-colors duration-300"
          >
            All Products
          </Link>
        </li>
        <li>
          <Link
            to="/weather"
            className="hover:text-white transition-colors duration-300"
          >
            Weather
          </Link>
          </li>
      </ul>
    </div>
    <div>
      <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
      <div className="flex space-x-4">
        <a
          href="#"
          className="hover:text-white transition-colors duration-300"
        >
          Facebook
        </a>
        <a
          href="#"
          className="hover:text-white transition-colors duration-300"
        >
          Twitter
        </a>
        <a
          href="#"
          className="hover:text-white transition-colors duration-300"
        >
          Instagram
        </a>
      </div>
    </div>
    <div>
      <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
      <p>Bahawalpur, Pakistan</p>
      <p>Bahawalpur 10101</p>
      <p>Email: Arslansarwar6473@gmail.com</p>
      <p>Phone: 03030212064</p>
    </div>
    </div>
    <p className="text-center text-xs pt-8">© 2024 Farmers Care. All rights reserved.</p>
    </div>
</footer>
  )
}

export default Footer