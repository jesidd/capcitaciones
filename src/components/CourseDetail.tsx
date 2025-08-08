import React from 'react';
import { ArrowLeft, Clock, Users, Star, BookOpen, CheckCircle } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  students: number;
  progress: number;
  image: string;
  category: string;
  completed: boolean;
  instructor: string;
  rating: number;
  lessons: Array<{
    id: string;
    title: string;
    duration: string;
    completed: boolean;
  }>;
}

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  onStartLesson: (lessonId: string) => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack, onStartLesson }) => {
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
        <div className="relative">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-64 sm:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2 inline-block">
                {course.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {course.title}
              </h1>
              <p className="text-gray-700 text-sm sm:text-base">
                Instructor: {course.instructor}
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-yellow-500 mb-1">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-semibold">{course.rating}</span>
              </div>
              <p className="text-xs text-gray-600">Calificación</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-gray-700 mb-1">
                <Clock className="h-4 w-4" />
                <span className="font-semibold">{course.duration}</span>
              </div>
              <p className="text-xs text-gray-600">Duración</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-gray-700 mb-1">
                <Users className="h-4 w-4" />
                <span className="font-semibold">{course.students}</span>
              </div>
              <p className="text-xs text-gray-600">Estudiantes</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-gray-700 mb-1">
                <BookOpen className="h-4 w-4" />
                <span className="font-semibold">{course.lessons.length}</span>
              </div>
              <p className="text-xs text-gray-600">Lecciones</p>
            </div>
          </div>
          
          {course.progress > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">Tu Progreso</span>
                <span className="text-sm text-gray-600">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h2>
            <p className="text-gray-700 leading-relaxed">{course.description}</p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Contenido del Curso</h2>
            <div className="space-y-2">
              {course.lessons.map((lesson, index) => (
                <div 
                  key={lesson.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => onStartLesson(lesson.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {lesson.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-500">{index + 1}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                      <p className="text-sm text-gray-600">{lesson.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;