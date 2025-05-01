import { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Download, 
  FileBox, 
  Filter, 
  Loader2, 
  Plus 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StatusBadge } from '@/components/common/StatusBadge';
import { DataTable } from '@/components/common/DataTable';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  fetchOrders, 
  setSelectedOrder, 
  updateFilters,
  updateOrderStatus 
} from '@/Slicer/orders/ordersSlice';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Order } from '@/types/schema';
import { format } from 'date-fns';

export function Orders() {
  const dispatch = useAppDispatch();
  const { items, status, selectedOrder, filters } = useAppSelector((state) => state.orders);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrders());
    }
  }, [dispatch, status]);

  const handleRowClick = (order: Order) => {
    dispatch(setSelectedOrder(order));
    setOrderDetailsOpen(true);
  };

  const handleStatusChange = (newStatus: Order['status']) => {
    if (selectedOrder) {
      dispatch(updateOrderStatus({ id: selectedOrder.id, status: newStatus }));
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Order
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search orders..."
                value={filters.search}
                onChange={(e) => dispatch(updateFilters({ search: e.target.value }))}
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem onClick={() => dispatch(updateFilters({ status: 'Pending' }))}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => dispatch(updateFilters({ status: 'Shipped' }))}>
                    Shipped
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => dispatch(updateFilters({ status: 'Delivered' }))}>
                    Delivered
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => dispatch(updateFilters({ status: 'Cancelled' }))}>
                    Cancelled
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <DataTable
            data={items}
            columns={[
              {
                header: 'Order ID',
                accessorKey: 'id',
                cell: (order) => <span className="font-medium">#{order.id}</span>
              },
              {
                header: 'Date',
                accessorKey: 'createdAt',
                cell: (order) => format(new Date(order.createdAt), 'MMM dd, yyyy')
              },
              {
                header: 'Status',
                accessorKey: 'status',
                cell: (order) => <StatusBadge status={order.status} />
              },
              {
                header: 'Customer',
                accessorKey: 'userId',
                cell: (order) => `Customer #${order.userId}`
              },
              {
                header: 'Payment ID',
                accessorKey: 'paymentId',
                cell: (order) => order.paymentId || 'N/A'
              },
              {
                header: 'Actions',
                accessorKey: 'actions',
                cell: (order) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <FileBox className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(order);
                      }}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                      <DropdownMenuItem>Track Shipment</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              },
            ]}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>

      {selectedOrder && (
        <Dialog open={orderDetailsOpen} onOpenChange={setOrderDetailsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Order #{selectedOrder.id}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Order Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Date:</span>
                    <span>{format(new Date(selectedOrder.createdAt), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Customer ID:</span>
                    <span>{selectedOrder.userId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment ID:</span>
                    <span>{selectedOrder.paymentId || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping ID:</span>
                    <span>{selectedOrder.shippingId || 'N/A'}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Status</h3>
                <Select
                  defaultValue={selectedOrder.status}
                  onValueChange={(value) => handleStatusChange(value as Order['status'])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Items</h3>
              <div className="border rounded-md divide-y">
                {/* Mock order items */}
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-3 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                        <FileBox className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Product {item}</p>
                        <p className="text-sm text-muted-foreground">Qty: 1</p>
                      </div>
                    </div>
                    <div className="font-medium">$99.99</div>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="mr-2">
                  Close
                </Button>
              </DialogClose>
              <Button>Print Invoice</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}