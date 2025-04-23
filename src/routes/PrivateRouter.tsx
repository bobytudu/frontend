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

export default function PrivateRouter() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        ...generalRoutes,
        { element: <Home />, index: true },
        { element: <ProductDetail />, path: "product-detail" },
        { element: <SearchResults />, path: "search" },
        { element: <Test />, path: "test" },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return routes;
}
