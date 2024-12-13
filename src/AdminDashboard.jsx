import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [topSales, setTopSales] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/transactions?pagination[pageSize]=100");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        const result = data.data;

        const uniqueBranches = [...new Set(result.map((transaction) => transaction.branch_name))];
        setBranches(uniqueBranches);

        setTransactions(result);

        const filteredData = selectedBranch
          ? result.filter((transaction) => transaction.branch_name === selectedBranch)
          : result;

        const aggregatedData = filteredData.reduce((acc, transaction) => {
          const { product_name, quantity } = transaction;
          if (!acc[product_name]) {
            acc[product_name] = { product_name, quantity: 0 };
          }
          acc[product_name].quantity += quantity;
          return acc;
        }, {});

        const topSalesData = Object.values(aggregatedData)
          .filter((sale) => sale.quantity > 0)
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 20);

        setTopSales(topSalesData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [selectedBranch]);

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 mb-10">
      <header className="border-b ">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <a href="/admin" className="text-2xl font-bold text-[#4B3D8F]">
            Sample Site
          </a>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4 mt-8">
          {/* Transactions Table */}
          <div className="px-6 w-1/2">
            <h2 className="text-2xl font-bold mb-4">Transactions</h2>
            <div className="overflow-y-auto max-h-96">
              <table className="min-w-full bg-white shadow-md rounded mb-4">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Order ID</th>
                    <th className="py-2 px-4 border-b text-left">Customer Name</th>
                    <th className="py-2 px-4 border-b text-left">Product Name</th>
                    <th className="py-2 px-4 border-b text-left">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="py-2 px-4 border-b">{transaction.id}</td>
                        <td className="py-2 px-4 border-b">{transaction.customer_name}</td>
                        <td className="py-2 px-4 border-b">{transaction.product_name}</td>
                        <td className="py-2 px-4 border-b">{transaction.quantity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">No transactions available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Sales Table */}
          <div className="px-6 w-1/2">
            <h2 className="text-2xl font-bold mb-4">Top Sales</h2>
            <select
              className="w-full px-4 py-2 mt-2 mb-2 border rounded"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="">All Branches</option>
              {branches.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
            <table className="min-w-full bg-white shadow-md rounded mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Product Name</th>
                  <th className="py-2 px-4 border-b text-left">Total Quantity</th>
                </tr>
              </thead>
              <tbody>
                {topSales.length > 0 ? (
                  topSales.map((sale, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{sale.product_name}</td>
                      <td className="py-2 px-4 border-b">{sale.quantity}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center py-4">No sales data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
