import React from "react";
const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("UserStored");
    window.location = "/";
  };
  return (
    <button className="btn red" onClick={handleLogout}>
      Se deconnecter
    </button>
  );
};

export default Logout;
