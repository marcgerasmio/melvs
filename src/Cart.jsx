import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const Cart = ({ onClose }) => {
  const [cart, setCart] = useState([
    { id: 1, name: "Product 1", price: 29.99, quantity: 2 },
    { id: 2, name: "Product 2", price: 19.99, quantity: 1 },
  ]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

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

  // Open the checkout modal
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  // Close the checkout modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  // Open the confirmation modal
  const handleConfirmOrder = () => {
    setIsModalVisible(false);
    setIsConfirmationModalVisible(true);
  };

  // Close the confirmation modal
  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalVisible(false);
    setSelectedProduct(null);
  };

  // Update quantity in modal
  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#4B3D8F] mb-4">Your Cart</h2>
      <div className="space-y-4">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-md shadow"
            >
              <input
                type="checkbox"
                className="mr-4"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleSelection(item.id)}
              />
              <div>
                <h4 className="text-lg font-semibold text-[#4B3D8F]">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-600">
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <p className="text-lg font-bold text-[#4B3D8F]">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>
      <div className="text-right mt-6">
        <p className="text-lg font-bold text-[#4B3D8F]">
          Total: ${totalPrice.toFixed(2)}
        </p>
        <button
          className="bg-[#4B3D8F] hover:bg-[#3D2F7F] text-white px-6 py-2 rounded-md mt-4"
          onClick={handleOpenModal} // Open the modal on click
        >
          Proceed to Checkout
        </button>
      </div>

      {/* Modal for Checkout */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-[#4B3D8F] font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-[#4B3D8F] mb-4">
              Review Your Order
            </h2>
            <div>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between mb-4">
                  <h4 className="text-lg font-semibold text-[#4B3D8F]">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
              ))}
              <p className="text-lg font-bold text-[#4B3D8F]">
                Total Price: ${totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="text-right mt-6">
              <button
                onClick={handleConfirmOrder}
                className="bg-[#4B3D8F] hover:bg-[#3D2F7F] text-white px-6 py-2 rounded-md"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmationModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6 relative">
            <button
              onClick={handleCloseConfirmationModal}
              className="absolute top-4 right-4 text-[#4B3D8F] font-bold"
            >
              ✕
            </button>
            <p className="text-2xl font-bold text-green-500 mb-2">
              Your order has been successfully placed!
            </p>
            <div className="bg-gradient-to-br from-[#FFE4E1] to-[#FFC0CB] p-4 rounded-md">
              <p className="text-sm text-[#4B3D8F]">
                Thank you for shopping with us!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
