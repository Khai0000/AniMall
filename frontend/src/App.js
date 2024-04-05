// Assuming this is your main routing configuration file, such as App.js

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
import ServiceDetail from "./ZongMing/pages/ServiceDetail"; // Import ServiceDetail component

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="/pet" element={<Pet/>}/>
        <Route path="/community" element={<Community/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/services" element={<Services/>}/> {/* Link to Services component */}
        <Route path="/serviceDetails/:title" element={<ServiceDetail/>}/> {/* Define route for ServiceDetail */}
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
