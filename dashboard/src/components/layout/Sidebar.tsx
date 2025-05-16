/** @format */

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
     LayoutDashboard,
     Package,
     ShoppingCart,
     Users,
     CreditCard,
     Settings,
     BarChart,
     Tag,
     Ticket,
     ChevronLeft,
     ChevronRight,
     LogOut,
     Store,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "../../slicer/auth/authSlice";

interface SidebarNavProps {
     isCollapsed: boolean;
}

const SidebarNav = ({ isCollapsed }: SidebarNavProps) => {
     const dispatch = useAppDispatch();

     const handleLogout = () => {
          dispatch(logout());
     };

     return (
          <ScrollArea className='h-full'>
               <div
                    className={cn(
                         "flex flex-col gap-2 p-4",
                         isCollapsed && "items-center",
                    )}>
                    <NavLink
                         to='/dashboard'
                         className={({ isActive }) =>
                              cn(
                                   "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-primary",
                                   isActive
                                        ? "bg-accent text-primary"
                                        : "hover:bg-accent/50",
                                   isCollapsed && "justify-center px-2",
                              )
                         }>
                         <LayoutDashboard className='h-5 w-5' />
                         {!isCollapsed && <span>Dashboard</span>}
                    </NavLink>

                    <NavLink
                         to='/Products'
                         className={({ isActive }) =>
                              cn(
                                   "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-primary",
                                   isActive
                                        ? "bg-accent text-primary"
                                        : "hover:bg-accent/50",
                                   isCollapsed && "justify-center px-2",
                              )
                         }>
                         <Package className='h-5 w-5' />
                         {!isCollapsed && <span>Products</span>}
                    </NavLink>

                    <NavLink
                         to='/orders'
                         className={({ isActive }) =>
                              cn(
                                   "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-primary",
                                   isActive
                                        ? "bg-accent text-primary"
                                        : "hover:bg-accent/50",
                                   isCollapsed && "justify-center px-2",
                              )
                         }>
                         <ShoppingCart className='h-5 w-5' />
                         {!isCollapsed && <span>Orders</span>}
                    </NavLink>

                    <NavLink
                         to='/customers'
                         className={({ isActive }) =>
                              cn(
                                   "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-primary",
                                   isActive
                                        ? "bg-accent text-primary"
                                        : "hover:bg-accent/50",
                                   isCollapsed && "justify-center px-2",
                              )
                         }>
                         <Users className='h-5 w-5' />
                         {!isCollapsed && <span>Customers</span>}
                    </NavLink>

                    <NavLink
                         to='/payments'
                         className={({ isActive }) =>
                              cn(
                                   "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-primary",
                                   isActive
                                        ? "bg-accent text-primary"
                                        : "hover:bg-accent/50",
                                   isCollapsed && "justify-center px-2",
                              )
                         }>
                         <CreditCard className='h-5 w-5' />
                         {!isCollapsed && <span>Payments</span>}
                    </NavLink>

                    <Separator className='my-2' />

                    <NavLink
                         to='/Categories'
                         className={({ isActive }) =>
                              cn(
                                   "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-primary",
                                   isActive
                                        ? "bg-accent text-primary"
                                        : "hover:bg-accent/50",
                                   isCollapsed && "justify-center px-2",
                              )
                         }>
                         <Tag className='h-5 w-5' />
                         {!isCollapsed && <span>Categories</span>}
                    </NavLink>

                    <NavLink
                         to='/Seller'
                         className={({ isActive }) =>
                              cn(
                                   "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-primary",
                                   isActive
                                        ? "bg-accent text-primary"
                                        : "hover:bg-accent/50",
                                   isCollapsed && "justify-center px-2",
                              )
                         }>
                         <Store className='h-5 w-5' />
                         {!isCollapsed && <span>Sellers</span>}
                    </NavLink>

                    <NavLink
                         to='/Supports'
                         className={({ isActive }) =>
                              cn(
                                   "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-primary",
                                   isActive
                                        ? "bg-accent text-primary"
                                        : "hover:bg-accent/50",
                                   isCollapsed && "justify-center px-2",
                              )
                         }>
                         <Ticket className='h-5 w-5' />
                         {!isCollapsed && <span>Support</span>}
                    </NavLink>

                    <NavLink
                         to='/Analytics'
                         className={({ isActive }) =>
                              cn(
                                   "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-primary",
                                   isActive
                                        ? "bg-accent text-primary"
                                        : "hover:bg-accent/50",
                                   isCollapsed && "justify-center px-2",
                              )
                         }>
                         <BarChart className='h-5 w-5' />
                         {!isCollapsed && <span>Analytics</span>}
                    </NavLink>

                    <NavLink
                         to='/Settings'
                         className={({ isActive }) =>
                              cn(
                                   "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-primary",
                                   isActive
                                        ? "bg-accent text-primary"
                                        : "hover:bg-accent/50",
                                   isCollapsed && "justify-center px-2",
                              )
                         }>
                         <Settings className='h-5 w-5' />
                         {!isCollapsed && <span>Settings</span>}
                    </NavLink>

                    <div className='mt-auto'>
                         <Button
                              variant='ghost'
                              className={cn(
                                   "w-full justify-start gap-2 text-gray-500 hover:text-destructive",
                                   isCollapsed && "justify-center px-2",
                              )}
                              onClick={handleLogout}>
                              <LogOut className='h-5 w-5' />
                              {!isCollapsed && <span>Logout</span>}
                         </Button>
                    </div>
               </div>
          </ScrollArea>
     );
};

export function Sidebar() {
     const [isCollapsed, setIsCollapsed] = useState(false);

     return (
          <aside
               className={cn(
                    "flex flex-col border-r bg-background transition-all duration-300 h-screen sticky top-0 ",
                    isCollapsed ? "w-16" : "w-64",
               )}>
               <div
                    className={cn(
                         "flex h-14 items-center border-b px-4",
                         isCollapsed ? "justify-center" : "justify-between",
                    )}>
                    {!isCollapsed && (
                         <div className='font-semibold text-lg'>
                              Admin Dashboard
                         </div>
                    )}
                    <Button
                         variant='ghost'
                         size='icon'
                         onClick={() => setIsCollapsed(!isCollapsed)}
                         className='rounded-full'>
                         {isCollapsed ? (
                              <ChevronRight className='h-4 w-4' />
                         ) : (
                              <ChevronLeft className='h-4 w-4' />
                         )}
                    </Button>
               </div>
               <SidebarNav isCollapsed={isCollapsed} />
          </aside>
     );
}
