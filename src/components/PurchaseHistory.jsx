import React from "react";
import Navbar from "./Navbar";

const purchases = [
  {
    id: 1,
    date: "2024-12-01",
    productName: "Product 1",
    quantity: 2,
    price: 29.99,
    total: 59.98,
  },
  {
    id: 2,
    date: "2024-12-05",
    productName: "Product 2",
    quantity: 1,
    price: 19.99,
    total: 19.99,
  },
  {
    id: 3,
    date: "2024-12-10",
    productName: "Product 3",
    quantity: 1,
    price: 39.99,
    total: 39.99,
  },
];

const PurchaseHistory = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-[#4B3D8F] mt-4 flex justify-center">
          Purchase History
        </h2>
        <hr />
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id}>
                <td>{purchase.date}</td>
                <td>{purchase.productName}</td>
                <td>{purchase.quantity}</td>
                <td>${purchase.price.toFixed(2)}</td>
                <td>${purchase.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PurchaseHistory;
