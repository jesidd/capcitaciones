import React from 'react';
import { ArrowLeft, User, Mail, Calendar, Award, BookOpen } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface UserProfileProps {
  onBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onBack }) => {
  const { user } = useAuth();
  
  const userStats = {
    coursesCompleted: 3,
    coursesInProgress: 2,
    totalHours: 12.5,
    certificates: 3
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Volver al inicio</span>
      </button>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-3 rounded-full">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">{user?.name || 'Usuario'}</h1>
              <p className="text-blue-100">{user?.role === 'admin' ? 'Administrador' : user?.role === 'instructor' ? 'Instructor' : 'Estudiante'}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Información Personal</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{user?.email || 'usuario@empresa.com'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Miembro desde Enero 2024</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">{userStats.coursesCompleted}</p>
                  <p className="text-xs text-green-700">Completados</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{userStats.coursesInProgress}</p>
                  <p className="text-xs text-blue-700">En Progreso</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Certificados Obtenidos</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">Atención al Cliente</h3>
                    <p className="text-sm text-gray-600">Completado el 15 de Enero, 2025</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Descargar
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">Seguridad en el Trabajo</h3>
                    <p className="text-sm text-gray-600">En progreso - 75% completado</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">Pendiente</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;