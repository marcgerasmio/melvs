import { useState } from "react";
import Navigation from "./Navigation";

function Products() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "This is a description for product 1.",
      price: "$29.99",
      image: "img.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is a description for product 2.",
      price: "$19.99",
      image: "img.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      description: "This is a description for product 3.",
      price: "$39.99",
      image: "img.jpg",
    },
    {
      id: 4,
      name: "Product 4",
      description: "This is a description for product 4.",
      price: "$24.99",
      image: "img.jpg",
    },
    {
      id: 5,
      name: "Product 5",
      description: "This is a description for product 5.",
      price: "$49.99",
      image: "img.jpg",
    },
    {
      id: 6,
      name: "Product 6",
      description: "This is a description for product 6.",
      price: "$59.99",
      image: "img.jpg",
    },
    {
      id: 7,
      name: "Product 7",
      description: "This is a description for product 7.",
      price: "$34.99",
      image: "img.jpg",
    },
    {
      id: 8,
      name: "Product 8",
      description: "This is a description for product 8.",
      price: "$27.99",
      image: "img.jpg",
    },
    {
      id: 9,
      name: "Product 9",
      description: "This is a description for product 9.",
      price: "$22.99",
      image: "img.jpg",
    },
    {
      id: 10,
      name: "Product 10",
      description: "This is a description for product 10.",
      price: "$31.99",
      image: "img.jpg",
    },
  ];

  const [cart, setCart] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
  };

  const handleCheckoutClick = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleConfirmOrder = () => {
    // Add the order to the cart with the selected quantity
    const updatedCart = cart.map((item) =>
      item.id === selectedProduct.id ? { ...item, quantity } : item
    );
    setCart(updatedCart);

    // Hide the checkout modal
    setIsModalVisible(false);

    // Show the confirmation modal
    setIsConfirmationModalVisible(true);

    // Reset quantity for the next order
    setQuantity(1);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalVisible(false);
  };

  return (
    <>
      <Navigation />
      <section className="bg-base-100 py-8">
        <div className="container mx-auto px-8">
          <div className="mb-8 text-end">
            <div className="flex justify-between gap-4">
              <h1 className="text-2xl font-bold text-yellow-500">Products</h1>
              <div className="flex gap-3">
                <select
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-[#4B3D8F] rounded-md p-2"
                >
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home-decor">Home Decor</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-6 rounded-lg shadow-xl border hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-[#4B3D8F] mb-4">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  {product.description}
                </p>
                <div className="flex justify-between">
                  <p className="text-lg font-bold text-[#4B3D8F] mb-4">
                    {product.price}
                  </p>
                  <span
                    className="text-[#4B3D8F] hover:text-[#3D2F7F] cursor-pointer underline"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => handleCheckoutClick(product)}
                    className="bg-[#4B3D8F] hover:bg-[#3D2F7F] text-white px-4 py-2 rounded-md w-full"
                  >
                    Check Out
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Checkout */}
      {isModalVisible && selectedProduct && (
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
            <div className="overflow-y-auto max-h-[70vh]">
              <div className="flex flex-col">
                <img src={selectedProduct.image} alt="" />
                <h4 className="text-lg font-semibold text-[#4B3D8F]">
                  {selectedProduct.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {selectedProduct.description}
                </p>
                <p className="text-sm font-bold text-[#4B3D8F] mb-4">
                  Price: {selectedProduct.price}
                </p>
                <div className="flex items-center justify-start gap-3">
                  <label htmlFor="quantity" className="text-sm text-[#4B3D8F]">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    min="1"
                    onChange={handleQuantityChange}
                    className="border border-[#4B3D8F] rounded-md p-2 w-16"
                  />
                </div>
                <div className="mt-4 text-sm text-[#4B3D8F]">
                  <p>
                    <strong>Total Quantity:</strong> {quantity}
                  </p>
                  <p>
                    <strong>Total Price:</strong> {selectedProduct.price} x{" "}
                    {quantity} ={" "}
                    {parseFloat(selectedProduct.price.slice(1)) * quantity}
                  </p>
                </div>
              </div>
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
    </>
  );
}

export default Products;
