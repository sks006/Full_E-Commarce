/** @format */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/slicer/productSlicer";
import type { RootState, AppDispatch } from "@/store/store";

import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Rating from "@/components/common/Rating";
import ProductPrice from "@/components/product/ProductPrice";
import QuantitySelector from "@/components/ui/quantity-selector";
import { cn } from "@/lib/utils";

import {
     Heart,
     ShoppingCart,
     Share2,
     Truck,
     RefreshCw,
     Shield,
} from "lucide-react";



const ProductDetail = () => {
     const { id } = useParams();
     const dispatch = useDispatch<AppDispatch>();
     const { items, status } = useSelector(
          (state: RootState) => state.products,
     );

     const [quantity, setQuantity] = useState(1);
     const [mainImage, setMainImage] = useState("");
    
      const product = items?.find((item) => item.id === Number(id));

     useEffect(() => {
          if (status === "idle") {
               dispatch(fetchProducts());
          }

          // Parse images from comma-separated string
          if (product.images) {
               try {
                    const images = JSON.parse(product.images);
                    setMainImage(images[0]);
               } catch (e) {
                    console.error("Invalid image JSON", e);
               }
          }
        
     }, [dispatch, status, product.images]);

     const increaseQuantity = () => {
          if (quantity < product.stock) setQuantity((q) => q + 1);
     };

     const decreaseQuantity = () => {
          if (quantity > 1) setQuantity((q) => q - 1);
     };

     const relatedProducts = Array.isArray(items)
          ? items.filter(
                 (p) =>
                      p.category_id === product.category_id &&
                      p.id !== product.id,
            )
          : [];

     return (
          <Layout>
               <div className='container mx-auto px-4 py-8'>
                    <div className='bg-white rounded-lg shadow-sm overflow-hidden mb-10'>
                         <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-6'>
                              {/* Product Image Section */}
                              <div>
                                   <img
                                        src={mainImage}
                                        alt={product.name}
                                        className='rounded-lg w-full aspect-square object-cover'
                                   />
                                   <div className='grid grid-cols-4 gap-2 mt-2'>
                                        {Array.isArray(product.images)
                                             ? product.images.map(
                                                    (img, index) => (
                                                         <img
                                                              key={index}
                                                              src={img}
                                                              alt={`Thumbnail ${index}`}
                                                              className={cn(
                                                                   "rounded border-2 cursor-pointer aspect-square object-cover",
                                                                   mainImage ===
                                                                        img
                                                                        ? "border-red-500"
                                                                        : "border-transparent",
                                                              )}
                                                              onClick={() =>
                                                                   setMainImage(
                                                                        img,
                                                                   )
                                                              }
                                                         />
                                                    ),
                                               )
                                             : (() => {
                                                    let parsedImages: string[] =
                                                         [];
                                                    try {
                                                         parsedImages =
                                                              JSON.parse(
                                                                   product.images,
                                                              );
                                                    } catch (error) {
                                                         console.error(
                                                              "Invalid image JSON",
                                                              error,
                                                         );
                                                    }
                                                    return parsedImages.map(
                                                         (img, index) => (
                                                              <img
                                                                   key={index}
                                                                   src={img}
                                                                   alt={`Thumbnail ${index}`}
                                                                   className={cn(
                                                                        "rounded border-2 cursor-pointer aspect-square object-cover",
                                                                        mainImage ===
                                                                             img
                                                                             ? "border-red-500"
                                                                             : "border-transparent",
                                                                   )}
                                                                   onClick={() =>
                                                                        setMainImage(
                                                                             img,
                                                                        )
                                                                   }
                                                              />
                                                         ),
                                                    );
                                               })()}
                                   </div>
                              </div>

                              {/* Product Info Section */}
                              <div>
                                   <h1 className='text-2xl font-bold mb-2'>
                                        {product.name}
                                   </h1>
                                   <div className='flex items-center mb-4'>
                                        <Rating
                                             rating={4.5}
                                             reviewCount={120}
                                        />
                                        <span className='ml-2 text-sm text-green-600'>
                                             In stock
                                        </span>
                                   </div>
                                   <ProductPrice
                                        price={product.price}
                                        size='lg'
                                   />
                                   <p className='text-gray-600 mt-4 mb-6'>
                                        {product.description}
                                   </p>

                                   <QuantitySelector
                                        quantity={quantity}
                                        onIncrease={increaseQuantity}
                                        onDecrease={decreaseQuantity}
                                        minQuantity={1}
                                        maxQuantity={product.stock}
                                   />

                                   <div className='flex gap-2 mt-4'>
                                        <Button className='bg-red-500 hover:bg-red-600'>
                                             <ShoppingCart className='w-4 h-4 mr-2' />
                                             Add to Cart
                                        </Button>
                                        <Button variant='outline' size='icon'>
                                             <Heart />
                                        </Button>
                                        <Button variant='outline' size='icon'>
                                             <Share2 />
                                        </Button>
                                   </div>

                                   {/* Misc Info */}
                                   <div className='mt-6 space-y-2 text-sm'>
                                        <div className='flex items-center gap-2'>
                                             <Truck className='w-4 h-4 text-green-600' />
                                             Free shipping on orders over $100
                                        </div>
                                        <div className='flex items-center gap-2'>
                                             <RefreshCw className='w-4 h-4 text-green-600' />
                                             30-day returns
                                        </div>
                                        <div className='flex items-center gap-2'>
                                             <Shield className='w-4 h-4 text-green-600' />
                                             2-year warranty
                                        </div>
                                   </div>
                              </div>
                         </div>

                         {/* Tabs Section */}
                         <div className='px-6 pb-6'>
                              <Tabs defaultValue='description'>
                                   <TabsList className='w-full border-b mb-4'>
                                        <TabsTrigger value='description'>
                                             Description
                                        </TabsTrigger>
                                        <TabsTrigger value='reviews'>
                                             Reviews
                                        </TabsTrigger>
                                   </TabsList>

                                   <TabsContent value='description'>
                                        <p>{product.description}</p>
                                   </TabsContent>

                                   <TabsContent value='reviews'>
                                        <p>Reviews will go here...</p>
                                   </TabsContent>
                              </Tabs>
                         </div>
                    </div>

                    {/* Related Products Section */}
                    {relatedProducts.length > 0 && (
                         <div className='mb-10'>
                              <h2 className='text-2xl font-bold mb-4'>
                                   Related Products
                              </h2>
                              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                                   {relatedProducts.map((p) => (
                                        <ProductCard
                                             key={p.id}
                                             id={p.id}
                                             title={p.name}
                                             price={p.price}
                                             stock={p.stock}
                                             image={p.images.split(",")[0]}
                                        />
                                   ))}
                              </div>
                         </div>
                    )}
               </div>
          </Layout>
     );
};

export default ProductDetail;
