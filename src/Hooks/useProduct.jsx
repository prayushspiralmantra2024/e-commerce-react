import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setProducts } from '../features/todo/productSlice'

const useProduct = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        console.log(data); // You can keep or remove this
        dispatch(setProducts(data)); // Dispatch data to Redux
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchData();
  }, [dispatch]);
};

export default useProduct