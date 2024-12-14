import React, { useState } from "react";
import Cart from "./Cart";

const Navigation = () => {
  const [isCartVisible, setCartVisible] = useState(false);

  const handleCartClick = () => setCartVisible(true);
  const handleCloseCart = () => setCartVisible(false);

  return (
    <>
      <header className="border-b">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <a href="/dashboard" className="text-2xl font-bold text-[#4B3D8F]">
            Sample Site
          </a>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <a
                  href="/history"
                  className="text-[#4B3D8F] font-bold hover:underline"
                >
                  Purchase History
                </a>
              </li>
              <li>
                <span
                  className="text-[#4B3D8F] font-bold hover:underline cursor-pointer"
                  onClick={handleCartClick}
                >
                  Cart
                </span>
              </li>
              <li>
                <a
                  href="/"
                  className="text-[#4B3D8F] font-bold hover:underline"
                >
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Cart Modal */}
      {isCartVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6 relative max-h-[80vh] overflow-auto">
            <button
              onClick={handleCloseCart}
              className="absolute top-4 right-4 text-[#4B3D8F] font-bold"
            >
              ✕
            </button>
            <Cart onClose={handleCloseCart} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
