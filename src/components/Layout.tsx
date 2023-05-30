import React, { useState } from "react";
import DrawerNavigation from "./DrawerNavigation";
import Navbar from "./Navbar";

const Layout = ({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar handleDrawer={handleDrawer} />
      {isOpen && <DrawerNavigation handleDrawer={handleDrawer} />}
      {children}
    </>
  );
};

export default Layout;
