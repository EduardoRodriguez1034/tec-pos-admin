import React from "react";

const useAuth = () => {
  const uid = localStorage.getItem("uid");

  return {
    uid,
  };
};

export default useAuth;
