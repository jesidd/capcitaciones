import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Usuarios de demo para la autenticación local
const DEMO_USERS = [
  {
    id: '1',
    email: 'admin@empresa.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin'
  },
  {
    id: '2',
    email: 'usuario@empresa.com',
    password: 'usuario123',
    name: 'Usuario Demo',
    role: 'user'
  },
  {
    id: '3',
    email: 'instructor@empresa.com',
    password: 'instructor123',
    name: 'Instructor Demo',
    role: 'instructor'
  }
];

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  // Verificar si hay una sesión guardada al cargar
  useEffect(() => {
    const checkStoredAuth = () => {
      try {
        const storedUser = localStorage.getItem('capacitapro_user');
        const storedToken = localStorage.getItem('capacitapro_token');
        
        if (storedUser && storedToken) {
          const user = JSON.parse(storedUser);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Error checking stored auth:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkStoredAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // Buscar usuario en la base de datos demo
      const user = DEMO_USERS.find(u => u.email === email && u.password === password);
      
      if (user) {
        const userData = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };

        // Generar token simple (en producción usar JWT)
        const token = btoa(`${user.id}:${Date.now()}`);

        // Guardar en localStorage
        localStorage.setItem('capacitapro_user', JSON.stringify(userData));
        localStorage.setItem('capacitapro_token', token);

        setAuthState({
          user: userData,
          isAuthenticated: true,
          isLoading: false
        });

        return true;
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('capacitapro_user');
    localStorage.removeItem('capacitapro_token');
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const updateUser = (userData: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      localStorage.setItem('capacitapro_user', JSON.stringify(updatedUser));
      setAuthState(prev => ({
        ...prev,
        user: updatedUser
      }));
    }
  };

  return {
    ...authState,
    login,
    logout,
    updateUser
  };
};