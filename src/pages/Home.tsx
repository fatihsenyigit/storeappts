import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addFavorites,
  fetchFail,
  fetchStart,
  getSuccessProduct,
} from "../features/productsSlice";
import { EventFunc, Product, Products } from "../models/models";
import Card from "../components/Card";
import { toastSuccessNotify, toastWarnNotify } from "../helper/ToastNotify";

const Home = () => {
  //burada type i vermemize gerek yok
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  const { loading, error, productsList, favorites } = useAppSelector(
    (state) => state.products
  );

  const getData = async () => {
    dispatch(fetchStart());
    console.log(loading)
    try {
      const { data } = await axios.get<Products>(
        `https://dummyjson.com/products/search?q=${search}`
      );
      
      dispatch(getSuccessProduct(data.products));
    } catch (error) {
      console.log(error)
      dispatch(fetchFail());
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  /* const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  } */

  const handleChange: EventFunc = (e) => {
    setSearch(e.target.value);
  };

  const handleAdd = (product:Product) => {
    if(favorites.filter(item=> item.id === product.id).length === 0) {
      dispatch(addFavorites(product))
      toastSuccessNotify('products added')
    } else {
      toastWarnNotify('already added')
    }
  }

  return (
    <div>
      <Search handleChange={handleChange}></Search>
      {
        loading ? (
          <div className="mt-52">
            <p className="text-center text-red-600">Products loading ... </p>
          </div>
        ) : error ? (
          <div className="mt-52">
            <p className="text-center text-red-600">something is wrong ... </p>
          </div>
        ) : (
          <div className="flex justify-center items-center flex-wrap gap-5 p-5">
            {productsList.map((item) => (
              <Card key={item.id} text='add to favorites' item={item} handleFunc={handleAdd}></Card>
            ))}
          </div>
        )
      }
    </div>
  );
};

export default Home;
