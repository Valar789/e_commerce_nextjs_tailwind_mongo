import ProductItem from "../components/ProductItem";
import Layout from "../components/Layout";
import db from "../utils/db";
import Product from "../models/Product";
import axios from "axios";

import { useContext } from "react";
import { Store } from "../utils/Store";

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    console.log(product._id);

    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return alert("'Sorry. Product is out of stock'")
    }
    else{
      dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

      alert("Product Add")
    }
   
  };

  return (
    <Layout title="Home ">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const dataProdcuts = await Product.find().lean();

  const products = dataProdcuts.map(db.convertDocToObj);

  return {
    props: {
      products,
    },
  };
}
