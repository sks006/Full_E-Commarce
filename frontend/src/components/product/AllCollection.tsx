/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/slicer/productSlicer";
import type { RootState, AppDispatch } from "@/store/store";
import ProductCard from "../product/ProductCard";
import ProductSection from "./ProductSection";

const AllCollection = () => {
     const dispatch = useDispatch<AppDispatch>();
     const { items, status } = useSelector(
          (state: RootState) => state.products,
     );

     const [currentPage, setCurrentPage] = useState(1);
     const productsPerPage = 8;

     useEffect(() => {
          if (status === "idle") {
               dispatch(fetchProducts());
          }
     }, [status, dispatch]);

     const allItems = Array.isArray(items) ? items : [];
     const totalPages = Math.ceil(allItems.length / productsPerPage);
     const startIndex = (currentPage - 1) * productsPerPage;
     const endIndex = startIndex + productsPerPage;
     const currentProducts = allItems.slice(startIndex, endIndex);

     const goToPage = (page: number) => {
          if (page >= 1 && page <= totalPages) {
               setCurrentPage(page);
          }
     };

     return (
          <ProductSection
               title='All Collections'
               showAllLink='/collections/summer'>
               <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
                    {currentProducts.map((product) => {
                         let imageUrl = "";

                         try {
                              const parsedImages = JSON.parse(product.images);
                              if (
                                   Array.isArray(parsedImages) &&
                                   parsedImages.length > 0
                              ) {
                                   imageUrl = parsedImages[0];
                              }
                         } catch (error) {
                              console.error(
                                   "Invalid image JSON for product:",
                                   product.id,
                                   error,
                              );
                         }

                         return (
                              <ProductCard
                                   key={product.id}
                                   id={product.id}
                                   title={product.description}
                                   price={product.price}
                                   stock={product.stock}
                                   image={imageUrl}
                              />
                         );
                    })}
               </div>

               {/* Tailwind Pagination */}
               {totalPages > 1 && (
                    <div className='flex justify-center items-center mt-8 space-x-2'>
                         <button
                              className='px-3 py-1 border rounded disabled:opacity-50'
                              onClick={() => goToPage(currentPage - 1)}
                              disabled={currentPage === 1}>
                              Prev
                         </button>

                         {Array.from({ length: totalPages }, (_, index) => {
                              const page = index + 1;
                              return (
                                   <button
                                        key={page}
                                        onClick={() => goToPage(page)}
                                        className={`px-3 py-1 border rounded ${
                                             page === currentPage
                                                  ? "bg-black text-white"
                                                  : "hover:bg-gray-200"
                                        }`}>
                                        {page}
                                   </button>
                              );
                         })}

                         <button
                              className='px-3 py-1 border rounded disabled:opacity-50'
                              onClick={() => goToPage(currentPage + 1)}
                              disabled={currentPage === totalPages}>
                              Next
                         </button>
                    </div>
               )}
          </ProductSection>
     );
};

export default AllCollection;
