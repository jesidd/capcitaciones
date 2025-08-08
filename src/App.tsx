import React, { useState } from 'react';
import { BookOpen, Users, Trophy, Clock } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import CourseCard from './components/CourseCard';
import CourseDetail from './components/CourseDetail';
import UserProfile from './components/UserProfile';
import VideoPlayer from './components/VideoPlayer';
import StatsCard from './components/StatsCard';
import { mockCourses, Course } from './data/courses';

type ViewType = 'dashboard' | 'course' | 'profile' | 'video';

function App() {
  const { isAuthenticated, isLoading: authLoading, login } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [courses, setCourses] = useState(mockCourses);

  const handleStartCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setCurrentView('course');
    }
  };

  const handleBackToDashboard = () => {
    setSelectedCourse(null);
    setSelectedLesson(null);
    setCurrentView('dashboard');
  };

  const handleBackToCourse = () => {
    setSelectedLesson(null);
    setCurrentView('course');
  };

  const handleStartLesson = (lessonId: string) => {
    if (selectedCourse) {
      const lesson = selectedCourse.lessons.find(l => l.id === lessonId);
      if (lesson) {
        setSelectedLesson(lesson);
        setCurrentView('video');
      }
    }
  };

  const handleUserMenuClick = () => {
    setCurrentView('profile');
  };

  // Mostrar loading mientras se verifica la autenticación
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Mostrar login si no está autenticado
  if (!isAuthenticated) {
    return <LoginForm onLogin={login} isLoading={authLoading} />;
  }

  const handleCompleteLesson = (lessonId: string) => {
    setCourses(prevCourses => 
      prevCourses.map(course => {
        if (course.id === selectedCourse?.id) {
          const updatedLessons = course.lessons.map(lesson =>
            lesson.id === lessonId ? { ...lesson, completed: true } : lesson
          );
          
          // Calcular nuevo progreso
          const completedLessons = updatedLessons.filter(l => l.completed).length;
          const newProgress = Math.round((completedLessons / updatedLessons.length) * 100);
          
          const updatedCourse = {
            ...course,
            lessons: updatedLessons,
            progress: newProgress,
            completed: newProgress === 100
          };
          
          // Actualizar el curso seleccionado también
          setSelectedCourse(updatedCourse);
          
          return updatedCourse;
        }
        return course;
      })
    );
  };

  // Calcular estadísticas
  const totalCourses = courses.length;
  const completedCourses = courses.filter(course => course.completed).length;
  const inProgressCourses = courses.filter(course => course.progress > 0 && !course.completed).length;
  const totalHours = courses.reduce((acc, course) => {
    const hours = parseFloat(course.duration.split(' ')[0]);
    return acc + hours;
  }, 0);

  // Renderizar vista de video
  if (currentView === 'video' && selectedLesson && selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onUserMenuClick={handleUserMenuClick} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <VideoPlayer 
            lesson={selectedLesson}
            courseTitle={selectedCourse.title}
            onBack={handleBackToCourse}
            onComplete={handleCompleteLesson}
          />
        </main>
      </div>
    );
  }

  // Renderizar vista de perfil
  if (currentView === 'profile') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onUserMenuClick={handleUserMenuClick} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <UserProfile onBack={handleBackToDashboard} />
        </main>
      </div>
    );
  }

  // Renderizar vista de curso
  if (currentView === 'course' && selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onUserMenuClick={handleUserMenuClick} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CourseDetail 
            course={selectedCourse} 
            onBack={handleBackToDashboard}
            onStartLesson={handleStartLesson}
          />
        </main>
      </div>
    );
  }

  // Renderizar dashboard principal
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onUserMenuClick={handleUserMenuClick} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Bienvenido a tu Centro de Capacitaciones
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Desarrolla nuevas habilidades y avanza en tu carrera profesional con nuestros cursos especializados.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <StatsCard
            title="Cursos Totales"
            value={totalCourses}
            icon={BookOpen}
            color="blue"
          />
          <StatsCard
            title="Completados"
            value={completedCourses}
            icon={Trophy}
            color="green"
          />
          <StatsCard
            title="En Progreso"
            value={inProgressCourses}
            icon={Users}
            color="yellow"
          />
          <StatsCard
            title="Horas Totales"
            value={`${totalHours}h`}
            icon={Clock}
            color="purple"
          />
        </div>

        {/* Course Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Mis Capacitaciones</h2>
            <div className="text-sm text-gray-600">
              {courses.length} cursos disponibles
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onStartCourse={handleStartCourse}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-200 mt-12">
          <p className="text-gray-600">
            © 2025 CapacitaPro. Plataforma de capacitaciones empresariales.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;