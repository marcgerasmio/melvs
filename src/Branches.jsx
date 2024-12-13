import { useNavigate } from "react-router-dom";

function Branches() {
  const navigate = useNavigate();
  const branches = [
    {
      id: 1,
      name: "Ampayon",
      description: "Located in the heart of Butuan.",
    },
    {
      id: 2,
      name: "Libertad",
      description: "Sunny vibes in the City of Butuan.",
    },
    { id: 3, name: "Lumbocan", description: "Experience the Butuan City." },
    { id: 4, name: "Masao", description: "Big hearts in Butuan." },
    {
      id: 5,
      name: "Pangabugan",
      description: "Enjoy the tropical atmosphere of Butuan City.",
    },
  ];

  const handleBranchClick = (branchName) => {
    sessionStorage.setItem("selectedBranch", branchName);
    navigate("/products");
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-8 flex justify-center">
        <div className="w-full max-w-7xl">
          <h2 className="text-3xl font-bold text-center text-yellow-500 mb-8">
            | Choose Our Branches
          </h2>
          <hr />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 justify-items-center">
            {branches.map((branch) => (
              <div key={branch.id}>
                <div className="flex flex-col justify-between p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow h-[200px] w-[300px]"
                onClick={() => handleBranchClick(branch.name)}>
                  <h3 className="text-xl font-semibold text-[#4B3D8F] mb-4 text-center">
                    {branch.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 flex-grow text-center">
                    {branch.description}
                  </p>
                  <button className="bg-[#4B3D8F] hover:bg-[#3D2F7F] text-white px-6 py-2 rounded-md mt-auto transition-all duration-200 w-full">
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Branches;
