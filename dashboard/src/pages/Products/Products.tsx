/** @format */

import { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import {
     ChevronDown,
     Download,
     Loader2,
     Plus,
     Filter,
     Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
     fetchProducts,
     setSelectedProduct,
     updateFilters,
     deleteProduct,
} from "../../slicer/products/productsSlice";
import {
     Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
     DialogFooter,
     DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types/schema";


export function Products() {
     const dispatch = useAppDispatch();
     const { items, status, selectedProduct, filters } = useAppSelector(
          (state) => state.products,
     );
     const navigate = useNavigate();
     const [productDetailsOpen, setProductDetailsOpen] = useState(false);
     



     useEffect(() => {
          if (status === "idle") {

               dispatch(fetchProducts());
          }
     }, [dispatch, status]);

     const handleEditClick = (productId: number) => {

          navigate(`./update/${productId}`);
     };

     const handleRowClick = (product: Product) => {
          dispatch(setSelectedProduct(product));
          setProductDetailsOpen(true);
     };

     const handleDeleteClick = (e: React.MouseEvent, product_id: number) => {
          e.stopPropagation();
          console.log("Deleting product with ID: ", product_id);

          dispatch(deleteProduct(product_id))

               .then(() => {
                    dispatch(fetchProducts());
               })
               .catch((error) => {
                    console.error("Failed to delete product: ", error);
               });
     };

     const handelCreateClick = () => {
          navigate("/products/create");
     }




     const formatCurrency = (amount: number) => {
          return new Intl.NumberFormat("en-US", {
               style: "currency",
               currency: "USD",
          }).format(amount);
     };

     const getStockStatusClass = (stock: number) => {
          if (stock > 50) return "bg-emerald-500";
          if (stock > 10) return "bg-amber-500";
          return "bg-rose-500";
     };

     const getStockStatusText = (stock: number) => {
          if (stock > 50) return "In Stock";
          if (stock > 10) return "Low Stock";
          return "Critical Stock";
     };

     if (status === "loading" && items.length === 0) {
          return (
               <div className='flex items-center justify-center h-[calc(100vh-8rem)]'>
                    <Loader2 className='h-8 w-8 animate-spin text-primary' />
               </div>
          );
     }

     return (
          <div className='space-y-6'>
               <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-bold tracking-tight'>
                         Products
                    </h1>
                    <div className='flex items-center gap-2'>
                         <Button variant='outline' className='gap-2'>
                              <Download className='h-4 w-4' />
                              Export
                         </Button>
                         <Button
                              className='gap-2'
                              onClick={() => {
                                   handelCreateClick();
                              }}>
                              <Plus className='h-4 w-4' />
                              Add Product
                         </Button>
                    </div>
               </div>

               <Card>
                    <CardHeader className='pb-3'>
                         <CardTitle>Product Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className='flex flex-col md:flex-row gap-4 mb-6'>
                              <div className='flex-1'>
                                   <Input
                                        placeholder='Search products...'
                                        value={filters.search}
                                        onChange={(e) =>
                                             dispatch(
                                                  updateFilters({
                                                       search: e.target.value,
                                                  }),
                                             )
                                        }
                                        className='w-full'
                                   />
                              </div>
                              <div className='flex items-center gap-2'>
                                   <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                             <Button
                                                  variant='outline'
                                                  className='gap-2'>
                                                  <Filter className='h-4 w-4' />
                                                  Filter
                                                  <ChevronDown className='h-4 w-4' />
                                             </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                             align='end'
                                             className='w-[200px]'>
                                             <DropdownMenuItem
                                                  onClick={() =>
                                                       dispatch(
                                                            updateFilters({
                                                                 category:
                                                                      "Electronics",
                                                            }),
                                                       )
                                                  }>
                                                  Electronics
                                             </DropdownMenuItem>
                                             <DropdownMenuItem
                                                  onClick={() =>
                                                       dispatch(
                                                            updateFilters({
                                                                 category:
                                                                      "Clothing",
                                                            }),
                                                       )
                                                  }>
                                                  Clothing
                                             </DropdownMenuItem>
                                             <DropdownMenuItem
                                                  onClick={() =>
                                                       dispatch(
                                                            updateFilters({
                                                                 minPrice: 0,
                                                                 maxPrice: 100,
                                                            }),
                                                       )
                                                  }>
                                                  Under $100
                                             </DropdownMenuItem>
                                             <DropdownMenuItem
                                                  onClick={() =>
                                                       dispatch(
                                                            updateFilters({
                                                                 minPrice: 100,
                                                                 maxPrice: 500,
                                                            }),
                                                       )
                                                  }>
                                                  $100 - $500
                                             </DropdownMenuItem>
                                             <DropdownMenuItem
                                                  onClick={() =>
                                                       dispatch(
                                                            updateFilters({
                                                                 minPrice: 500,
                                                                 maxPrice: null,
                                                            }),
                                                       )
                                                  }>
                                                  Over $500
                                             </DropdownMenuItem>
                                        </DropdownMenuContent>
                                   </DropdownMenu>
                              </div>
                         </div>

                         {/* Table implementation without DataTable component */}
                         <div className='rounded-md border'>
                              <div className='relative w-full overflow-auto'>
                                   <table className='w-full caption-bottom text-sm'>
                                        <thead className='[&_tr]:border-b'>
                                             <tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
                                                  <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                                                       Name
                                                  </th>
                                                  <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                                                       Price
                                                  </th>
                                                  <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                                                       Stock
                                                  </th>
                                                  <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                                                       Brand
                                                  </th>
                                                  <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                                                       Category
                                                  </th>
                                                  <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                                                       Actions
                                                  </th>
                                             </tr>
                                        </thead>
                                        <tbody className='[&_tr:last-child]:border-0'>
                                             {(items || []).map((product) => (
                                                  <tr
                                                       key={product.id}
                                                       className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer'
                                                       onClick={() =>
                                                            handleRowClick(
                                                                 product,
                                                            )
                                                       }>
                                                       <td className='p-4 align-middle'>
                                                            {product.name}
                                                       </td>
                                                       <td className='p-4 align-middle'>
                                                            {formatCurrency(
                                                                 product.price,
                                                            )}
                                                       </td>
                                                       <td className='p-4 align-middle'>
                                                            <div className='flex items-center gap-2'>
                                                                 <div
                                                                      className={`w-3 h-3 rounded-full ${getStockStatusClass(
                                                                           product.stock,
                                                                      )}`}
                                                                 />
                                                                 <span>
                                                                      {
                                                                           product.stock
                                                                      }
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className='p-4 align-middle'>
                                                            {product.brand}
                                                       </td>
                                                       <td className='p-4 align-middle'>
                                                            Category #
                                                            {
                                                                 product.category_id
                                                            }
                                                       </td>
                                                       <td className='p-4 align-middle'>
                                                            <div className='flex items-center gap-2'>
                                                                 <Button
                                                                      variant='default'
                                                                      size='sm'
                                                                      onClick={() => {
                                                                           handleEditClick(
                                                                                product.id,
                                                                           );
                                                                      }}>
                                                                      <Plus className='mr-2 h-4 w-4' />
                                                                      Update
                                                                 </Button>
                                                                 <Button
                                                                      variant='destructive'
                                                                      size='sm'
                                                                      onClick={(
                                                                           e,
                                                                      ) =>
                                                                           handleDeleteClick(
                                                                                e,
                                                                                product.id,
                                                                           )
                                                                      }>
                                                                      <Trash2 className='mr-2 h-4 w-4' />
                                                                      Delete
                                                                 </Button>
                                                            </div>
                                                       </td>
                                                  </tr>
                                             ))}
                                        </tbody>
                                   </table>
                              </div>
                         </div>
                    </CardContent>
               </Card>

               {/* Product Details Dialog */}
               {selectedProduct && (
                    <Dialog
                         open={productDetailsOpen}
                         onOpenChange={setProductDetailsOpen}>
                         <DialogContent className='max-w-3xl'>
                              <DialogHeader>
                                   <DialogTitle>
                                        {selectedProduct.name}
                                   </DialogTitle>
                              </DialogHeader>

                              <Tabs defaultValue='details'>
                                   <TabsList className='mb-4 gap-1'>
                                        <TabsTrigger value='details'>
                                             Details
                                        </TabsTrigger>
                                        <TabsTrigger value='inventory'>
                                             Inventory
                                        </TabsTrigger>
                                        <TabsTrigger value='images'>
                                             Images
                                        </TabsTrigger>
                                   </TabsList>

                                   <TabsContent
                                        value='details'
                                        className='space-y-4'>
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                             <div>
                                                  <h3 className='text-sm font-medium text-muted-foreground mb-1'>
                                                       Product Name
                                                  </h3>
                                                  <p className='text-lg'>
                                                       {selectedProduct.name}
                                                  </p>
                                             </div>
                                             <div>
                                                  <h3 className='text-sm font-medium text-muted-foreground mb-1'>
                                                       Brand
                                                  </h3>
                                                  <p className='text-lg'>
                                                       {selectedProduct.brand ||
                                                            "N/A"}
                                                  </p>
                                             </div>
                                             <div>
                                                  <h3 className='text-sm font-medium text-muted-foreground mb-1'>
                                                       Price
                                                  </h3>
                                                  <p className='text-lg'>
                                                       {formatCurrency(
                                                            selectedProduct.price,
                                                       )}
                                                  </p>
                                             </div>
                                             <div>
                                                  <h3 className='text-sm font-medium text-muted-foreground mb-1'>
                                                       Category
                                                  </h3>
                                                  <p className='text-lg'>
                                                       Category #
                                                       {
                                                            selectedProduct.category_id
                                                       }
                                                  </p>
                                             </div>
                                        </div>

                                        <div>
                                             <h3 className='text-sm font-medium text-muted-foreground mb-1'>
                                                  Description
                                             </h3>
                                             <p className='text-base'>
                                                  {selectedProduct.description}
                                             </p>
                                        </div>
                                   </TabsContent>

                                   <TabsContent
                                        value='inventory'
                                        className='space-y-4'>
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                             <div>
                                                  <h3 className='text-sm font-medium text-muted-foreground mb-1'>
                                                       Stock Level
                                                  </h3>
                                                  <p className='text-lg'>
                                                       {selectedProduct.stock}{" "}
                                                       units
                                                  </p>
                                             </div>
                                             <div>
                                                  <h3 className='text-sm font-medium text-muted-foreground mb-1'>
                                                       Status
                                                  </h3>
                                                  <div className='flex items-center gap-2'>
                                                       <div
                                                            className={`w-3 h-3 rounded-full ${getStockStatusClass(
                                                                 selectedProduct.stock,
                                                            )}`}
                                                       />
                                                       <span>
                                                            {getStockStatusText(
                                                                 selectedProduct.stock,
                                                            )}
                                                       </span>
                                                  </div>
                                             </div>
                                             <div>
                                                  <h3 className='text-sm font-medium text-muted-foreground mb-1'>
                                                       Seller
                                                  </h3>
                                                  <p className='text-lg'>
                                                       Seller #
                                                       {
                                                            selectedProduct.seller_id
                                                       }
                                                  </p>
                                             </div>
                                        </div>
                                   </TabsContent>

                                   <TabsContent
                                        value='images'
                                        className='space-y-4'>
                                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                             {(() => {
                                                  try {
                                                       const imageArray =
                                                            JSON.parse(
                                                                 selectedProduct.images,
                                                            ); // Parse JSON string
                                                       if (
                                                            !Array.isArray(
                                                                 imageArray,
                                                            )
                                                       )
                                                            return null;

                                                       return imageArray
                                                            .filter(
                                                                 (
                                                                      url: string,
                                                                 ) =>
                                                                      url.trim() !==
                                                                      "",
                                                            )
                                                            .map(
                                                                 (
                                                                      image: string,
                                                                      index: number,
                                                                 ) => (
                                                                      <div
                                                                           key={
                                                                                index
                                                                           }
                                                                           className='flex items-center justify-center h-32 bg-gray-200 rounded-md overflow-hidden'>
                                                                           <img
                                                                                src={image.trim()}
                                                                                alt={`Product Image ${
                                                                                     index +
                                                                                     1
                                                                                }`}
                                                                                className='object-cover h-full w-full rounded-md'
                                                                           />
                                                                      </div>
                                                                 ),
                                                            );
                                                  } catch (error) {
                                                       console.error(
                                                            "Invalid image format",
                                                            error,
                                                       );
                                                       return (
                                                            <p className='text-red-500'>
                                                                 Failed to load
                                                                 images
                                                            </p>
                                                       );
                                                  }
                                             })()}
                                        </div>
                                   </TabsContent>
                              </Tabs>

                              <DialogFooter>
                                   <DialogClose asChild>
                                        <Button
                                             variant='outline'
                                             className='mr-2'>
                                             Close
                                        </Button>
                                   </DialogClose>
                                   <Button
                                        onClick={() =>
                                             handleEditClick(selectedProduct.id)
                                        }>
                                        Edit Product
                                   </Button>
                              </DialogFooter>
                         </DialogContent>
                    </Dialog>
               )}
          </div>
     );
}
