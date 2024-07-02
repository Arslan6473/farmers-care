import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CartPage, Checkout, CropDetailPage, WeatherPage, DiseaseDetailPage, DiseasesListPage, HomePage, OrderSuccess, PestDetailPage, PestsListPage, ProductDetailPage, ProductListPage, Rapper, SigninPage, SignupPage, UserOrdersPage, UserProfilePage } from './pages';
import Protected from './features/auth/components/Protected';
import { fetchAllCartItemsAsync } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from './features/auth/authSlice';
import { useEffect } from 'react';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminProtected from './features/admin/components/AdminProtected';
import AdminProductListPage from './pages/AdminProductListPage';
import Signout from './features/auth/components/Signout'
import ProductForm from './features/admin/components/ProductForm'
import { fetchWeatherDataAsync } from './features/weather/weatherSlice';




function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Rapper />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/signin",
          element: <SigninPage />,
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
        {
          path: "/admin/orders",
          element: <AdminProtected><AdminOrdersPage /></AdminProtected>
        },
        {
          path: "/admin/admin-products",
          element: <AdminProtected><AdminProductListPage /></AdminProtected>
        },
        {
          path: "/crop/:id",
          element: <CropDetailPage />,
        },
        {
          path: "/crop/:id/disease/:diseaseId",
          element: <DiseaseDetailPage />,
        },
        {
          path: "/diseases/disease/:diseaseId",
          element: <DiseaseDetailPage />,
        },
        {
          path: "/crop/:id/pest/:pestId",
          element: <PestDetailPage />,
        },
        {
          path: "/pests/pest/:pestId",
          element: <PestDetailPage />,
        },
        {
          path: "/diseases",
          element: <DiseasesListPage />,
        },
        {
          path: "/pests",
          element: <PestsListPage />,
        },
        {
          path: "/products",
          element: <ProductListPage />,
        },
        {
          path: "/weather",
          element: <WeatherPage/>,
        },
        {
          path: "/products/product/:id",
          element:<Protected> <ProductDetailPage /></Protected>
        },
        {path:"/cart",
          element:<CartPage/>
        },
        {path:"/checkout",
          element:<Checkout/>
        },
        {path:"/user-profile",
          element:<UserProfilePage/>
        },
        {path:"/my-orders",
          element:<UserOrdersPage/>
        },
        {path:"/product-form/:id",
          element:<AdminProtected><ProductForm/></AdminProtected>
        },
        {path:"/product-form",
          element:<AdminProtected><ProductForm/></AdminProtected>
        },
    
      ],
    },
    
    {path:"/order-success/:id",
      element:<OrderSuccess/>
    },
    {path:"/signout",
      element:<Signout/>
    },

  ])

  const user = useSelector(getCurrentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
        dispatch(fetchAllCartItemsAsync(user._id));
        dispatch(fetchLoggedInUserAsync(user._id))
    }
}, [dispatch, user]);

useEffect(() => {
  dispatch(fetchWeatherDataAsync("bahawalpur"));
  
}, []);
  return (
    
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
