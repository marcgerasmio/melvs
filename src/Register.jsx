import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("customers");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const jsonData = {
      data: {
        name: name,
        email: email,
        password: password,
      }
    }
    const jsonString = JSON.stringify(jsonData);
    try {
      const response = await fetch("http://localhost:1337/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonString,
      });
      if (response.ok) {
        const data = await response.json();
        alert("Registration successful!");
        navigate("/");
      } else {
        const errorData = await response.text(); 
        alert("Registration failed!");
        console.error(errorData);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border">
        <div className="flex justify-center mb-6">
          <a href="/" className="text-3xl font-bold text-green-700">
            Register
          </a>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="mb-2">
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-sm">
              Show Password
            </label>
          </div>
          <div className="mb-4 flex gap-2">
            <select
              id="role"
              className="w-1/2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="customers">Customer</option>
              <option value="admins">Admin</option>
            </select>
            <button
              type="submit"
              className="w-full py-2 bg-green-700 text-white rounded-lg hover:bg-green-700 focus:outline-none"
            >
              Sign up
            </button>
          </div>
          <div className="divider before:bg-black after:bg-black font-bold">
            or
          </div>
          <div className="text-center mt-4">
            <Link to="/">
              <button
                type="submit"
                className="w-full py-2 text-white rounded-lg bg-green-700"
              >
                Login instead
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
