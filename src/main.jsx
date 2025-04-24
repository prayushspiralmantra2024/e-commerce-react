import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import TopRated from "./Components/TopRated/TopRated.jsx";
import KidsWear from "./Components/KidsWear/KidsWear.jsx";
import MensWear from "./Components/MensWear/MensWear.jsx";
import Carts from "./Components/Carts/Cart.jsx";
import Electronics from "./Components/Electronics/Electronics.jsx";
import ProductsData from "./Components/Products/Product.jsx"
import { Provider } from "react-redux";
import { store } from "./app/store.js";


// const [productId,setProductId]=useState("");
// const filterObject=ProductsData.filter(
//   (product)=>product.id==productId
// );
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
       <Route path="" element={<Home/>}/>
       <Route path="top-rated" element={<TopRated/>}/>
       <Route path="kids-wear" element={<KidsWear/>}/>
       <Route path="mens-wear" element={<MensWear/>}/>
       <Route path="electronics" element={<Electronics/>}/>
       <Route path="carts" element={<Carts/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
     <RouterProvider router={router} />
     </Provider>
);