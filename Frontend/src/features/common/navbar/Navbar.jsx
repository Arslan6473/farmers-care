import { Fragment } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaCartShopping } from "react-icons/fa6";
import { selectAllCartItems } from '../../cart/cartSlice';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../auth/authSlice';
import { FaUserCircle } from "react-icons/fa";




function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const location = useLocation();
  const cartItems = useSelector(selectAllCartItems);
  const user = useSelector(getCurrentUser)

  let navigation = [
    { name: 'HOME', href: '/',role: 'user' },
    { name: 'DISEASES', href: '/diseases',role: 'user' },
    { name: 'PESTS', href: '/pests',role: 'user' },
    { name: 'PRODUCTS', href: '/products' ,role: 'user'},
    { name: 'WEATHER', href: '/weather',role: 'user' }
  ];

  if (user && user.role === 'admin') {
    navigation = [
      ...navigation,
      { name: 'ADMIN PRODUCTS', href: '/admin/admin-products', role: 'admin' },
      { name: 'ORDERS', href: '/admin/orders', role: 'admin' },
    ];
  }
 

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:justify-between">
                <div className="flex-shrink-0 text-[#256550] text-xl font-semibold">
                  Farmers Care
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:justify-center">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href
                            ? 'border-b-[3px] border-b-[#256550] text-[#256550]'
                            : 'text-c hover:text-[#2b715a]',
                          'px-3 py-2 text-sm font-semibold'
                        )}
                        aria-current={location.pathname === item.href ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {user && <>
              <Link to="/cart">
                <button
                  type="button"
                  className="relative rounded-full bg-white p-1 text-gray-400 hover:text-[#256550] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <FaCartShopping className="h-6 w-6" aria-hidden="true" />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-[#256550] rounded-full">{cartItems.length}</span>
                </button>
                </Link>
                </>}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                  {user &&  
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                    <FaUserCircle className='text-3xl text-gray-400'/>
                    </MenuButton>}
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ active }) => (
                          <Link
                           to="/user-profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <Link
                            to="/my-orders"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            My Orders
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <Link
                          to="/signout"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </Link>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link key={item.name} to={item.href}>
                  <DisclosureButton
                    className={classNames(
                      location.pathname === item.href
                        ? 'border-b-[3px] border-b-[#256550] text-[#256550]'
                        : 'text-[#256550] hover:text-[#2b715a]',
                      'block px-3 py-2 text-base font-medium'
                    )}
                    aria-current={location.pathname === item.href ? 'page' : undefined}
                  >
                    {item.name}
                  </DisclosureButton>
                </Link>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
