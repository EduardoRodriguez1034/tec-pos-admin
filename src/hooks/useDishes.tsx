import { useEffect, useState } from "react";
import { collection, db, getDocs, query, where } from "../firebase";
import { Dish } from "../models/dishes.model";

const useDishes = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const restaurantUid = localStorage.getItem("uid");

  const fetchDishes = async (restaurantId: string) => {
    const dishesRef = collection(db, "dishes");
    const q = query(dishesRef, where("restaurantId", "==", `${restaurantId}`));

    const response = await getDocs(q);
    const data = response.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDishes(data as Dish[]);
  };

  useEffect(() => {
    fetchDishes(restaurantUid as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    dishes,
    fetchDishes,
  };
};

export default useDishes;
