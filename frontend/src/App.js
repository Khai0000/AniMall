import "./App.css";
import Layout from "./Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Pet from "./pages/Pet";
import Community from "./pages/Community";
import Product from "./pages/Product";
import Services from "./pages/Services";
import Home from "./pages/Home";
import ServiceDetail from "./ZongMing/pages/ServiceDetail"; 
import ServiceHome from "./ZongMing/pages/ServiceHome";
import AddServiceComponent from "./ZongMing/pages/AddService";
import SellerService from "./ZongMing/pages/SellerService"
import PetDetails from "./shumin/pages/PetDetails";
import ProductDetails from "./shumin/pages/ProductDetails";
import MyCart from "./shumin/pages/MyCart";
import PetCategorized from "./shumin/pages/PetCategorized";
import ProductCategorized from "./shumin/pages/ProductCategorized";
import AddProduct from "./shumin/pages/AddProduct";
import SellerProduct from "./shumin/pages/SellerProduct";
import SellerPet from "./shumin/pages/SellerPet";
import AddPet from "./shumin/pages/AddPet";
import ProductHome from "./shumin/pages/ProductHome";
import PetHome from "./shumin/pages/PetHome";
import ForumPostDetails from "./ginkhai/pages/ForumPostDetails";
import ForumAddPost from "./ginkhai/pages/ForumAddPost";
import ForumHome from "./ginkhai/pages/ForumHome";
import Login from './shuhui/pages/Login'
import Register from './shuhui/pages/Register'
import ResetPassword from './shuhui/pages/ResetPassword'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/authentication", children:[
          { path: "/authentication/login", element: <Login/>},
          { path: "/authentication/register", element: <Register/>},
          { path: "/authentication/reset-password", element: <ResetPassword/>},

      ]},
        { 
          path: "/pet",
          element: <Pet />,
          children: [
            { path: "/pet", element: <PetHome/>},
            { path: "/pet/:title", element:<PetDetails/>},
            { path: "/pet/PetCategorized/:category", element:<PetCategorized/>},
            { path: "/pet/sellerPet/add-pet", element:<AddPet/>},
            { path: "/pet/sellerPet", element:<SellerPet/>},
            { path: "/pet/sellerPet/add-pet/:id", element:<AddPet/>}
          ]
        },
        {
          path: "/community",
          element: <Community />,
          children: [
            { path: "/community", element: <ForumHome /> },
            { path: "/community/post/:postId", element: <ForumPostDetails /> },
            { path: "/community/post/add", element: <ForumAddPost /> },
          ],
        },
        { 
          path: "/product", 
          element: <Product />,
          children:[
            { path: "/product" ,element:<ProductHome/>},
            { path: "/product/:title", element:<ProductDetails/>},
            { path: "/product/ProductCategorized/:category", element:<ProductCategorized/>},
            { path: "/product/sellerProduct/add-product", element:<AddProduct/>},
            { path: "/product/sellerProduct", element:<SellerProduct/>},
            { path: "/product/sellerProduct/add-product/:id", element:<AddProduct/>}
          ]
        },

        {
          path: "/services",
          element: <Services />,
          children: [
            { path: "/services", element: <ServiceHome /> },
            { path: "/services/sellerService", element: <SellerService /> },
            {
              path: "/services/serviceDetails/:title",
              element: <ServiceDetail />,
            },
            {
              path: "/services/sellerService/add-service",
              element: <AddServiceComponent />,
            },
            {
              path: "/services/sellerService/add-service/:serviceTitle",
              element: <AddServiceComponent />,
            },
          ],
        },        
        { path: "/mycart", element:<MyCart/>},
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

