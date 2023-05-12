import React, { useEffect, useState } from 'react';
import type { Product } from '../../types';
import productService from '../../services/productService';
import { Link } from 'react-router-dom';

const shortenString = (text: string): string => {
  if (text.length > 103) return text.slice(0, 101).concat('...');
  return text;
};

export default function HomePage(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const initializeProduct = async (): Promise<void> => {
      const products = await productService.getAll();
      setProducts(products);
    };
    initializeProduct().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <>
      {products.length > 0 && (
        <div className=" flex w-screen flex-row justify-center bg-neutral-white">
          <main className="mt-6 flex max-w-screen-xl flex-wrap justify-center gap-x-8 gap-y-5">
            {products.map((product) => (
              <Link
                className="group"
                key={product.id}
                to={`/ProductPage/${product.id ?? -1}`}
              >
                <figure className="w-60">
                  <img
                    className="h-52 w-full border-4 border-neutral-gray"
                    src={product.image ?? ''}
                    alt="Product"
                  />
                  <div className="flex h-36 flex-col justify-between bg-neutral-gray">
                    <figcaption className="ml-2 group-hover:underline">
                      {shortenString(product.name)}
                    </figcaption>
                    <p className="mb-1 ml-2 group-hover:underline">
                      ${product.price}
                    </p>
                  </div>
                </figure>
              </Link>
            ))}
          </main>
        </div>
      )}
    </>
  );
}
