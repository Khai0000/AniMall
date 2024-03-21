import "./App.css";
import Layout from "./Layout/Layout";
import { createBrowserRouter, RouterProvider,createRoutesFromElements,Route } from "react-router-dom";
import Pet from "./pages/Pet";
import Community from "./pages/Community";
import Product from "./pages/Product";
import Services from "./pages/Services";
import Home from "./pages/Home";
import ForumPostDetails from "./ginkhai/pages/ForumPostDetails";
import ForumAddPost from "./ginkhai/pages/ForumAddPost";
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="/pet" element={<Pet/>}/>
        <Route path="/community" element={<Community/>}/>
        <Route path="/community/post/:postId" element={<ForumPostDetails/>}/> 
        <Route path="/community/post/add" element={<ForumAddPost/>}/> 
        <Route path="/product" element={<Product/>}/>
        <Route path="/community" element={<Community/>}/>
        <Route path="/services" element={<Services/>}/>
      </Route>
    )
  );

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
