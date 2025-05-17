import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Card from "../components/Card";
import { Product, VoidFunc } from "../models/models";
import { removeFavorites } from "../features/productsSlice";
import { toastSuccessNotify } from "../helper/ToastNotify";

const FavoritesPage = () => {
  const { favorites } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch()

  const handleRemove:VoidFunc = (product) => {
    const newData:Product[] = favorites.filter(item => item.id !== product.id)
    dispatch(removeFavorites(newData))
    toastSuccessNotify('product removed')
  }
  return (
    <div>
      <div className="flex justify-center items-center flex-wrap gap-5 p-5">
        {favorites.map((item) => (
          <Card
            key={item.id}
            text="remove"
            item={item}
            handleFunc={handleRemove}
          ></Card>
        ))}
        {favorites.length === 0 && (
          <h3 className="font-bold text-2xl text-center mt-52">No favorites</h3>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
