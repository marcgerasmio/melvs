import React from "react";
import Navigation from "./Navigation";

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

const History = () => {
  return (
    <>
      <Navigation />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-[#4B3D8F] flex justify-center">
          Purchase History
        </h2>
        <div className="overflow-x-auto border shadow-lg">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th className="text-left">Date</th>
                <th className="text-left">Product Name</th>
                <th className="text-left">Quantity</th>
                <th className="text-left">Price</th>
                <th className="text-left">Total</th>
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
      </div>
    </>
  );
};

export default History;
