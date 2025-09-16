export interface User {
  id: string;
  name: string;
  profession: string;
  email: string;
  avatar: string;
  level: number;
  points: number;
  badges: Badge[];
  progress: {
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    fluency: number;
  };
  completedLessons: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: 'pronunciation' | 'grammar' | 'vocabulary' | 'fluency' | 'cultural';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  points: number;
  completed: boolean;
}

export interface LessonStep {
  id:string;
  type: 'introduction' | 'content' | 'exercise' | 'quiz' | 'practice' | 'summary';
  title: string;
  content: string;
  media?: {
    type: 'image' | 'audio' | 'video';
    url: string;
  };
  options?: string[];
  correctAnswer?: string | string[];
  userAnswer?: string | string[];
  completed: boolean;
}

export interface LessonModule {
  id: string;
  title: string;
  description: string;
  category: 'pronunciation' | 'grammar' | 'vocabulary' | 'fluency' | 'cultural';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  points: number;
  image: string;
  steps: LessonStep[];
  progress: number;
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  feedback?: {
    grammar: string[];
    vocabulary: string[];
    pronunciation: string[];
  };
}

export interface ChatScenario {
  id: string;
  title: string;
  description: string;
  context: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'interview' | 'meeting' | 'negotiation' | 'networking' | 'presentation';
}
