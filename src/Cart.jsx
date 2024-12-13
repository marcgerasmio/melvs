import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const userDetails = JSON.parse(sessionStorage.getItem("user"));
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:1337/api/carts?filters[user_name][$eq]=${userDetails.name}&_limit=1000`
      );
      if (response.ok) {
        const data = await response.json();
        setCart(data.data);
      } else {
        console.error("Failed to fetch cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const toggleSelection = (productId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(productId)
        ? prevSelectedItems.filter((id) => id !== productId)
        : [...prevSelectedItems, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const removeFromCart = async (item) => {
    try {
      const response = await fetch(
        `http://localhost:1337/api/carts/${item.documentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== item.id));
        setSelectedItems((prevSelectedItems) =>
          prevSelectedItems.filter((id) => id !== item.id)
        );
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const selectedCartItems = cart.filter((item) =>
      selectedItems.includes(item.id)
    );

    for (const item of selectedCartItems) {
      const cartData = {
        data: {
          product_name: item.product_name,
          quantity: item.quantity,
          total: item.price * item.quantity,
          customer_name: item?.user_name || "Guest",
          date: formattedDate,
          branch_name: item.branch_name,
        },
      };

      try {
        const response = await fetch("http://localhost:1337/api/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartData),
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error("Failed to add item:", errorData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    handleDelete(selectedCartItems);
  };

  const handleDelete = async (items) => {
    for (const item of items) {
      try {
        const response = await fetch(
          `http://localhost:1337/api/carts/${item.documentId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.text();
          console.error(`Failed to delete item with id ${item.id}:`, errorData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    alert("Checkout successful");
    window.location.reload();
  };

  const totalPrice = cart.reduce(
    (acc, item) =>
      selectedItems.includes(item.id) ? acc + item.price * item.quantity : acc,
    0
  );

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-5">
        <h2 className="text-2xl font-bold text-yellow-500 flex justify-center mb-4">
          Your Cart
        </h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelection(item.id)}
                        className="checkbox"
                      />
                    </td>
                    <td>{item.product_name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => removeFromCart(item)}
                        className="btn btn-error btn-xs text-white"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="text-right mt-6">
          <p className="text-lg font-bold text-[#4B3D8F]">
            Total: ${totalPrice.toFixed(2)}
          </p>
          <button
            className="btn btn-primary mt-4 text-white"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
