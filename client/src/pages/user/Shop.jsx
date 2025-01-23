import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { getAllproducts } from "../../API/shop.js";
import Card from '../../components/user/Card.jsx';
import Aside from "../../components/user/Aside.jsx";

const Shop = () => {
  const [numItems, setNumItems] = useState(8); // 2 rows, 4 items per row, so 8 items
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAndSortProducts = async () => {
      try {
        const fetchedProducts = await getAllproducts();
        let sortedProducts = [...fetchedProducts];

        if (searchQuery) {
          sortedProducts = sortedProducts.filter((product) =>
            product?.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        switch (filter) {
          case 'LowToHigh':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
          case 'HighToLow':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
          case 'AZ':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'ZA':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case 'Popularity':
            sortedProducts.sort((a, b) => b.popularity - a.popularity);
            break;
          case 'clear':
            sortedProducts = [...fetchedProducts];
            break;
          default:
            break;
        }

        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching or sorting products:", error);
      }
    };

    fetchAndSortProducts();
  }, [filter, numItems, searchQuery]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the index range for products to display on the current page
  const startIndex = (currentPage - 1) * numItems;
  const endIndex = startIndex + numItems;
  const currentPageProducts = products.slice(startIndex, endIndex);

  // Total pages
  const totalPages = Math.ceil(products.length / numItems);

  const handleSelectChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSelectChangeNums = (e) => {
    setNumItems(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when the number of items per page changes
  };

  // Generate an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container">
      <div className="flex justify-between md:flex-row flex-col">
        {/* SEARCH */}
        <div className="flex border-gray-800 border m-2 md:w-9/12">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="outline-none pop w-11/12 md:p-2 p-1"
          />
          <div className="bg-gray-800 p-1 flex items-center justify-center w-2/12">
            <IoIosSearch className="text-gray-100 md:w-7 md:h-7 w-6 h-6" />
          </div>
        </div>

        {/* ASIDE */}
        <div className="flex gap-x-4 justify-end items-center p-2">
          {/* Filter by Number of Products */}
          <select
            className="border rounded pop w-fit px-2 py-1 sm:p-2 font-medium text-xs pop text-gray-700 sm:px-7 focus:outline-none"
            value={numItems}
            onChange={handleSelectChangeNums}
          >
            <option value="8">Shows 8</option>
            <option value="16">Shows 16</option>
            <option value="24">Shows 24</option>
          </select>

          <select
            className="border rounded pop w-fit px-2 py-1 sm:p-2 font-medium text-xs pop text-gray-700 sm:px-7 focus:outline-none"
            value={filter}
            onChange={handleSelectChange}
          >
            <option value="clear">Filter</option>
            <option value="LowToHigh">Low to High</option>
            <option value="HighToLow">High to Low</option>
            <option value="AZ">A to Z</option>
            <option value="ZA">Z to A</option>
            <option value="Popularity">Popularity</option>
          </select>
        </div>
      </div>

      <div className="flex ">
        <Aside />

        {/* PRODUCTS */}
        <div className="bg-[#f0f0f153] w-full p-5 border flex flex-col justify-between items-start ">
         <div >
         <p className="h1 text-2xl text-gray-800 tracking-widest font-medium">
            We have found{" "}
            <span className="text-blue-600">{products.length}</span> products
          </p>
          <div className="w-full relative grid md:grid-cols-4 my-10 gap-10">
            {currentPageProducts.length > 0 ? (
              currentPageProducts.map((product) => (
                <Card key={product._id} product={product} />
              ))
            ) : (
              <div className="flex flex-col w-full justify-center items-center absolute top-12 left-1/2 transform -translate-x-1/2">
                <img
                  className="w-[200px] md:w-[300px]"
                  src="https://media0.giphy.com/media/WSxyc3kHnD9GvVbWDO/giphy.gif?cid=6c09b952ytj5o1pa6h1sxb9seg2bq8rvwkx7kprawg1rmsz7&ep=v1_stickers_search&rid=giphy.gif&ct=s"
                  alt=""
                />
                <p className="h1 whitespace-nowrap text-lg md:text-4xl font-medium mt-6 to-gray-600 tracking-wider">
                  No products found!
                </p>
              </div>
            )}
          </div>
         </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-32 pop text-sm ">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-8 py-2 bg-gray-900 rounded-full text-white  mr-2"
            >
              Prev
            </button>

            {/* Display all page numbers */}
            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 ${currentPage === page ? 'bg-blue-600' : 'bg-gray-300'} text-white rounded-full mx-1`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-8 py-2 bg-gray-900 text-white rounded-full ml-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
