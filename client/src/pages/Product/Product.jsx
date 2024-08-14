import React from "react";
import { useState } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";

const Product = () => {
  const dummyData = {
    id: 1,
    attributes: {
      title: "Dummy Product",
      price: 999,
      desc: "This is a dummy description for the product.",
      img1: {
        data: {
          attributes: {
            url: "/img/dummy_img1.webp",
          },
        },
      },
      img2: {
        data: {
          attributes: {
            url: "/img/dummy_img2.webp",
          },
        },
      },
    },
  };

  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img1");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  // const { data, loading, error } = useFetch(`/products/${id}?populate=*`);
  const data = dummyData;
  const loading = false;

  return (
    <div className="product">
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="left">
            <div className="images">
              <img
                src={data?.attributes?.img1?.data?.attributes?.url}
                alt=""
                onClick={(e) => setSelectedImg("img1")}
              />
              <img
                src={data?.attributes?.img2?.data?.attributes?.url}
                alt=""
                onClick={(e) => setSelectedImg("img2")}
              />
            </div>
            <div className="mainImg">
              <img
                src={data?.attributes[selectedImg]?.data?.attributes?.url}
                alt=""
              />
            </div>
          </div>
          <div className="right">
            <h1>{data?.attributes?.title}</h1>
            <span className="price">₹{data?.attributes?.price}</span>
            <p>{data?.attributes?.desc}</p>
            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>

            <button
              className="add"
              onClick={() => {
                const imageUrl = data?.attributes?.img1?.data?.attributes?.url;
                console.log("Image URL:", imageUrl);
                dispatch(
                  addToCart({
                    id: data?.id,
                    title: data?.attributes?.title,
                    desc: data?.attributes?.desc,
                    price: data?.attributes?.price,
                    img: imageUrl,
                    quantity,
                  })
                );
              }}
            >
              <AddShoppingCartIcon /> ADD TO CART
            </button>
            <div className="links">
              <div className="item">
                <FavoriteBorderIcon /> ADD TO WISH LIST
              </div>
              <div className="item">
                <BalanceIcon /> ADD TO COMPARE
              </div>
            </div>
            <div className="info">
              <span>Vendor: Polo</span>
              <span>Product Type: T-Shirt</span>
              <span>Tag: T-Shirt, Women, Top</span>
            </div>
            <hr />
            <div className="info">
              <span>DESCRIPTION</span>
              <hr />
              <span>ADDITIONAL INFORMATION</span>
              <hr />
              <span>FAQ</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
