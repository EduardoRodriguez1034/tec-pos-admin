import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import DrawerNavigation from "../components/DrawerNavigation";
import Navbar from "../components/Navbar";
import AddDish from "../pages/AddDish";
import AddIngridient from "../pages/AddIngredient";
import AddUser from "../pages/AddUser";
import Dashboard from "../pages/Dashboard";
import Dishes from "../pages/Dishes";
import Ingredients from "../pages/Ingredients";
import Login from "../pages/Login";
import Users from "../pages/Users";
import CardProgress from "../components/CardProgress";
import Tarjeta from "../components/Tarjeta";
import GrafPastel from "../components/GrafPastel";
import RangoFecha from "../components/RangoFecha";
import Tabla from "../components/Tabla";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar handleDrawer={handleDrawer} />
      {isOpen && <DrawerNavigation handleDrawer={handleDrawer} />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/dishes" element={<Dishes />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/add/dishes" element={<AddDish />} />
        <Route path="/add/ingredients" element={<AddIngridient />} />
        <Route path="/add/users" element={<AddUser />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="/CardProgress" element={<CardProgress/>} />
        <Route path="/Tarjeta" element={<Tarjeta/>} />
        <Route path="/GrafPastel" element={<GrafPastel/>} />
        <Route path="/RangoFecha" element={<RangoFecha/>} />
        <Route path="/Tabla" element={<Tabla/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
};

export default Navigation;
