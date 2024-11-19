import React, { useEffect, useState } from "react";

const Products = () => {
  const [item, setItem] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const getProducts = async () => {
    // const responce = await fetch("https://api.pujakaitem.com/api/products");
    // const responce = await fetch("https://jsonplaceholder.typicode.com/photos");

    const responce = await fetch("https://fakestoreapi.com/products");
    const data = await responce.json();
    setItem(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  //   const filteredItems = item.filter((curElem) =>
  //     curElem.title.toLowerCase().includes(search.toLowerCase())
  //   );

  const filteredItems = item
    .filter((curElem) =>
      curElem.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "price-high") {
        return b.price - a.price;
      } else if (sortOption === "price-low") {
        return a.price - b.price;
      } else if (sortOption === "rating-high") {
        return b.rating.rate - a.rating.rate;
      } else if (sortOption === "rating-low") {
        return a.rating.rate - b.rating.rate;
      } else {
        return 0;
      }
    });

  return (
    <div className="bg-green-300">
      <h1 className="mx-auto text-center p-2 text-[40px] text-white">
        List of Product
      </h1>
      <div className="text-center flex  justify-evenly p-5 text-[30px] text-white">
        <input
          className="w-[400px] h-[60px] rounded-2xl border border-white mx-auto bg-slate-300 text-center"
          type="text"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="ml-4 p-2 rounded-2xl text-black"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Sort by</option>
          <option value="price-high">Price: High to Low</option>
          <option value="price-low">Price: Low to High</option>
          <option value="rating-high">Rating: High to Low</option>
          <option value="rating-low">Rating: Low to High</option>
        </select>
      </div>

      <div className="w-[1300px] grid grid-cols-2 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mx-auto">
        {filteredItems.map((curElem) => {
          return (
            <div
              key={curElem.id}
              className="w-[400px] h-[450px] p-2 bg-white rounded-md shadow-lg px-10 hover:shadow-2xl hover:shadow-orange-200 hover:cursor-pointer"
            >
              <div className="flex flex-col">
                <div className="flex text-sm">
                  <p>Description:</p>
                  <p>
                    {curElem.description.split(" ").slice(0, 10).join(" ")}...
                  </p>
                </div>
                <img
                  src={curElem.image}
                  alt="img"
                  className="w-[300px] rounded-lg shadow-xl h-[300px] p-1 m-auto"
                />
                <div className="flex">
                  <h2>Title:</h2>
                  <p className="text-[14px] pt-[2px]">{curElem.title}</p>
                </div>
                <div className="flex">
                  <h2>Price:</h2>
                  <p className="text-[14px] pt-[2px]">{curElem.price}</p>
                </div>
                <div className="flex">
                  <h2>Rating:</h2>
                  <p className="text-[14px] pt-[2px]">{curElem.rating.rate}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
