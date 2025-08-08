import React from 'react';
import { ArrowLeft, Play, Pause, Volume2, Maximize, CheckCircle } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
  description?: string;
}

interface VideoPlayerProps {
  lesson: Lesson;
  courseTitle: string;
  onBack: () => void;
  onComplete: (lessonId: string) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ lesson, courseTitle, onBack, onComplete }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [showCompleteButton, setShowCompleteButton] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Simular video con duración basada en el tiempo de la lección
  const simulatedDuration = React.useMemo(() => {
    const minutes = parseInt(lesson.duration.split(' ')[0]);
    return minutes * 60; // convertir a segundos
  }, [lesson.duration]);

  React.useEffect(() => {
    setDuration(simulatedDuration);
  }, [simulatedDuration]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          if (newTime >= duration * 0.8) { // Mostrar botón de completar al 80%
            setShowCompleteButton(true);
          }
          if (newTime >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleComplete = () => {
    onComplete(lesson.id);
    setShowCompleteButton(false);
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Volver al curso</span>
      </button>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Video Player */}
        <div className="relative bg-black aspect-video">
          {/* Video real o simulación */}
          {lesson.videoUrl && lesson.videoUrl !== 'https://example.com/video1' ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={lesson.videoUrl}
              onTimeUpdate={(e) => setCurrentTime(Math.floor(e.currentTarget.currentTime))}
              onLoadedMetadata={(e) => setDuration(Math.floor(e.currentTarget.duration))}
            />
          ) : (
            /* Simulación de video con imagen de placeholder */
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Play className="h-12 w-12 text-white ml-1" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
                <p className="text-blue-200">Contenido de video educativo</p>
              </div>
            </div>
          )}
          
          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="w-full bg-gray-600 rounded-full h-1">
                <div 
                  className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <button
                  onClick={togglePlay}
                  className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                </button>
                <Volume2 className="h-5 w-5" />
                <span className="text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {showCompleteButton && !lesson.completed && (
                  <button
                    onClick={handleComplete}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Marcar como completado</span>
                  </button>
                )}
                <Maximize className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          {lesson.completed && (
            <div className="absolute top-4 right-4">
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                <CheckCircle className="h-4 w-4" />
                <span>Completado</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Lesson Info */}
        <div className="p-6">
          <div className="mb-4">
            <div className="text-sm text-blue-600 font-medium mb-1">{courseTitle}</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
            <p className="text-gray-600">
              {lesson.description || `Aprende sobre ${lesson.title.toLowerCase()} en esta lección interactiva. Contenido diseñado para maximizar tu aprendizaje y comprensión del tema.`}
            </p>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Duración</p>
                <p className="font-semibold text-gray-900">{lesson.duration}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Progreso</p>
                <p className="font-semibold text-gray-900">{Math.round(progressPercentage)}%</p>
              </div>
            </div>
            
            {lesson.completed && (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Lección completada</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;