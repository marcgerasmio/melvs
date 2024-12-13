import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Products from "./Products";
import History from "./History";
import Branches from "./Branches";
import Cart from "./Cart";
import AdminDashboard from "./AdminDashboard";
function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/history" element={<History />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
