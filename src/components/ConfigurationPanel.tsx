import React, { useState } from 'react';
import { ArrowLeft, Bell, Shield, Palette, Globe, Save, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface ConfigurationPanelProps {
  onBack: () => void;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  courseReminders: boolean;
  progressUpdates: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'contacts';
  showProgress: boolean;
  showCertificates: boolean;
}

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'auto';
  language: 'es' | 'en';
  compactMode: boolean;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ onBack }) => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'notifications' | 'privacy' | 'appearance' | 'account'>('notifications');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: false,
    courseReminders: true,
    progressUpdates: true
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'contacts',
    showProgress: true,
    showCertificates: true
  });

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: 'light',
    language: 'es',
    compactMode: false
  });

  const [accountData, setAccountData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'notifications', name: 'Notificaciones', icon: Bell },
    { id: 'privacy', name: 'Privacidad', icon: Shield },
    { id: 'appearance', name: 'Apariencia', icon: Palette },
    { id: 'account', name: 'Cuenta', icon: Globe },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (activeTab === 'account') {
      updateUser({
        name: accountData.name,
        email: accountData.email
      });
    }
    
    setIsSaving(false);
    
    // Mostrar mensaje de éxito (podrías usar un toast aquí)
    alert('Configuración guardada exitosamente');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Volver</span>
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Configuración</h1>
          <p className="text-blue-100">Personaliza tu experiencia en la plataforma</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Notificaciones */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Preferencias de Notificaciones</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Notificaciones por Email</h3>
                      <p className="text-sm text-gray-600">Recibe actualizaciones importantes por correo</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.emailNotifications}
                        onChange={(e) => setNotifications(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Notificaciones Push</h3>
                      <p className="text-sm text-gray-600">Recibe notificaciones en tiempo real</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.pushNotifications}
                        onChange={(e) => setNotifications(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Recordatorios de Cursos</h3>
                      <p className="text-sm text-gray-600">Te recordamos continuar tus cursos</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.courseReminders}
                        onChange={(e) => setNotifications(prev => ({ ...prev, courseReminders: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Actualizaciones de Progreso</h3>
                      <p className="text-sm text-gray-600">Notificaciones sobre tu avance</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.progressUpdates}
                        onChange={(e) => setNotifications(prev => ({ ...prev, progressUpdates: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacidad */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Configuración de Privacidad</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Visibilidad del Perfil</h3>
                    <p className="text-sm text-gray-600 mb-3">Controla quién puede ver tu perfil</p>
                    <div className="space-y-2">
                      {[
                        { value: 'public', label: 'Público - Visible para todos' },
                        { value: 'contacts', label: 'Contactos - Solo compañeros de trabajo' },
                        { value: 'private', label: 'Privado - Solo yo' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="profileVisibility"
                            value={option.value}
                            checked={privacy.profileVisibility === option.value}
                            onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value as any }))}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Mostrar Progreso</h3>
                      <p className="text-sm text-gray-600">Permite que otros vean tu progreso en cursos</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacy.showProgress}
                        onChange={(e) => setPrivacy(prev => ({ ...prev, showProgress: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Mostrar Certificados</h3>
                      <p className="text-sm text-gray-600">Permite que otros vean tus certificados</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacy.showCertificates}
                        onChange={(e) => setPrivacy(prev => ({ ...prev, showCertificates: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Apariencia */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Personalización de Apariencia</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Tema</h3>
                    <p className="text-sm text-gray-600 mb-3">Elige el tema de la aplicación</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'light', label: 'Claro' },
                        { value: 'dark', label: 'Oscuro' },
                        { value: 'auto', label: 'Automático' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-100">
                          <input
                            type="radio"
                            name="theme"
                            value={option.value}
                            checked={appearance.theme === option.value}
                            onChange={(e) => setAppearance(prev => ({ ...prev, theme: e.target.value as any }))}
                            className="sr-only"
                          />
                          <span className={`text-sm font-medium ${appearance.theme === option.value ? 'text-blue-600' : 'text-gray-700'}`}>
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Idioma</h3>
                    <p className="text-sm text-gray-600 mb-3">Selecciona tu idioma preferido</p>
                    <select
                      value={appearance.language}
                      onChange={(e) => setAppearance(prev => ({ ...prev, language: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Modo Compacto</h3>
                      <p className="text-sm text-gray-600">Reduce el espaciado para mostrar más contenido</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={appearance.compactMode}
                        onChange={(e) => setAppearance(prev => ({ ...prev, compactMode: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cuenta */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Información de la Cuenta</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                      <input
                        type="text"
                        value={accountData.name}
                        onChange={(e) => setAccountData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={accountData.email}
                        onChange={(e) => setAccountData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Cambiar Contraseña</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña Actual</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={accountData.currentPassword}
                            onChange={(e) => setAccountData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nueva Contraseña</label>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={accountData.newPassword}
                            onChange={(e) => setAccountData(prev => ({ ...prev, newPassword: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Contraseña</label>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={accountData.confirmPassword}
                            onChange={(e) => setAccountData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botón Guardar */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Guardar Cambios</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;