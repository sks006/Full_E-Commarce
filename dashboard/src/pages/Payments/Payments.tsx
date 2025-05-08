/** @format */

import { useEffect, useState } from "react";
import {
     ChevronDown,
     Download,
     FileText,
     Filter,
     Loader2,
     Plus,
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
import { StatusBadge } from "@/components/common/StatusBadge";
import { DataTable } from "@/components/common/DataTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
     fetchPayments,
     setSelectedPayment,
     updateFilters,
} from "@/slicer/payments/paymentsSlice";
import {
     Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
     DialogFooter,
     DialogClose,
} from "@/components/ui/dialog";
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "@/components/ui/select";
import { Payment } from "@/types/schema";
import { format } from "date-fns";

export function Payments() {
     const dispatch = useAppDispatch();
     const { items, status, selectedPayment, filters } = useAppSelector(
          (state) => state.payments,
     );
     const [paymentDetailsOpen, setPaymentDetailsOpen] = useState(false);

     useEffect(() => {
          if (status === "idle") {
               dispatch(fetchPayments());
          }
     }, [dispatch, status]);

     const handleRowClick = (payment: Payment) => {
          dispatch(setSelectedPayment(payment));
          setPaymentDetailsOpen(true);
     };

     const getPaymentMethodIcon = (method: Payment["paymentMethod"]) => {
          switch (method) {
               case "bKash":
                    return "B";
               case "Nagad":
                    return "N";
               case "COD":
                    return "C";
               case "Card":
                    return "💳";
               default:
                    return "?";
          }
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
                         Payments
                    </h1>
                    <div className='flex items-center gap-2'>
                         <Button variant='outline' className='gap-2'>
                              <Download className='h-4 w-4' />
                              Export
                         </Button>
                         <Button className='gap-2'>
                              <Plus className='h-4 w-4' />
                              Add Payment
                         </Button>
                    </div>
               </div>

               <Card>
                    <CardHeader className='pb-3'>
                         <CardTitle>Payment Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className='flex flex-col md:flex-row gap-4 mb-6'>
                              <div className='flex-1'>
                                   <Input
                                        placeholder='Search payments...'
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
                                                                 status: "Paid",
                                                            }),
                                                       )
                                                  }>
                                                  Paid
                                             </DropdownMenuItem>
                                             <DropdownMenuItem
                                                  onClick={() =>
                                                       dispatch(
                                                            updateFilters({
                                                                 status: "Pending",
                                                            }),
                                                       )
                                                  }>
                                                  Pending
                                             </DropdownMenuItem>
                                             <DropdownMenuItem
                                                  onClick={() =>
                                                       dispatch(
                                                            updateFilters({
                                                                 status: "Failed",
                                                            }),
                                                       )
                                                  }>
                                                  Failed
                                             </DropdownMenuItem>
                                             <DropdownMenuItem
                                                  onClick={() =>
                                                       dispatch(
                                                            updateFilters({
                                                                 paymentMethod:
                                                                      "Card",
                                                            }),
                                                       )
                                                  }>
                                                  Card
                                             </DropdownMenuItem>
                                             <DropdownMenuItem
                                                  onClick={() =>
                                                       dispatch(
                                                            updateFilters({
                                                                 paymentMethod:
                                                                      "bKash",
                                                            }),
                                                       )
                                                  }>
                                                  bKash
                                             </DropdownMenuItem>
                                             <DropdownMenuItem
                                                  onClick={() =>
                                                       dispatch(
                                                            updateFilters({
                                                                 paymentMethod:
                                                                      "Nagad",
                                                            }),
                                                       )
                                                  }>
                                                  Nagad
                                             </DropdownMenuItem>
                                             <DropdownMenuItem
                                                  onClick={() =>
                                                       dispatch(
                                                            updateFilters({
                                                                 paymentMethod:
                                                                      "COD",
                                                            }),
                                                       )
                                                  }>
                                                  Cash on Delivery
                                             </DropdownMenuItem>
                                        </DropdownMenuContent>
                                   </DropdownMenu>
                              </div>
                         </div>

                         <DataTable
                              data={items}
                              columns={[
                                   {
                                        header: "Transaction ID",
                                        accessorKey: "transactionId",
                                        cell: (payment) => (
                                             <div className='font-mono text-xs'>
                                                  {payment.transactionId ||
                                                       "N/A"}
                                             </div>
                                        ),
                                   },
                                   {
                                        header: "Method",
                                        accessorKey: "paymentMethod",
                                        cell: (payment) => (
                                             <div className='flex items-center gap-2'>
                                                  <div className='h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium'>
                                                       {getPaymentMethodIcon(
                                                            payment.paymentMethod,
                                                       )}
                                                  </div>
                                                  <span>
                                                       {payment.paymentMethod}
                                                  </span>
                                             </div>
                                        ),
                                   },
                                   {
                                        header: "Status",
                                        accessorKey: "status",
                                        cell: (payment) => (
                                             <StatusBadge
                                                  status={payment.status}
                                             />
                                        ),
                                   },
                                   {
                                        header: "Order ID",
                                        accessorKey: "orderId",
                                        cell: (payment) =>
                                             `#${payment.orderId}`,
                                   },
                                   {
                                        header: "Date",
                                        accessorKey: "paidAt",
                                        cell: (payment) =>
                                             payment.paidAt
                                                  ? format(
                                                         new Date(
                                                              payment.paidAt,
                                                         ),
                                                         "MMM dd, yyyy",
                                                    )
                                                  : "N/A",
                                   },
                                   {
                                        header: "Actions",
                                        accessorKey: "actions",
                                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                        cell: (payment) => (
                                             <Button
                                                  variant='ghost'
                                                  size='icon'
                                                  onClick={(e) => {
                                                       e.stopPropagation();
                                                       // Receipt view logic
                                                  }}>
                                                  <FileText className='h-4 w-4' />
                                             </Button>
                                        ),
                                   },
                              ]}
                              onRowClick={handleRowClick}
                         />
                    </CardContent>
               </Card>

               {selectedPayment && (
                    <Dialog
                         open={paymentDetailsOpen}
                         onOpenChange={setPaymentDetailsOpen}>
                         <DialogContent className='max-w-3xl'>
                              <DialogHeader>
                                   <DialogTitle>Payment Details</DialogTitle>
                              </DialogHeader>
                              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                                   <div>
                                        <h3 className='text-lg font-medium mb-2'>
                                             Transaction Information
                                        </h3>
                                        <div className='space-y-2'>
                                             <div className='flex justify-between'>
                                                  <span className='text-muted-foreground'>
                                                       Transaction ID:
                                                  </span>
                                                  <span className='font-mono text-xs'>
                                                       {selectedPayment.transactionId ||
                                                            "N/A"}
                                                  </span>
                                             </div>
                                             <div className='flex justify-between'>
                                                  <span className='text-muted-foreground'>
                                                       Payment Method:
                                                  </span>
                                                  <span>
                                                       {
                                                            selectedPayment.paymentMethod
                                                       }
                                                  </span>
                                             </div>
                                             <div className='flex justify-between'>
                                                  <span className='text-muted-foreground'>
                                                       Status:
                                                  </span>
                                                  <StatusBadge
                                                       status={
                                                            selectedPayment.status
                                                       }
                                                  />
                                             </div>
                                             <div className='flex justify-between'>
                                                  <span className='text-muted-foreground'>
                                                       Date:
                                                  </span>
                                                  <span>
                                                       {selectedPayment.paidAt
                                                            ? format(
                                                                   new Date(
                                                                        selectedPayment.paidAt,
                                                                   ),
                                                                   "MMM dd, yyyy HH:mm:ss",
                                                              )
                                                            : "N/A"}
                                                  </span>
                                             </div>
                                        </div>
                                   </div>
                                   <div>
                                        <h3 className='text-lg font-medium mb-2'>
                                             Related Information
                                        </h3>
                                        <div className='space-y-2'>
                                             <div className='flex justify-between'>
                                                  <span className='text-muted-foreground'>
                                                       Order:
                                                  </span>
                                                  <span>
                                                       #
                                                       {selectedPayment.orderId}
                                                  </span>
                                             </div>
                                             <div className='flex justify-between'>
                                                  <span className='text-muted-foreground'>
                                                       Customer:
                                                  </span>
                                                  <span>
                                                       #{selectedPayment.userId}
                                                  </span>
                                             </div>
                                             <div className='flex justify-between'>
                                                  <span className='text-muted-foreground'>
                                                       Amount:
                                                  </span>
                                                  <span className='font-medium'>
                                                       $120.00
                                                  </span>{" "}
                                                  {/* Mock amount */}
                                             </div>
                                             <div className='flex justify-between'>
                                                  <span className='text-muted-foreground'>
                                                       Currency:
                                                  </span>
                                                  <span>USD</span>
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              <div className='space-y-4'>
                                   <div className='flex flex-col gap-4'>
                                        <h3 className='text-lg font-medium'>
                                             Payment Status
                                        </h3>
                                        <Select
                                             defaultValue={
                                                  selectedPayment.status
                                             }
                                             disabled={
                                                  selectedPayment.status ===
                                                  "Paid"
                                             }>
                                             <SelectTrigger>
                                                  <SelectValue placeholder='Select status' />
                                             </SelectTrigger>
                                             <SelectContent>
                                                  <SelectItem value='Pending'>
                                                       Pending
                                                  </SelectItem>
                                                  <SelectItem value='Paid'>
                                                       Paid
                                                  </SelectItem>
                                                  <SelectItem value='Failed'>
                                                       Failed
                                                  </SelectItem>
                                             </SelectContent>
                                        </Select>

                                        {selectedPayment.status ===
                                             "Failed" && (
                                             <div className='p-4 bg-destructive/10 text-destructive rounded-md text-sm'>
                                                  <p className='font-medium'>
                                                       Payment failed
                                                  </p>
                                                  <p>
                                                       Reason: Insufficient
                                                       funds
                                                  </p>
                                             </div>
                                        )}
                                   </div>
                              </div>

                              <DialogFooter>
                                   <DialogClose asChild>
                                        <Button
                                             variant='outline'
                                             className='mr-2'>
                                             Close
                                        </Button>
                                   </DialogClose>
                                   <Button>View Receipt</Button>
                              </DialogFooter>
                         </DialogContent>
                    </Dialog>
               )}
          </div>
     );
}
