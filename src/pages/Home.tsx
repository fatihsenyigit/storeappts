import React, { useEffect, useState } from 'react'
import Search from '../components/Search'
import axios from 'axios'
import { useAppDispatch } from '../app/hooks';
import { fetchFail, fetchStart, getSuccessProduct } from '../features/productsSlice';
import { EventFunc, Products } from '../models/models';



const Home = () => {
  //burada type i vermemize gerek yok
  const [search, setSearch] = useState<string>('')
  const dispatch = useAppDispatch();

  const getData = async () => {
    dispatch(fetchStart())
    try {
      const {data} = await axios.get<Products>(
        `https://dummyjson.com/products/search?q=${search}`
      );
      dispatch(getSuccessProduct(data.products));
    } catch (error) {
      dispatch(fetchFail())
    }
  }

  useEffect(() => {
    getData()
  }, [search])
  
  /* const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  } */

    const handleChange: EventFunc = (e) => {
      setSearch(e.target.value);
    }

  return (
    <div>
      <Search handleChange={handleChange}></Search>
    </div>
  )
}

export default Home