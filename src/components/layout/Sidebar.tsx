import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Package, Users, Settings, X } from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Stores', href: '/stores', icon: ShoppingBag },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Sidebar Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 flex flex-col z-50 w-64 bg-indigo-700 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-full ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-indigo-800">
          <div className="flex items-center">
            <span className="text-xl font-bold text-white">Mall Manager</span>
          </div>
          <button
            className="md:hidden p-1 text-white hover:text-gray-200 focus:outline-none"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-indigo-800 text-white'
                      : 'text-indigo-100 hover:bg-indigo-600'
                  }`}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 ${
                      isActive(item.href)
                        ? 'text-white'
                        : 'text-indigo-300 group-hover:text-white'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-indigo-800 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                A
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs font-medium text-indigo-200">Mall Admin</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;