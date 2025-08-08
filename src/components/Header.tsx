import React from 'react';
import { BookOpen, User, LogOut, Settings, UserCircle, Shield, Cog } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  onUserMenuClick?: () => void;
  onAdminClick?: () => void;
  onConfigClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onUserMenuClick, onAdminClick, onConfigClick }) => {
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    setShowUserMenu(false);
    logout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CapacitaPro</h1>
              <p className="text-sm text-gray-500 hidden sm:block">Plataforma de Capacitaciones</p>
            </div>
          </div>
          
          <div className="relative flex items-center space-x-3">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
            >
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.name || 'Usuario'}</span>
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onUserMenuClick?.();
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <UserCircle className="h-4 w-4" />
                  <span>Mi Perfil</span>
                </button>
                {user?.role === 'admin' && (
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onAdminClick?.();
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Panel de Admin</span>
                  </button>
                )}
                <button 
                  onClick={() => {
                    setShowUserMenu(false);
                    onConfigClick?.();
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Cog className="h-4 w-4" />
                  <span>Configuración</span>
                </button>
                <hr className="my-2 border-gray-200" />
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;