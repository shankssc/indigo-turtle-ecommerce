import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from '../../services/productService';
import type { Product } from '../../types';
import { useDispatch } from 'react-redux';
import { add } from '../../store';

export default function ProductPage(): JSX.Element {
  const { id } = useParams<{ id?: string }>();
  const productId = id !== undefined ? parseInt(id) : undefined;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  // Fetch all products from homepage and display only the product where the id matches
  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      const products = await productService.getAll();
      if (productId !== undefined) {
        const selectedProduct = products.find((p) => p.id === productId);
        setProduct(selectedProduct ?? null);
      }
    };

    fetchProducts().catch((err) => {
      console.log(err);
    });
  }, [productId]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(event.target.value);
    if (value >= 1 && value <= (product?.quantity ?? 1)) {
      setQuantity(value);
    }
  };

  // this method will use the add method from store.ts and the quantity the user selected to add product to cart
  const addToCart = (): void => {
    if (product !== null) {
      dispatch(add({ ...product, quantity: quantity })); // use the selected quantity
    }
  };

  // show loading message if product is not yet fetched
  if (product === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {product !== null && (
        <div className="w-full min-h-screen flex justify-center items-center p-6 bg-neutral-white" style={{ minHeight: "calc(100vh - 104px)" }}>
        <div className="w-full md:w-10/12 lg:w-10/12 xl:w-10/12 2xl:w-10/12 p-6 rounded-lg shadow-md h-full flex flex-col">
          <div className="flex-grow flex flex-col md:flex-row">
            <img
              className="w-full md:w-1/2 object-cover md:mr-6 mb-4 md:mb-0 rounded-lg"
              src={product.image}
              alt={product.name}
            />
            {/* Display "Low stock available" if available quantity is less than 5 */}
            {product.quantity < 5 && (
              <p className="text-red-600">Low stock available</p>
            )}
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div className="w-full flex flex-row justify-between">
                <div>
                  <h1 className="text-xl font-bold mb-2">{product.name}</h1>
                  <p className="mb-2">Sold by {product.userId}</p>
                </div>
                <p className="text-xl font-bold mb-2">${product.price}</p>
              </div>
              <div className="mb-4 flex justify-end items-center">
                <div>
                  <label>Quantity: </label>
                  <input
                    type="number"
                    min={1}
                    max={product.quantity}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="pl-2 border"
                  />
                </div>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-yellow-500 text-black" 
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="border-t mt-4 pt-4">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      
      )}
    </>
  );
}
