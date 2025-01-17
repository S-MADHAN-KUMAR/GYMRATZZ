import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { getAllproducts } from "../../API/shop.js";
import Card from '../../components/user/Card.jsx'
import Aside from "../../components/user/Aside.jsx";

const Shop = () => {
  const [numItems, setNumItems] = useState(9);
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAndSortProducts = async () => {
      try {
        const fetchedProducts = await getAllproducts()
    
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
  }, [filter, numItems,searchQuery]);

  const handleSelectChange = (e) => {
    setFilter(e.target.value);
  };
  const handleSelectChangeNums = (e) => {
    setNumItems(parseInt(e.target.value));
  };
  


  return (
    <div className="container">
<div className="flex justify-between md:flex-row flex-col">
        {/* SEARCH */}
        <div className="flex border-gray-800 border m-2 md:w-9/12">
        <input value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} type="text" placeholder="Search products..." className=" outline-none pop w-11/12 md:p-2 p-1" />
        <div className="bg-gray-800 p-1 flex items-center justify-center w-2/12">
<IoIosSearch className="text-gray-100 md:w-7 md:h-7 w-6 h-6"/>
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
          <option value="1">Shows 1</option>
          <option value="3">Shows 3</option>
          <option value="6">Shows 6</option>
          <option value="9">Shows 9</option>
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
      <div className="flex">
        <Aside/>
      {/* PRODUCTS */}
      <div className="bg-[#f0f0f153] w-full p-5 ">
      <p className="h1 text-2xl text-gray-800 tracking-widest font-medium ">we have found <span className="text-blue-600">{numItems}</span> products</p>
      <div className="w-full relative grid md:grid-cols-4 my-10 gap-10">
            {products.length > 0 ? (
              products.slice(0, numItems).map((product) => (
                <Card key={product._id} product={product} />
              ))
            ) : (
              <div className='flex flex-col w-full justify-center items-center absolute top-12 left-1/2 transform -translate-x-1/2 '>
                <img className='w-[200px] md:w-[300px]' src="https://media0.giphy.com/media/WSxyc3kHnD9GvVbWDO/giphy.gif?cid=6c09b952ytj5o1pa6h1sxb9seg2bq8rvwkx7kprawg1rmsz7&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="" />
                <p className='h1 whitespace-nowrap text-lg md:text-4xl font-medium mt-6 to-gray-600 tracking-wider'>No products found !</p>
                </div>
            )}
          </div>
          </div>
       </div>
 
    </div>
  );
};

export default Shop;
