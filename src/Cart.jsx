import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Navigation from "./Navigation";

const Cart = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Product 1", price: 29.99, quantity: 2 },
    { id: 2, name: "Product 2", price: 19.99, quantity: 1 },
  ]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Toggle item selection
  const toggleSelection = (productId) => {
    if (selectedItems.includes(productId)) {
      setSelectedItems(selectedItems.filter((id) => id !== productId));
    } else {
      setSelectedItems([...selectedItems, productId]);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
    setSelectedItems(selectedItems.filter((id) => id !== productId));
  };

  // Calculate total price
  const totalPrice = selectedItems.reduce((sum, id) => {
    const item = cart.find((product) => product.id === id);
    return item ? sum + item.price * item.quantity : sum;
  }, 0);

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
                    <td>{item.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => removeFromCart(item.id)}
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
          <button className="btn btn-primary mt-4 text-white">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
