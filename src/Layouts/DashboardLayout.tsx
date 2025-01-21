import { Outlet } from 'react-router-dom';
import { Sidebar2 } from "@components/SideBar/Sidebar2";
import { BottomNavigation } from "@components/Dashboard/PremiumUsersBNC";
import { Navbar3 } from "@components/Navbar/Navbar3";

export default function DashboardLayout() {
  return (
    <div className="h-screen w-full">
      {/* Mobile Navbar */}
      <div className="lg:hidden">
        <Navbar3 />
      </div>

      <div className="flex h-full">
        {/* Sidebar - fixed width */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <Sidebar2 />
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
          <BottomNavigation />
        </div>

        {/* Main Content - takes remaining width */}
        <div className="flex-1 overflow-y-auto py-20 lg:py-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
