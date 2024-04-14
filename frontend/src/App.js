import "./App.css";
import Layout from "./Layout/Layout";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Pet from "./pages/Pet";
import Community from "./pages/Community";
import Product from "./pages/Product";
import Services from "./pages/Services";
import Home from "./pages/Home";
import SellerProduct from "./shumin/pages/SellerProduct";
import AddProduct from "./shumin/pages/AddProduct";
import ProductDetails from "./shumin/pages/ProductDetails";
import ProductCategorized from "./shumin/pages/ProductCategorized";
import PetDetails from "./shumin/pages/PetDetails";
import PetCategorized from "./shumin/pages/PetCategorized";
import AddPet from "./shumin/pages/AddPet";
import SellerPet from "./shumin/pages/SellerPet";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="/pet" element={<Pet/>}/>
        <Route path="/community" element={<Community/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/services" element={<Services/>}/> 
        <Route path="/seller/productwarehouse" element={<SellerProduct/>}/>
        <Route path="/seller/petwarehouse" element={<SellerPet/>}/>
        <Route path="/seller/addpet" element={<AddPet/>}/>
        <Route path="/seller/addproduct" element={<AddProduct/>}/>
        <Route path="/product/:title" element={<ProductDetails/>}/>
        <Route path="/pet/:title" element={<PetDetails/>}/>
        <Route path="/product/ProductCategorized/:category" element={<ProductCategorized/>}/>
        <Route path="/pet/PetCategorized/:category" element={<PetCategorized/>}/>
        <Route path="/seller/productwarehouse/:id" element={<AddProduct/>}/>
        <Route path="/seller/petwarehouse/:id" element={<AddPet/>}/>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;