/** @format */

import { useEffect } from "react";
import {
     BarChart3,
     CreditCard,
     Loader2,
     Package,
     ShoppingCart,
     Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/common/StatCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/slicer/products/productsSlice";
import { fetchOrders } from "@/slicer/orders/ordersSlice";
import { fetchCustomers } from "@/slicer/customers/customersSlice";
import { fetchPayments } from "@/slicer/payments/paymentsSlice";
import {
     ResponsiveContainer,
     BarChart,
     Bar,
     XAxis,
     YAxis,
     CartesianGrid,
     Tooltip,
     Legend,
     LineChart,
     Line,
} from "recharts";

// Mock data
const salesData = [
     { name: "Jan", sales: 4000, orders: 240 },
     { name: "Feb", sales: 3000, orders: 198 },
     { name: "Mar", sales: 5000, orders: 300 },
     { name: "Apr", sales: 7000, orders: 400 },
     { name: "May", sales: 6000, orders: 380 },
     { name: "Jun", sales: 9000, orders: 520 },
];

const categoryData = [
     { name: "Electronics", sales: 12000 },
     { name: "Clothing", sales: 8000 },
     { name: "Home", sales: 5000 },
     { name: "Beauty", sales: 4000 },
     { name: "Sports", sales: 3000 },
];

export function Dashboard() {
     const dispatch = useAppDispatch();
     const products = useAppSelector((state) => state.products);
     const orders = useAppSelector((state) => state.orders);
     const customers = useAppSelector((state) => state.customers);
     const payments = useAppSelector((state) => state.payments);

     const isLoading =
          products.status === "loading" ||
          orders.status === "loading" ||
          customers.status === "loading" ||
          payments.status === "loading";

     useEffect(() => {
          if (products.status === "idle") dispatch(fetchProducts());
          if (orders.status === "idle") dispatch(fetchOrders());
          if (customers.status === "idle") dispatch(fetchCustomers());
          if (payments.status === "idle") dispatch(fetchPayments());
     }, [
          dispatch,
          products.status,
          orders.status,
          customers.status,
          payments.status,
     ]);

     if (isLoading) {
          return (
               <div className='flex items-center justify-center h-[calc(100vh-8rem)]'>
                    <Loader2 className='h-8 w-8 animate-spin text-primary' />
               </div>
          );
     }

     const revenue = payments.items
          .filter((payment) => payment.status === "Paid")
          .reduce((total) => total + 120, 0); // Mock value

     return (
          <div className='space-y-6'>
               <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-bold tracking-tight'>
                         Dashboard
                    </h1>
               </div>

               <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                    <StatCard
                         title='Total Revenue'
                         value={`$${revenue.toLocaleString()}`}
                         icon={<CreditCard className='h-5 w-5' />}
                         description='Revenue this month'
                         trend={{ value: 12.5, isPositive: true }}
                    />
                    <StatCard
                         title='Orders'
                         value={orders.items?.length ?? 0}
                         icon={<ShoppingCart className='h-5 w-5' />}
                         description='Total orders'
                         trend={{ value: 8.2, isPositive: true }}
                    />
                    <StatCard
                         title='Products'
                         value={products.items?.length ?? 0}
                         icon={<Package className='h-5 w-5' />}
                         description='Active products'
                         trend={{ value: 2.1, isPositive: false }}
                    />
                    <StatCard
                         title='Customers'
                         value={customers.items?.length ?? 0}
                         icon={<Users className='h-5 w-5' />}
                         description='Active customers'
                         trend={{ value: 5.7, isPositive: true }}
                    />
               </div>

               <div className='grid gap-4 md:grid-cols-2'>
                    <Card className='p-4'>
                         <div className='flex items-center justify-between mb-4'>
                              <h3 className='text-lg font-medium'>
                                   Sales Overview
                              </h3>
                              <BarChart3 className='h-5 w-5 text-muted-foreground' />
                         </div>
                         <div className='h-[300px]'>
                              <ResponsiveContainer width='100%' height='100%'>
                                   <LineChart data={salesData}>
                                        <CartesianGrid strokeDasharray='3 3' />
                                        <XAxis dataKey='name' />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                             type='monotone'
                                             dataKey='sales'
                                             name='Sales ($)'
                                             stroke='hsl(var(--chart-1))'
                                             activeDot={{ r: 8 }}
                                        />
                                        <Line
                                             type='monotone'
                                             dataKey='orders'
                                             name='Orders'
                                             stroke='hsl(var(--chart-2))'
                                        />
                                   </LineChart>
                              </ResponsiveContainer>
                         </div>
                    </Card>

                    <Card className='p-4'>
                         <div className='flex items-center justify-between mb-4'>
                              <h3 className='text-lg font-medium'>
                                   Sales by Category
                              </h3>
                              <BarChart3 className='h-5 w-5 text-muted-foreground' />
                         </div>
                         <div className='h-[300px]'>
                              <ResponsiveContainer width='100%' height='100%'>
                                   <BarChart data={categoryData}>
                                        <CartesianGrid strokeDasharray='3 3' />
                                        <XAxis dataKey='name' />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                             dataKey='sales'
                                             name='Sales ($)'
                                             fill='hsl(var(--chart-1))'
                                        />
                                   </BarChart>
                              </ResponsiveContainer>
                         </div>
                    </Card>
               </div>

               <div className='grid gap-4 md:grid-cols-1 lg:grid-cols-1'>
                    <Card className='p-4'>
                         <div className='flex items-center justify-between mb-4'>
                              <h3 className='text-lg font-medium'>
                                   Recent Activity
                              </h3>
                         </div>
                         <div className='space-y-4'>
                              {orders.items.slice(0, 5).map((order) => (
                                   <div
                                        key={order.id}
                                        className='flex items-center justify-between p-2 rounded-lg bg-accent/50'>
                                        <div className='flex items-center gap-2'>
                                             <div className='h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary'>
                                                  <ShoppingCart className='h-5 w-5' />
                                             </div>
                                             <div>
                                                  <p className='text-sm font-medium'>
                                                       New Order #{order.id}
                                                  </p>
                                                  <p className='text-xs text-muted-foreground'>
                                                       {new Date(
                                                            order.createdAt,
                                                       ).toLocaleDateString()}
                                                  </p>
                                             </div>
                                        </div>
                                        <div className='text-sm font-medium'>
                                             {order.status}
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </Card>
               </div>
          </div>
     );
}
