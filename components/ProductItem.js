/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default function ProductItem({ product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            className="rounded shadow"
            src={product.image}
            alt={product.name}
          />
        </a>
      </Link>
      <div className="flex flex-col justify-center items-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2>{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button className="primary-button" type="button"> Add to cart</button>
      </div>
    </div>
  );
}
