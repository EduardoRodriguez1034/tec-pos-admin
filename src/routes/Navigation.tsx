import { Route, Routes } from "react-router-dom";
import AddDish from "../pages/AddDish";
import AddIngridient from "../pages/AddIngredient";
import AddUser from "../pages/AddUser";
import Dashboard from "../pages/Dashboard";
import Dishes from "../pages/Dishes";
import EditDish from "../pages/EditDish";
import EditIngredient from "../pages/EditIngredient";
import EditUser from "../pages/EditUser";
import Ingredients from "../pages/Ingredients";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Users from "../pages/Users";
import CardProgress from "../components/CardProgress";
import Tarjeta from "../components/Tarjeta";
import GrafPastel from "../components/GrafPastel";
import RangoFecha from "../components/RangoFecha";
import Tabla from "../components/Tabla";

import PrivateRoute from "./PrivateRoute";


const Navigation = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/dishes" element={<Dishes />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/add/dishes" element={<AddDish />} />
          <Route path="/add/ingredients" element={<AddIngridient />} />
          <Route path="/add/users" element={<AddUser />} />
          <Route path="/edit/dishes" element={<EditDish />} />
          <Route path="/edit/ingredients" element={<EditIngredient />} />
          <Route path="/edit/users" element={<EditUser />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
};

export default Navigation;
