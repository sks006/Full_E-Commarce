import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Toaster } from '@/components/ui/toaster';

export function DashboardLayout() {
  return (
    <div className="flex  min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 ">
        <Header />
        <main className="flex p-6 w-fit">
          <Outlet />
        </main>
        <Toaster />
      </div>
    </div>
  );
}