import { useEffect, useState } from "react";
import { collection, db, where, query, getDocs } from "../firebase";
import { User } from "../models/users.model";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const restaurantUid = localStorage.getItem("uid");

  const fetchUsers = async (restaurantId: string) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("restaurantId", "==", `${restaurantId}`));
    const response = await getDocs(q);
    const data = response.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(data as User[]);
  };

  useEffect(() => {
    fetchUsers(restaurantUid as string);
  }, []);

  return {
    users,
    restaurantUid,
  };
};

export default useUsers;
