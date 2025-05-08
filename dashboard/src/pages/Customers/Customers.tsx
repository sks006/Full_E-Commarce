/** @format */

import { useEffect, useState } from "react";
import {
<<<<<<< HEAD
     ChevronDown,
     Download,
     Loader2,
     Mail,
     Phone,
     Plus,
     ShoppingBag,
     User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
=======
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DataTable } from '@/components/common/DataTable';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  fetchCustomers, 
  setSelectedCustomer, 
  updateFilters 
} from '@/Slicer/customers/customersSlice';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
>>>>>>> 0556007ae29593ba7b6666ed30cb0530f0cc0c59
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DataTable } from "@/components/common/DataTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
     fetchCustomers,
     setSelectedCustomer,
     updateFilters,
} from "@/slicer/customers/customersSlice";
import {
     Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
     DialogFooter,
     DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { User as CustomerType } from "@/types/schema";

export function Customers() {
     const dispatch = useAppDispatch();
     const { items, status, selectedCustomer, filters } = useAppSelector(
          (state) => state.customers,
     );
     const [customerDetailsOpen, setCustomerDetailsOpen] = useState(false);

     useEffect(() => {
          if (status === "idle") {
               dispatch(fetchCustomers());
          }
     }, [dispatch, status]);

     const handleRowClick = (customer: CustomerType) => {
          dispatch(setSelectedCustomer(customer));
          setCustomerDetailsOpen(true);
     };

     if (status === "loading") {
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
                         Customers
                    </h1>
                    <div className='flex items-center gap-2'>
                         <Button variant='outline' className='gap-2'>
                              <Download className='h-4 w-4' />
                              Export
                         </Button>
                         <Button className='gap-2'>
                              <Plus className='h-4 w-4' />
                              Add Customer
                         </Button>
                    </div>
               </div>

               <Card>
                    <CardHeader className='pb-3'>
                         <CardTitle>Customer Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className='flex flex-col md:flex-row gap-4 mb-6'>
                              <div className='flex-1'>
                                   <Input
                                        placeholder='Search customers...'
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
                                                  <ChevronDown className='h-4 w-4' />
                                                  More Actions
                                             </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                             align='end'
                                             className='w-[200px]'>
                                             <DropdownMenuItem>
                                                  Email Selected
                                             </DropdownMenuItem>
                                             <DropdownMenuItem>
                                                  Add to Segment
                                             </DropdownMenuItem>
                                             <DropdownMenuItem>
                                                  Bulk Edit
                                             </DropdownMenuItem>
                                        </DropdownMenuContent>
                                   </DropdownMenu>
                              </div>
                         </div>

                         <DataTable
                              data={items}
                              columns={[
                                   {
                                        header: "Customer",
                                        accessorKey: "name",
                                        cell: (customer) => (
                                             <div className='flex items-center gap-3'>
                                                  <Avatar>
                                                       <AvatarFallback>
                                                            {customer.name
                                                                 .split(" ")
                                                                 .map(
                                                                      (n) =>
                                                                           n[0],
                                                                 )
                                                                 .join("")}
                                                       </AvatarFallback>
                                                  </Avatar>
                                                  <div>
                                                       <p className='font-medium'>
                                                            {customer.name}
                                                       </p>
                                                       <p className='text-sm text-muted-foreground'>
                                                            {customer.email}
                                                       </p>
                                                  </div>
                                             </div>
                                        ),
                                   },
                                   {
                                        header: "Phone",
                                        accessorKey: "phone",
                                        cell: (customer) =>
                                             customer.phone || "N/A",
                                   },
                                   {
                                        header: "Gender",
                                        accessorKey: "gender",
                                   },
                                   {
                                        header: "Created",
                                        accessorKey: "createdAt",
                                        cell: (customer) =>
                                             format(
                                                  new Date(customer.createdAt),
                                                  "MMM dd, yyyy",
                                             ),
                                   },
                                   {
                                        header: "Actions",
                                        accessorKey: "actions",
                                        cell: (customer) => (
                                             <div className='flex items-center gap-2'>
                                                  <Button
                                                       variant='ghost'
                                                       size='icon'
                                                       onClick={(e) => {
                                                            e.stopPropagation();
                                                            window.location.href = `mailto:${customer.email}`;
                                                       }}>
                                                       <Mail className='h-4 w-4' />
                                                  </Button>
                                                  <Button
                                                       variant='ghost'
                                                       size='icon'
                                                       onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (
                                                                 customer.phone
                                                            ) {
                                                                 window.location.href = `tel:${customer.phone}`;
                                                            }
                                                       }}
                                                       disabled={
                                                            !customer.phone
                                                       }>
                                                       <Phone className='h-4 w-4' />
                                                  </Button>
                                             </div>
                                        ),
                                   },
                              ]}
                              onRowClick={handleRowClick}
                         />
                    </CardContent>
               </Card>

               {selectedCustomer && (
                    <Dialog
                         open={customerDetailsOpen}
                         onOpenChange={setCustomerDetailsOpen}>
                         <DialogContent className='max-w-3xl'>
                              <DialogHeader>
                                   <DialogTitle>Customer Details</DialogTitle>
                              </DialogHeader>

                              <div className='flex flex-col sm:flex-row gap-4 mb-6'>
                                   <div className='flex flex-col items-center gap-2'>
                                        <Avatar className='h-24 w-24'>
                                             <AvatarFallback className='text-2xl'>
                                                  {selectedCustomer.name
                                                       .split(" ")
                                                       .map((n) => n[0])
                                                       .join("")}
                                             </AvatarFallback>
                                        </Avatar>
                                        <h2 className='text-xl font-semibold'>
                                             {selectedCustomer.name}
                                        </h2>
                                        <p className='text-sm text-muted-foreground'>
                                             {selectedCustomer.email}
                                        </p>
                                   </div>

                                   <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                        <div>
                                             <h3 className='text-sm font-medium text-muted-foreground mb-1'>
                                                  Phone
                                             </h3>
                                             <p className='text-base'>
                                                  {selectedCustomer.phone ||
                                                       "N/A"}
                                             </p>
                                        </div>
                                        <div>
                                             <h3 className='text-sm font-medium text-muted-foreground mb-1'>
                                                  Gender
                                             </h3>
                                             <p className='text-base'>
                                                  {selectedCustomer.gender ||
                                                       "N/A"}
                                             </p>
                                        </div>
                                        <div>
                                             <h3 className='text-sm font-medium text-muted-foreground mb-1'>
                                                  Customer Since
                                             </h3>
                                             <p className='text-base'>
                                                  {format(
                                                       new Date(
                                                            selectedCustomer.createdAt,
                                                       ),
                                                       "MMMM dd, yyyy",
                                                  )}
                                             </p>
                                        </div>
                                   </div>
                              </div>

                              <Tabs defaultValue='orders'>
                                   <TabsList className='mb-4'>
                                        <TabsTrigger value='orders'>
                                             Orders
                                        </TabsTrigger>
                                        <TabsTrigger value='addresses'>
                                             Addresses
                                        </TabsTrigger>
                                        <TabsTrigger value='activity'>
                                             Activity
                                        </TabsTrigger>
                                   </TabsList>

                                   <TabsContent
                                        value='orders'
                                        className='space-y-4'>
                                        <div className='border rounded-md divide-y'>
                                             {/* Mock orders */}
                                             {[1, 2, 3].map((i) => (
                                                  <div
                                                       key={i}
                                                       className='p-4 flex items-center justify-between'>
                                                       <div className='flex items-center gap-4'>
                                                            <ShoppingBag className='h-10 w-10 text-muted-foreground p-2 bg-muted rounded-md' />
                                                            <div>
                                                                 <p className='font-medium'>
                                                                      Order #{i}
                                                                 </p>
                                                                 <p className='text-sm text-muted-foreground'>
                                                                      {format(
                                                                           new Date(
                                                                                2025,
                                                                                0,
                                                                                i,
                                                                           ),
                                                                           "MMM dd, yyyy",
                                                                      )}
                                                                 </p>
                                                            </div>
                                                       </div>
                                                       <div>
                                                            <p className='font-medium'>
                                                                 $199.99
                                                            </p>
                                                            <p className='text-sm text-muted-foreground'>
                                                                 3 items
                                                            </p>
                                                       </div>
                                                  </div>
                                             ))}
                                        </div>
                                   </TabsContent>

                                   <TabsContent
                                        value='addresses'
                                        className='space-y-4'>
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                             {/* Mock addresses */}
                                             {[1, 2].map((i) => (
                                                  <Card key={i}>
                                                       <CardContent className='p-4'>
                                                            <div className='flex justify-between items-start mb-2'>
                                                                 <p className='font-medium'>
                                                                      {i === 1
                                                                           ? "Home Address"
                                                                           : "Work Address"}
                                                                 </p>
                                                                 {i === 1 && (
                                                                      <div className='text-xs bg-primary/10 text-primary px-2 py-1 rounded'>
                                                                           Primary
                                                                      </div>
                                                                 )}
                                                            </div>
                                                            <p className='text-sm'>
                                                                 123 Example St,
                                                                 Unit {i}
                                                            </p>
                                                            <p className='text-sm'>
                                                                 City, State
                                                                 12345
                                                            </p>
                                                            <p className='text-sm'>
                                                                 Country
                                                            </p>
                                                       </CardContent>
                                                  </Card>
                                             ))}
                                        </div>
                                   </TabsContent>

                                   <TabsContent
                                        value='activity'
                                        className='space-y-4'>
                                        <div className='space-y-4'>
                                             {/* Mock activity */}
                                             {[
                                                  {
                                                       icon: (
                                                            <ShoppingBag className='h-4 w-4' />
                                                       ),
                                                       text: "Placed an order",
                                                       date: "2 days ago",
                                                  },
                                                  {
                                                       icon: (
                                                            <User className='h-4 w-4' />
                                                       ),
                                                       text: "Updated profile information",
                                                       date: "1 week ago",
                                                  },
                                                  {
                                                       icon: (
                                                            <Mail className='h-4 w-4' />
                                                       ),
                                                       text: "Subscribed to newsletter",
                                                       date: "2 weeks ago",
                                                  },
                                             ].map((activity, i) => (
                                                  <div
                                                       key={i}
                                                       className='flex items-center gap-3'>
                                                       <div className='h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary'>
                                                            {activity.icon}
                                                       </div>
                                                       <div>
                                                            <p className='text-sm font-medium'>
                                                                 {activity.text}
                                                            </p>
                                                            <p className='text-xs text-muted-foreground'>
                                                                 {activity.date}
                                                            </p>
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
                                   <Button>Edit Customer</Button>
                              </DialogFooter>
                         </DialogContent>
                    </Dialog>
               )}
          </div>
     );
}
