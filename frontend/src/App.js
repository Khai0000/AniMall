import "./App.css";
import React, { useState, useEffect } from "react";
import Layout from "./Layout/Layout";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import * as CommonPages from "./pages";
import * as ZongMingPages from "./ZongMing/pages";
import * as ShuminPages from "./shumin/pages";
import * as GinkhaiPages from "./ginkhai/pages";
import * as ShuhuiPages from "./shuhui/pages";
import { useSelector } from "react-redux";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    setIsLoggedIn(user !== null);
  }, [user]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <CommonPages.NotFoundPages />,
      children: [
        { path: "/", element: <Navigate to="authentication/login" /> },
        {
          path: "/authentication",
          children: [
            { path: "/authentication/login", element: <ShuhuiPages.Login /> },
            {
              path: "/authentication/register",
              element: <ShuhuiPages.Register />,
            },
            {
              path: "/authentication/reset-password",
              element: <ShuhuiPages.ResetPassword />,
            },
            {
              path: "/authentication/profile",
              element: <ShuhuiPages.Profile />,
            },
          ],
        },
        {
          path: "/pet",
          element: <CommonPages.Pet />,
          children: [
            { path: "/pet", element: <ShuminPages.PetHome /> },
            {
              path: "/pet/:title",
              element: isLoggedIn ? (
                <ShuminPages.PetDetails />
              ) : (
                <Navigate to="/authentication/login" replace={false} />
              ),
            },
            {
              path: "/pet/PetCategorized/:category",
              element: <ShuminPages.PetCategorized />,
            },
            { path: "/pet/sellerPet/add-pet", element: <ShuminPages.AddPet /> },
            { path: "/pet/sellerPet", element: <ShuminPages.SellerPet /> },
            {
              path: "/pet/sellerPet/add-pet/:id",
              element: <ShuminPages.AddPet />,
            },
          ],
        },
        {
          path: "/community",
          // element: isLoggedIn ? (
          //   <CommonPages.Community />
          // ) : (
          //   <Navigate to="/authentication/login" replace={false}  />
          // ),
          element:<CommonPages.Community/>,
          children: [
            { path: "/community", element: <GinkhaiPages.ForumHome /> },
            {
              path: "/community/post/:postId",
              element: <GinkhaiPages.ForumPostDetails />,
            },
            {
              path: "/community/post/add",
              element: <GinkhaiPages.ForumAddPost />,
            },
          ],
        },
        {
          path: "/product",
          element: <CommonPages.Product />,
          children: [
            { path: "/product", element: <ShuminPages.ProductHome /> },
            {
              path: "/product/:title",
              element: isLoggedIn ? (
                <ShuminPages.ProductDetails />
              ) : (
                <Navigate to="/authentication/login" replace={false} />
              ),
            },
            {
              path: "/product/ProductCategorized/:category",
              element: <ShuminPages.ProductCategorized />,
            },
            {
              path: "/product/sellerProduct/add-product",
              element: <ShuminPages.AddProduct />,
            },
            {
              path: "/product/sellerProduct",
              element: <ShuminPages.SellerProduct />,
            },
            {
              path: "/product/sellerProduct/add-product/:id",
              element: <ShuminPages.AddProduct />,
            },
          ],
        },

        {
          path: "/services",
          element: <CommonPages.Services />,
          children: [
            { path: "/services", element: <ZongMingPages.ServiceHome /> },
            {
              path: "/services/sellerService",
              element: <ZongMingPages.SellerService />,
            },
            {
              path: "/services/:serviceId",
              element: isLoggedIn ? (
                <ZongMingPages.ServiceDetail />
              ) : (
                <Navigate to="/authentication/login" replace={false} />
              ),
            },
            {
              path: "/services/sellerService/add-service",
              element: <ZongMingPages.AddServiceComponent />,
            },
            {
              path: "/services/sellerService/add-service/:serviceTitle",
              element: <ZongMingPages.AddServiceComponent />,
            },
          ],
        },,
        {
          path: "/mycart",
          element: isLoggedIn ? (
            <ShuminPages.MyCart />
          ) : (
            <Navigate to="/authentication/login" replace={false} />
          ),
        },
        {
          path: "/order",
          element: <CommonPages.Order/>,
          children: [
            {
              path: "/order",
              element: isLoggedIn ? (
                user.role === "admin" ? (
                  <ZongMingPages.SellerOrder/>
                ) : (
                  <ZongMingPages.UserOrder />
                )
              ) : (
                <Navigate to="/authentication/login" replace={false} />
              ),
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
