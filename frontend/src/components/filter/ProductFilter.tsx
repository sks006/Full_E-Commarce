/** @format */

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import {
     Accordion,
     AccordionContent,
     AccordionItem,
     AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPriceRange, resetPriceRange } from "../../slicer/priceRangeSlice";
import { toggleBrand, resetBrands } from "../../slicer/brandFilterSlice";
import {
     useGetAvailableBrandsQuery,
     useGetAvailablePriceRangeQuery,
     FALLBACK_BRANDS,
     FALLBACK_PRICE_RANGE,
} from "../../slicer/filterService";

const ProductFilter = () => {
     const dispatch = useAppDispatch();
     const priceRange = useAppSelector((state) => state.priceRange);
     const { selectedBrands } = useAppSelector((state) => state.brandFilter);

     // Fetch data from API with fallback to static data
     const {
          data: availableBrands,
          isLoading: brandsLoading,
          isError: brandsError,
     } = useGetAvailableBrandsQuery();

     const {
          data: availablePriceRange,
          isLoading: priceRangeLoading,
          isError: priceRangeError,
     } = useGetAvailablePriceRangeQuery();

     // Use API data or fallback data
     const brands =
          brandsLoading || brandsError ? FALLBACK_BRANDS : availableBrands;

     useEffect(() => {
          // Set initial price range from API if available and different from current state
          if (availablePriceRange && !priceRangeLoading && !priceRangeError) {
               if (
                    priceRange.min !== availablePriceRange.min ||
                    priceRange.max !== availablePriceRange.max
               ) {
                    dispatch(setPriceRange(availablePriceRange));
               }
          }
     }, [availablePriceRange, priceRangeLoading, priceRangeError, dispatch]);

     const handlePriceChange = (value: number[]) => {
          dispatch(setPriceRange({ min: value[0], max: value[1] }));
     };

     const handleBrandToggle = (brand: string) => {
          dispatch(toggleBrand(brand));
     };

     const handleClearFilters = () => {
          dispatch(resetPriceRange());
          dispatch(resetBrands());
     };

     return (
          <div className='w-full max-w-xs space-y-4 p-4 bg-white rounded-lg shadow-sm'>
               <div className='flex justify-between items-center mb-4'>
                    <h3 className='font-semibold'>Filters</h3>
                    <Button
                         variant='ghost'
                         size='sm'
                         onClick={handleClearFilters}
                         className='text-gray-500 hover:text-gray-700'>
                         <RotateCcw className='h-4 w-4 mr-2' />
                         Reset
                    </Button>
               </div>

               <Accordion
                    type='single'
                    collapsible
                    className='w-full'
                    defaultValue='price'>
                    <AccordionItem value='price'>
                         <AccordionTrigger className='text-sm font-medium'>
                              Price Range
                         </AccordionTrigger>
                         <AccordionContent>
                              <div className='space-y-4 pt-2'>
                                   <Slider
                                        value={[priceRange.min, priceRange.max]}
                                        max={1000}
                                        step={10}
                                        onValueChange={handlePriceChange}
                                        className='my-4'
                                   />
                                   <div className='flex justify-between text-sm text-gray-600'>
                                        <span>${priceRange.min}</span>
                                        <span>${priceRange.max}</span>
                                   </div>
                              </div>
                         </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value='brand'>
                         <AccordionTrigger className='text-sm font-medium'>
                              Brands
                         </AccordionTrigger>
                         <AccordionContent>
                              <div className='space-y-2'>
                                   {brandsLoading ? (
                                        <p className='text-sm text-gray-500'>
                                             Loading brands...
                                        </p>
                                   ) : (
                                        brands?.map((brand) => (
                                             <div
                                                  key={brand}
                                                  className='flex items-center space-x-2'>
                                                  <Checkbox
                                                       id={brand}
                                                       checked={selectedBrands.includes(
                                                            brand,
                                                       )}
                                                       onCheckedChange={() =>
                                                            handleBrandToggle(
                                                                 brand,
                                                            )
                                                       }
                                                  />
                                                  <Label
                                                       htmlFor={brand}
                                                       className='text-sm'>
                                                       {brand}
                                                  </Label>
                                             </div>
                                        ))
                                   )}
                              </div>
                         </AccordionContent>
                    </AccordionItem>
               </Accordion>
          </div>
     );
};

export default ProductFilter;
