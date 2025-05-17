import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchFail,
  fetchStart,
  getSuccessProduct,
} from "../features/productsSlice";
import { EventFunc, Products } from "../models/models";

const Home = () => {
  //burada type i vermemize gerek yok
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  const { loading, error, productsList } = useAppSelector(
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
              <p>{item.title}</p>
            ))}
          </div>
        )
      }
    </div>
  );
};

export default Home;
