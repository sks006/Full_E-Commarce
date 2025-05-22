/** @format */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "@/slicer/productSlicer";
import ProductCard from "../product/ProductCard";
import ProductSection from "./ProductSection";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";

const TrendingProductSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.products);
  const trendingProducts = items?.slice(0, 8) || []; // Add fallback empty array

  useEffect(() => {
       if (status === "idle") {
            dispatch(fetchProducts());
       }
  }, [status, dispatch]);
  
     return (
          <ProductSection title='Trending Product' showAllLink='/trending'>
               <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
                    {trendingProducts.map((product) => (
                         <ProductCard
                              key={product.id}
                              id={product.id}
                              title={product.description}
                              price={product.price}
                              stock={product.stock}
                              image={product.images}
                              // rating={product.rating}
                              // reviewCount={product.reviewCount}
                         />
                    ))}
               </div>
          </ProductSection>
     );
};

export default TrendingProductSection;
