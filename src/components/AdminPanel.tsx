import React, { useState } from 'react';
import { ArrowLeft, Users, BookOpen, Tag, Shield, Plus, Edit, Trash2, Save, X, Image } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface AdminPanelProps {
  onBack: () => void;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  assignedCategories?: string[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  image: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  allowedCategories: string[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  categoryId: string;
  videoUrl: string;
  instructor: string;
  image: string;
}

type TabType = 'users' | 'categories' | 'courses' | 'roles';

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('users');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Estados para datos
  const [users, setUsers] = useState<User[]>([
    { id: '1', email: 'admin@empresa.com', name: 'Administrador', role: 'admin', createdAt: '2024-01-15', assignedCategories: [] },
    { id: '2', email: 'usuario@empresa.com', name: 'Usuario Demo', role: 'user', createdAt: '2024-01-20', assignedCategories: ['1', '2'] },
    { id: '3', email: 'instructor@empresa.com', name: 'Instructor Demo', role: 'instructor', createdAt: '2024-01-18', assignedCategories: ['1', '2', '3'] },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Seguridad', description: 'Cursos relacionados con seguridad laboral', color: 'red', image: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg' },
    { id: '2', name: 'Liderazgo', description: 'Desarrollo de habilidades de liderazgo', color: 'blue', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg' },
    { id: '3', name: 'Servicio', description: 'Atención y servicio al cliente', color: 'green', image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg' },
    { id: '4', name: 'Productividad', description: 'Mejora de la productividad personal', color: 'purple', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg' },
    { id: '5', name: 'Colaboración', description: 'Trabajo en equipo y colaboración', color: 'yellow', image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg' },
    { id: '6', name: 'Innovación', description: 'Creatividad e innovación empresarial', color: 'pink', image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg' },
  ]);

  const [roles, setRoles] = useState<Role[]>([
    { 
      id: '1', 
      name: 'admin', 
      description: 'Administrador del sistema', 
      permissions: ['create', 'read', 'update', 'delete', 'manage_users'], 
      allowedCategories: [] // Admin ve todas
    },
    { 
      id: '2', 
      name: 'instructor', 
      description: 'Instructor de cursos', 
      permissions: ['create', 'read', 'update'], 
      allowedCategories: ['1', '2', '3'] 
    },
    { 
      id: '3', 
      name: 'user', 
      description: 'Usuario estándar', 
      permissions: ['read'], 
      allowedCategories: ['1', '2'] 
    },
  ]);

  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Seguridad en el Trabajo',
      description: 'Curso completo sobre seguridad laboral',
      duration: '2 horas',
      categoryId: '1',
      videoUrl: 'https://example.com/video1',
      instructor: 'Ana García',
      image: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg'
    },
    {
      id: '2',
      title: 'Liderazgo Efectivo',
      description: 'Desarrolla habilidades de liderazgo para motivar equipos',
      duration: '3 horas',
      categoryId: '2',
      videoUrl: 'https://example.com/video2',
      instructor: 'Carlos López',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
    },
    {
      id: '3',
      title: 'Atención al Cliente',
      description: 'Mejora tus habilidades de servicio al cliente',
      duration: '1.5 horas',
      categoryId: '3',
      videoUrl: 'https://example.com/video3',
      instructor: 'María Rodríguez',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg'
    }
  ]);

  // Verificar si el usuario es admin
  if (user?.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Volver</span>
        </button>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Acceso Denegado</h2>
          <p className="text-gray-600">No tienes permisos para acceder al panel de administración.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'users', name: 'Usuarios', icon: Users },
    { id: 'categories', name: 'Categorías', icon: Tag },
    { id: 'courses', name: 'Cursos', icon: BookOpen },
    { id: 'roles', name: 'Roles', icon: Shield },
  ];

  const handleCreate = (type: TabType) => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = (type: TabType, id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
      switch (type) {
        case 'users':
          setUsers(prev => prev.filter(u => u.id !== id));
          break;
        case 'categories':
          setCategories(prev => prev.filter(c => c.id !== id));
          break;
        case 'courses':
          setCourses(prev => prev.filter(c => c.id !== id));
          break;
        case 'roles':
          setRoles(prev => prev.filter(r => r.id !== id));
          break;
      }
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Sin categoría';
  };

  const getRoleName = (roleId: string) => {
    return roles.find(r => r.id === roleId)?.name || 'Sin rol';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Volver al inicio</span>
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
          <p className="text-blue-100">Gestiona usuarios, categorías, cursos y roles del sistema</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
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
          {/* Header con botón crear */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {tabs.find(t => t.id === activeTab)?.name}
            </h2>
            <button
              onClick={() => handleCreate(activeTab)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Crear {tabs.find(t => t.id === activeTab)?.name.slice(0, -1)}</span>
            </button>
          </div>

          {/* Contenido de cada tab */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">Rol: {getRoleName(user.role)} | Creado: {user.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete('users', user.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div key={category.id} className="bg-gray-50 rounded-lg overflow-hidden">
                  <div className="relative">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex items-center space-x-1">
                      <button
                        onClick={() => handleEdit(category)}
                        className="p-1 bg-white bg-opacity-90 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                      >
                        <Edit className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleDelete('categories', category.id)}
                        className="p-1 bg-white bg-opacity-90 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`w-3 h-3 rounded-full bg-${category.color}-500`}></div>
                      <h3 className="font-medium text-gray-900">{category.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-6">
              {categories.map((category) => {
                const categoryCourses = courses.filter(course => course.categoryId === category.id);
                return (
                  <div key={category.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-600">{categoryCourses.length} curso(s)</p>
                      </div>
                    </div>
                    
                    {categoryCourses.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No hay cursos en esta categoría</p>
                        <button
                          onClick={() => handleCreate('courses')}
                          className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Agregar primer curso
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categoryCourses.map((course) => (
                          <div key={course.id} className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex items-start space-x-3">
                              <img 
                                src={course.image} 
                                alt={course.title} 
                                className="w-16 h-16 object-cover rounded-lg flex-shrink-0" 
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 truncate">{course.title}</h4>
                                <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <div className="text-xs text-gray-500">
                                    <span>{course.duration}</span> • <span>{course.instructor}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <button
                                      onClick={() => handleEdit(course)}
                                      className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                                    >
                                      <Edit className="h-3 w-3" />
                                    </button>
                                    <button
                                      onClick={() => handleDelete('courses', course.id)}
                                      className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="space-y-4">
              {roles.map((role) => (
                <div key={role.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-gray-600" />
                      <h3 className="font-medium text-gray-900 capitalize">{role.name}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(role)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete('roles', role.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-xs text-gray-500">Permisos:</span>
                    {role.permissions.map((permission) => (
                      <span key={permission} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {permission}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-gray-500">Categorías permitidas:</span>
                    {role.allowedCategories.length === 0 ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Todas</span>
                    ) : (
                      role.allowedCategories.map((categoryId) => (
                        <span key={categoryId} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                          {getCategoryName(categoryId)}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal para crear/editar */}
      {showModal && (
        <CreateEditModal
          type={activeTab}
          item={editingItem}
          categories={categories}
          roles={roles}
          onSave={(data) => {
            // Lógica para guardar según el tipo
            const id = editingItem?.id || Date.now().toString();
            const newItem = { ...data, id };

            switch (activeTab) {
              case 'users':
                if (editingItem) {
                  setUsers(prev => prev.map(u => u.id === editingItem.id ? newItem : u));
                } else {
                  setUsers(prev => [...prev, { ...newItem, createdAt: new Date().toISOString().split('T')[0] }]);
                }
                break;
              case 'categories':
                if (editingItem) {
                  setCategories(prev => prev.map(c => c.id === editingItem.id ? newItem : c));
                } else {
                  setCategories(prev => [...prev, newItem]);
                }
                break;
              case 'courses':
                if (editingItem) {
                  setCourses(prev => prev.map(c => c.id === editingItem.id ? newItem : c));
                } else {
                  setCourses(prev => [...prev, newItem]);
                }
                break;
              case 'roles':
                if (editingItem) {
                  setRoles(prev => prev.map(r => r.id === editingItem.id ? newItem : r));
                } else {
                  setRoles(prev => [...prev, newItem]);
                }
                break;
            }
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

// Modal para crear/editar elementos
interface CreateEditModalProps {
  type: TabType;
  item: any;
  categories: Category[];
  roles: Role[];
  onSave: (data: any) => void;
  onCancel: () => void;
}

const CreateEditModal: React.FC<CreateEditModalProps> = ({ type, item, categories, roles, onSave, onCancel }) => {
  const [formData, setFormData] = useState(() => {
    switch (type) {
      case 'users':
        return {
          name: item?.name || '',
          email: item?.email || '',
          role: item?.role || 'user',
          assignedCategories: item?.assignedCategories || []
        };
      case 'categories':
        return {
          name: item?.name || '',
          description: item?.description || '',
          color: item?.color || 'blue',
          image: item?.image || 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
        };
      case 'courses':
        return {
          title: item?.title || '',
          description: item?.description || '',
          duration: item?.duration || '',
          categoryId: item?.categoryId || '',
          videoUrl: item?.videoUrl || '',
          instructor: item?.instructor || '',
          image: item?.image || 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
        };
      case 'roles':
        return {
          name: item?.name || '',
          description: item?.description || '',
          permissions: item?.permissions || ['read'],
          allowedCategories: item?.allowedCategories || []
        };
      default:
        return {};
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] || []), value]
        : (prev[field] || []).filter((item: string) => item !== value)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {item ? 'Editar' : 'Crear'} {type === 'users' ? 'Usuario' : type === 'categories' ? 'Categoría' : type === 'courses' ? 'Curso' : 'Rol'}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {type === 'users' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.name}>{role.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categorías Asignadas</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.assignedCategories?.includes(category.id)}
                        onChange={(e) => handleCheckboxChange('assignedCategories', category.id, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {type === 'categories' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Imagen de Categoría</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://images.pexels.com/photos/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {formData.image && (
                  <div className="mt-2">
                    <img 
                      src={formData.image} 
                      alt="Vista previa" 
                      className="w-32 h-20 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg';
                      }}
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <select
                  value={formData.color}
                  onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="red">Rojo</option>
                  <option value="blue">Azul</option>
                  <option value="green">Verde</option>
                  <option value="purple">Morado</option>
                  <option value="yellow">Amarillo</option>
                  <option value="pink">Rosa</option>
                </select>
              </div>
            </>
          )}

          {type === 'courses' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duración</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="ej: 2 horas"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL del Video</label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="https://example.com/video.mp4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL de Imagen</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </>
          )}

          {type === 'roles' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Rol</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permisos</label>
                <div className="space-y-2">
                  {['create', 'read', 'update', 'delete', 'manage_users'].map(permission => (
                    <label key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.permissions?.includes(permission)}
                        onChange={(e) => handleCheckboxChange('permissions', permission, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 capitalize">{permission.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categorías Permitidas</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.allowedCategories?.length === 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({ ...prev, allowedCategories: [] }));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 font-medium">Todas las categorías</span>
                  </label>
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.allowedCategories?.includes(category.id)}
                        onChange={(e) => {
                          if (e.target.checked && formData.allowedCategories?.length === 0) {
                            setFormData(prev => ({ ...prev, allowedCategories: [category.id] }));
                          } else {
                            handleCheckboxChange('allowedCategories', category.id, e.target.checked);
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{item ? 'Actualizar' : 'Crear'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;