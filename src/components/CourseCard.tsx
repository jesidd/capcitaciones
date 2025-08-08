import React from 'react';
import { Clock, Users, CheckCircle, PlayCircle } from 'lucide-react';

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
}

interface CourseCardProps {
  course: Course;
  onStartCourse: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onStartCourse }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {course.category}
          </span>
        </div>
        {course.completed && (
          <div className="absolute top-3 right-3">
            <CheckCircle className="h-6 w-6 text-green-500 bg-white rounded-full" />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{course.students} estudiantes</span>
          </div>
        </div>
        
        {course.progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Progreso</span>
              <span className="text-sm text-gray-600">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <button
          onClick={() => onStartCourse(course.id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <PlayCircle className="h-4 w-4" />
          <span>{course.progress > 0 ? 'Continuar' : 'Comenzar'}</span>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;