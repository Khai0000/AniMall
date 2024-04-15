import "./App.css";
import Layout from "./Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Pet from "./pages/Pet";
import Community from "./pages/Community";
import Product from "./pages/Product";
import Services from "./pages/Services";
import Home from "./pages/Home";
import ServiceDetail from "./ZongMing/pages/ServiceDetail"; // Import ServiceDetail component
import ServiceHome from "./ZongMing/pages/ServiceHome";
import AddServiceComponent from "./ZongMing/pages/AddService";
import SellerService from "./ZongMing/pages/SellerService";

// function App() {
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<Layout/>}>
//         <Route index element={<Home/>}/>
//         <Route path="/pet" element={<Pet/>}/>
//         <Route path="/community" element={<Community/>}/>
//         <Route path="/product" element={<Product/>}/>
//         <Route path="/services" element={<Services/>}/> {/* Link to Services component */}
//         <Route path="/serviceDetails/:title" element={<ServiceDetail/>}/> {/* Define route for ServiceDetail */}
//         <Route path="/sellerService" element={<SellerService/>}/> {/* Route for SellerService */}
//         <Route path="/add-service" element={<AddServiceComponent />} />
//       </Route>
//     )
//   );

//   return <RouterProvider router={router} />;
// }

// export default App;

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },

        { path: "/pet", element: <Pet /> },
        {
          path: "/community",
          element: <Community />,
          // children: [
          //   { path: "/community", element: <ForumHome/> },
          //   { path: "/community/post/:postId", element: <ForumPostDetails /> },
          //   { path: "/community/post/add", element: <ForumAddPost /> },
          // ],
        },
        { path: "/product", element: <Product /> },
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
