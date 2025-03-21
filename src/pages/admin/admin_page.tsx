import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate()

  return <div>
    <h4>AdminPage</h4>
    <button onClick={() => navigate('/home')}>Home으로 이동</button>
  </div>;
};

export default AdminPage;
