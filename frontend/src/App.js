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
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index path="/pet" element={<Pet />} />
        <Route path="/community" element={<Community />} />
        <Route path="/product" element={<Product />} />
        <Route path="/community" element={<Community />} />
        <Route path="/services" element={<Services />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
