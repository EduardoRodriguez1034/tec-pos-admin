import { useEffect, useState } from "react";
import { collection, db, getDocs, query, where } from "../firebase";
import { Ingredient } from "../models/ingredients.model";

const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const restaurantUid = localStorage.getItem("uid");

  const fetchIngredients = async (restaurantId: string) => {
    const ingredientsRef = collection(db, "ingredients");
    const q = query(
      ingredientsRef,
      where("restaurantId", "==", `${restaurantId}`)
    );

    const response = await getDocs(q);
    const data = response.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setIngredients(data as Ingredient[]);
  };

  useEffect(() => {
    fetchIngredients(restaurantUid as string);
  }, []);

  return {
    ingredients,
    restaurantUid,
  };
};

export default useIngredients;
