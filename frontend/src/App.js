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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "./shuhui/slices/userSlice";
import EditProfilePopup from "./shumin/components/EditProfilePopup";

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const user = useSelector((state) => state.user.user);
  const isAdmin = user !== null && user.role === "admin";

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/auth/authentication/getuser", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            const {
              username,
              email,
              userUid,
              role,
              verifyStatus,
              address,
              phone,
            } = response.data;
            dispatch(
              setUser({
                username,
                email,
                userUid,
                role,
                verifyStatus,
                address,
                phone,
              })
            );
          }

        })
        .catch((err) => {
          console.error("Error:", err);
          setIsLoggedIn(false);
        });
    } catch (error) {
      console.error("Error:", error);
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      setIsLoggedIn(true);
    }
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
            {
              path: "/authentication/login", element: isLoggedIn ? (
                <Navigate to="/product" replace={false} />) : <ShuhuiPages.Login />
            },
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
          element: isLoggedIn === true ? <CommonPages.Pet /> : (isLoggedIn === false ? <ShuhuiPages.Login /> : <></>),
          children: [
            {
              path: "/pet", element: isLoggedIn === true ? <ShuminPages.PetHome /> : (isLoggedIn === false ? <ShuhuiPages.Login /> : <></>)
            },
            {
              path: "/pet/:petId",
              element: isLoggedIn ? (
                <ShuminPages.PetDetails />
              ) : (
                <ShuhuiPages.Login />
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
          element: isLoggedIn === true ? <CommonPages.Community /> : (isLoggedIn === false ? <ShuhuiPages.Login /> : <></>),
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
            {
              path: "/community/post/:postId/edit",
              element: <GinkhaiPages.ForumEditPost />,
            },
          ],
        },
        {
          path: "/product",
          element: isLoggedIn === true ? <CommonPages.Product /> : (isLoggedIn === false ? <ShuhuiPages.Login /> : <></>),
          children: [
            { path: "/product", element: <ShuminPages.ProductHome /> },
            {
              path: "/product/:productId",
              element: isLoggedIn === true ? <ShuminPages.ProductDetails /> : (isLoggedIn === false ? <ShuhuiPages.Login /> : <></>),
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
          element: isLoggedIn === true ? <CommonPages.Services /> : (isLoggedIn === false ? <ShuhuiPages.Login /> : <></>),
          children: [
            { path: "/services", element: <ZongMingPages.ServiceHome /> },
            {
              path: "/services/sellerService",
              element: <ZongMingPages.SellerService />,
            },
            {
              path: "/services/:serviceId",
              element: isLoggedIn ? <ZongMingPages.ServiceDetail /> : (isLoggedIn === false ? <ShuhuiPages.Login /> : <></>),
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
        },
        {
          path: "/mycart",
          element: isLoggedIn === true ? <ShuminPages.MyCart /> : (isLoggedIn === false ? <ShuhuiPages.Login /> : <></>),
        },
        {
          path: "/order",
          element: <CommonPages.Order />,
          children: [
            {
              path: "/order",
              element: isLoggedIn === true ? (isAdmin ? <ShuminPages.SellerOrder /> : <ShuminPages.UserOrder />) : (isLoggedIn === false ? <ShuhuiPages.Login /> : <></>
              ),
            },
          ],
        },
        {
          path: "/cartPopup",
          element: <EditProfilePopup />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
