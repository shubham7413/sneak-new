import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import useFetch from "../../hooks/useFetch";
import "./Products.scss";

const Products = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [sort, setSort] = useState(null);
  const [selectedSubCats, setSelectedSubCats] = useState([]);

  const dummyData = [
    {
      id: 1,
      attributes: {
        title: "Product 1",
        price: 15000,
        img1: "/img/dummy_img1.webp",
        img2: "/img/dummy_img2.webp",
      },
    },
    {
      id: 2,
      attributes: {
        title: "Product 2",
        price: 8000,
        img1: "/img/dummy_img4.webp",
        img2: "/img/dummy_img5.webp",
      },
    },
    {
      id: 3,
      attributes: {
        title: "Product 3",
        price: 12000,
        img1: "/img/dummy_img6.webp",
        img2: "/img/dummy_img7.webp",
      },
    },
    // Add more products as needed
  ];

  const data = dummyData;
  const loading = false;
  // const { data, loading, error } = useFetch(
  //   `/subcategories?[filters][categories][id][$eq]=${catId}`
  // );

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Select Brand</h2>
          {data?.map((item) => (
            <div className="inputItem" key={item.id}>
              <input
                type="checkbox"
                id={item.id}
                value={item.id}
                onChange={handleChange}
              />
              <label htmlFor={item.id}>{item.attributes.title}</label>
            </div>
          ))}
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={20000}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setSort("asc")}
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setSort("desc")}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <img
          className="catImg"
          src="https://culted.com/wp-content/uploads/2022/10/a1e8f6671a9476a30b59d65af728549b8fada211-1100x735-1.jpg"
          alt=""
        />
        <List catId={catId} maxPrice={maxPrice} sort={sort} subCats={data} />
      </div>
    </div>
  );
};

export default Products;
