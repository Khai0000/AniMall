import "./App.css";
import Layout from "./Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Pet from "./pages/Pet";
import Community from "./pages/Community";
import Product from "./pages/Product";
import Services from "./pages/Services";
import Home from "./pages/Home";
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
// import ForumPostDetails from "./ginkhai/pages/ForumPostDetails";
// import ForumAddPost from "./ginkhai/pages/ForumAddPost";
// import ForumHome from "./ginkhai/pages/ForumHome";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
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
            // { path: "/community", element: <ForumHome /> },
            // { path: "/community/post/:postId", element: <ForumPostDetails /> },
            // { path: "/community/post/add", element: <ForumAddPost /> },
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

        { path: "/services", element: <Services /> },
        { path: "/mycart", element:<MyCart/>},
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;