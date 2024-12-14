import Navigation from "./Navigation";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function UserDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <section className="flex items-center justify-center min-h-[calc(100vh-5rem)] overflow-hidden">
          <div className="container mx-auto px-8">
            <div className="text-center space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-[#4B3D8F] leading-tight">
                Discover Happiness, Delivered to Your Doorstep....
              </h1>
              <p className="text-lg text-gray-600 max-w-lg mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt.
              </p>
              <Link to="/products">
                <button className="bg-[#4B3D8F] hover:bg-[#3D2F7F] mt-8 text-white px-8 py-3 text-lg rounded-md flex gap-2 mx-auto">
                  Browse Products
                  <FaArrowRightLong className="mt-1" />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserDashboard;
