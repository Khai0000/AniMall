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
import PulseLoader from "react-spinners/PulseLoader";

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user.user);
  const isAdmin = user && user.role === "admin";

  useEffect(() => {
    if(!user)
    try {
      axios.get(
        "http://localhost:4000/api/auth/authentication/getuser",
        { withCredentials: true }
      )
        .then(response => {
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
              }));
          }
        })
        .catch(err => {
          console.error("Error");
          setIsLoggedIn(false);
        })
        .finally(() => {
          setIsLoading(false);
        })
    } catch (error) {
      //console.error("Error:", error);
    }
  },);

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
        {
          path: "/",
          element: isLoggedIn ? (
            <Navigate to="/product" />
          ) : (
            <Navigate to="/authentication/login" />
          ),
        },
        {
          path: "/authentication",
          children: [
            {
              path: "login", element: isLoggedIn ? (
                <Navigate to="/product" replace={false} />) : <ShuhuiPages.Login />
            },
            {
              path: "register",
              element: <ShuhuiPages.Register />,
            },
            {
              path: "reset-password",
              element: <ShuhuiPages.ResetPassword />,
            },
            {
              path: "profile",
              element: <ShuhuiPages.Profile />,
            },
          ],
        },
        {
          path: "/pet",
          element: isLoggedIn === true ? <CommonPages.Pet /> : (isLoggedIn === false ? <ShuhuiPages.Login /> : <></>),
          children: [
            {
              path: "", element: isLoggedIn === true ? <ShuminPages.PetHome /> : (isLoggedIn === false ? <ShuhuiPages.Login /> : <></>)
            },
            {
              path: ":petId",
              element: isLoggedIn ? (
                <ShuminPages.PetDetails />
              ) : (
                <ShuhuiPages.Login />
              ),
            },
            {
              path: "PetCategorized/:category",
              element: <ShuminPages.PetCategorized />,
            },
            { path: "sellerPet/add-pet", element: <ShuminPages.AddPet /> },
            { path: "sellerPet", element: <ShuminPages.SellerPet /> },
            { path: "/pet/adoptionformcheck", element: <ShuminPages.AdoptionFormHome /> },
            { path: "sellerPet/add-pet/:id", element: <ShuminPages.AddPet /> },
          ],
        },
        {
          path: "/community",
          element: isLoggedIn === true ? <CommonPages.Community /> : (isLoggedIn === false ? <ShuhuiPages.Login /> : <></>),
          children: [
            { path: "", element: <GinkhaiPages.ForumHome /> },
            {
              path: "post/:postId",
              element: <GinkhaiPages.ForumPostDetails />,
            },
            { path: "post/add", element: <GinkhaiPages.ForumAddPost /> },
            {
              path: "post/:postId/edit",
              element: <GinkhaiPages.ForumEditPost />,
            },
          ],
        },
        {
          path: "/product",
          element: isLoggedIn === true ? <CommonPages.Product /> : (isLoggedIn === false ? <ShuhuiPages.Login /> : <></>),
          children: [
            { path: "", element: <ShuminPages.ProductHome /> },
            {
              path: ":productId",
              element: isLoggedIn === true ? <ShuminPages.ProductDetails /> : (isLoggedIn === false ? <ShuhuiPages.Login /> : <></>),
            },
            {
              path: "ProductCategorized/:category",
              element: <ShuminPages.ProductCategorized />,
            },
            {
              path: "sellerProduct/add-product",
              element: <ShuminPages.AddProduct />,
            },
            { path: "sellerProduct", element: <ShuminPages.SellerProduct /> },
            {
              path: "sellerProduct/add-product/:id",
              element: <ShuminPages.AddProduct />,
            },
          ],
        },
        {
          path: "/services",
          element: isLoggedIn === true ? <CommonPages.Services /> : (isLoggedIn === false ? <ShuhuiPages.Login /> : <></>),
          children: [
            { path: "", element: <ZongMingPages.ServiceHome /> },
            { path: "sellerService", element: <ZongMingPages.SellerService /> },
            {
              path: ":serviceId",
              element: isLoggedIn ? <ZongMingPages.ServiceDetail /> : (isLoggedIn === false ? <ShuhuiPages.Login /> : <></>),
            },
            {
              path: "sellerService/add-service",
              element: <ZongMingPages.AddServiceComponent />,
            },
            {
              path: "sellerService/add-service/:serviceTitle",
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
              path: "",
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

  return isLoading ? (<div className="wj-loadingContainer">
    <PulseLoader size={"1.5rem"} color="#3C95A9" />
    <p className="wj-loadingText">Loading...</p>
  </div>) : <RouterProvider router={router} />;
}

export default App;
