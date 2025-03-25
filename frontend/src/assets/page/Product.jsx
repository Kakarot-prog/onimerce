import React, { useState } from "react";
import Layout from "../page/Layout";

const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Generate mock products with category-specific high-quality images
  const products = Array.from({ length: 300 }, (_, i) => {
    const category = ["electronics", "clothing", "books", "home"][i % 4];
    let imageUrl;

    // Assign high-quality images based on category
    switch (category) {
      case "electronics":
        imageUrl = `https://images.pexels.com/photos/${
          19090 + i
        }/pexels-photo-${
          19090 + i
        }.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`;
        break;
      case "clothing":
        imageUrl = `https://images.pexels.com/photos/${100 + i}/fashion-${
          100 + i
        }.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`;
        break;
      case "books":
        imageUrl = `https://images.pexels.com/photos/${200 + i}/book-${
          200 + i
        }.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`;
        break;
      case "home":
        imageUrl = `https://images.pexels.com/photos/${300 + i}/home-decor-${
          300 + i
        }.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`;
        break;
      default:
        imageUrl = `https://picsum.photos/400/600?random=${i}`;
    }

    return {
      id: i + 1,
      title: `Product ${i + 1}`,
      price: Math.floor(Math.random() * 1000) + 100,
      category: category,
      image: imageUrl,
    };
  });

  // Filter logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 p-8">
        {/* Search and Filter Section */}
        <div className="max-w-7xl mx-auto mb-8 space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Our Products
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="home">Home</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 rounded-lg p-6 shadow-xl hover:transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                {product.title}
              </h3>
              <p className="text-purple-400 mb-2">${product.price}</p>
              <span className="inline-block px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-full">
                {product.category}
              </span>
              <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="max-w-7xl mx-auto mt-8 flex justify-center items-center gap-4">
          <button
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
