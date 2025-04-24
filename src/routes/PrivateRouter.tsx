import React from "react";
import { useRoutes } from "react-router-dom";
import Layout from "layout/Layout";
import generalRoutes from "./generalRoutes";

//pages
import Home from "pages/home/Home";
import ProductDetail from "pages/productDetail/ProductDetail";
import NotFound from "pages/NotFound";
import Test from "pages/Test";
import SearchResults from "pages/SearchResults";
import Cart from "pages/cart/Cart";
import Checkout from "pages/checkout/Checkout";
import OrderConfirmation from "pages/checkout/OrderConfirmation";
import Profile from 'pages/account/Profile';
import OrderHistory from 'pages/account/OrderHistory';
import SavedAddresses from 'pages/account/SavedAddresses';
import PaymentMethods from 'pages/account/PaymentMethods';
import Wishlist from 'pages/account/Wishlist';

export default function PrivateRouter() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        ...generalRoutes,
        { element: <Home />, index: true },
        { element: <ProductDetail />, path: "product/:id" },
        { element: <SearchResults />, path: "search" },
        { element: <Cart />, path: "cart" },
        { element: <Checkout />, path: "checkout" },
        { element: <OrderConfirmation />, path: "order-confirmation" },
        { element: <Profile />, path: "account/profile" },
        { element: <OrderHistory />, path: "account/orders" },
        { element: <SavedAddresses />, path: "account/addresses" },
        { element: <PaymentMethods />, path: "account/payment-methods" },
        { element: <Wishlist />, path: "account/wishlist" },
        { element: <Test />, path: "test" },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return routes;
}
