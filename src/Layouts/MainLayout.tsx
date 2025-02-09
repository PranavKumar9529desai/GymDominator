import { Outlet } from 'react-router-dom';
import { Navbar2 } from '@components/Navbar/Navbar2';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="sticky top-0 left-0 z-50">
        <Navbar2 TextColor="black" />
      </div>
      <div className="flex-1 flex items-center justify-center py-14">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
