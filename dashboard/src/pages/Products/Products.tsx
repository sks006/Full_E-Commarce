/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

import { useEffect, useState } from "react";
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
import { DataTable } from "@/components/common/DataTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
     fetchProducts,
     setSelectedProduct,
     updateFilters,
} from "@/Slicer/products/productsSlice";
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
     const [productDetailsOpen, setProductDetailsOpen] = useState(false);

     useEffect(() => {
          if (status === "idle") {
               dispatch(fetchProducts());
          }
     }, [dispatch, status]);

     const handleRowClick = (product: Product) => {
          dispatch(setSelectedProduct(product));
          setProductDetailsOpen(true);
     };

     if (status === "loading") {
          return (
               <div className='flex items-center justify-center h-[calc(100vh-8rem)]'>
                    <Loader2 className='h-8 w-8 animate-spin text-primary' />
               </div>
          );
     }

     const formatCurrency = (amount: number) => {
          return new Intl.NumberFormat("en-US", {
               style: "currency",
               currency: "USD",
          }).format(amount);
     };

     return (
          <div className='space-y-6 w-'>
               <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-bold tracking-tight'>
                         Products
                    </h1>
                    <div className='flex items-center gap-2'>
                         <Button variant='outline' className='gap-2'>
                              <Download className='h-4 w-4' />
                              Export
                         </Button>
                         <Button className='gap-2'>
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

                         <DataTable

                              data={Array.isArray(items) ? items.map(item => ({
                                   ...item,
                                   id: item.id.toString(),
                              })) : []}
                              columns={[
                                   {
                                        header: "Name",
                                        accessorKey: "name",
                                   },

                                   {
                                        header: "Price",
                                        accessorKey: "price",
                                        cell: (product) =>
                                             formatCurrency(product.price),
                                   },
                                   {
                                        header: "Stock",
                                        accessorKey: "stock",
                                        cell: (product) => (
                                             <div className='flex items-center gap-2'>
                                                  <div
                                                       className={`w-3 h-3 rounded-full ${product.stock > 50
                                                                 ? "bg-emerald-500"
                                                                 : product.stock >
                                                                      10
                                                                      ? "bg-amber-500"
                                                                      : "bg-rose-500"
                                                            }`}
                                                  />
                                                  <span>{product.stock}</span>
                                             </div>
                                        ),
                                   },
                                   {
                                        header: "Brand",
                                        accessorKey: "brand",
                                   },
                                   {
                                        header: "Category",
                                        accessorKey: "categoryId",
                                        cell: (product) =>
                                             `Category #${product.category_id}`,
                                   },
                                   {
                                        header: "Actions",
                                        accessorKey: "actions",
                                        cell: (product) => (
                                             <div className='flex items-center gap-2'>
                                                  <Button
                                                       variant='default'
                                                       size='default'
                                                       onClick={(e) => {
                                                            e.stopPropagation();
                                                            // Edit logic
                                                       }}>
                                                       <Plus className='mr-2 h-4 w-4' />
                                                       Create
                                                  </Button>
                                                  <Button
                                                       variant='destructive'
                                                       size='default'
                                                       onClick={(e) => {
                                                            e.stopPropagation();
                                                            // Delete logic
                                                       }}>
                                                       <Trash2 className='mr-2 h-4 w-4' />
                                                       Delete
                                                  </Button>
                                             </div>
                                        ),
                                   },
                              ]}
                              onRowClick={(item) =>
                                   handleRowClick({
                                        ...item,
                                        id: Number(item.id),
                                   })

                              }
                         />
                    </CardContent>
               </Card>

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
                                                            className={`w-3 h-3 rounded-full ${selectedProduct.stock >
                                                                      50
                                                                      ? "bg-emerald-500"
                                                                      : selectedProduct.stock >
                                                                           10
                                                                           ? "bg-amber-500"
                                                                           : "bg-rose-500"
                                                                 }`}
                                                       />
                                                       <span>
                                                            {selectedProduct.stock >
                                                                 50
                                                                 ? "In Stock"
                                                                 : selectedProduct.stock >
                                                                      10
                                                                      ? "Low Stock"
                                                                      : "Critical Stock"}
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
                                             {[1, 2, 3].map((i) => (
                                                  <div
                                                       key={i}
                                                       className='border rounded-md overflow-hidden'>
                                                       <div className='aspect-square bg-muted flex items-center justify-center'>
                                                            <span className='text-muted-foreground'>
                                                                 Image
                                                                 placeholder
                                                            </span>
                                                       </div>
                                                  </div>
                                             ))}
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
                                   <Button>Edit Product</Button>
                              </DialogFooter>
                         </DialogContent>
                    </Dialog>
               )}
          </div>
     );
}
