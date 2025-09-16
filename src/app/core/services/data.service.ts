import { Injectable } from '@angular/core';
import { User, Lesson, Badge, ChatScenario, LessonModule } from '../models/type'; // Path to your type definitions

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getCurrentUser(): User {
    return {
      id: '1',
      name: 'Guest User',
      profession: 'Software Engineer',
      email: 'user@example.com',
      avatar: '',
      level: 4,
      points: 2750,
      completedLessons: ['email-etiquette-1', 'email-etiquette-2'],
      badges: [
        {
          id: '1',
          name: 'Grammar Guru',
          description: 'Completed 10 grammar lessons with perfect scores',
          icon: 'PenTool', // This string is now used by the component template
          unlocked: true
        },
        {
          id: '2',
          name: 'Vocabulary Master',
          description: 'Learned 500 new business terms',
          icon: 'BookOpen',
          unlocked: true
        },
        {
          id: '3',
          name: 'Fluent Speaker',
          description: 'Maintained conversation for 30 minutes',
          icon: 'Mic',
          unlocked: false
        },
        {
          id: '4',
          name: 'Cultural Ambassador',
          description: 'Completed all cultural simulation scenarios',
          icon: 'Globe',
          unlocked: false
        },
        {
          id: '5',
          name: 'Networking Pro',
          description: 'Successfully completed 15 networking scenarios',
          icon: 'Users',
          unlocked: true
        }
      ],
      progress: {
        pronunciation: 65,
        grammar: 82,
        vocabulary: 78,
        fluency: 60
      }
    };
  }

  getLeaderboard() {
    return [
      { id: '2', name: 'Sarah Chen', points: 3200, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { id: '3', name: 'Miguel Rodriguez', points: 3050, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { id: '1', name: 'Guest User', points: 2750, avatar: '' },
      { id: '4', name: 'Emma Wilson', points: 2600, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { id: '5', name: 'Raj Patel', points: 2450, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
    ];
  }

  getRecentLessons(): Lesson[] {
    return [
      {
        id: '1',
        title: 'Mastering Email Etiquette',
        description: 'Learn professional email writing techniques for effective business communication',
        category: 'grammar',
        difficulty: 'intermediate',
        duration: 20,
        points: 150,
        completed: true
      },
      {
        id: '2',
        title: 'Presentation Confidence',
        description: 'Practice techniques to improve your confidence when presenting to colleagues',
        category: 'fluency',
        difficulty: 'advanced',
        duration: 30,
        points: 200,
        completed: false
      },
      {
        id: '3',
        title: 'Negotiation Vocabulary',
        description: 'Essential vocabulary for successful business negotiations',
        category: 'vocabulary',
        difficulty: 'intermediate',
        duration: 15,
        points: 120,
        completed: true
      },
      {
        id: '4',
        title: 'American Business Culture',
        description: 'Understanding cultural nuances in American workplace settings',
        category: 'cultural',
        difficulty: 'beginner',
        duration: 25,
        points: 180,
        completed: false
      }
    ];
  }

  getRecommendedLessons(): Lesson[] {
    return [
      {
        id: '5',
        title: 'Perfecting Your Pronunciation',
        description: 'Focus on commonly mispronounced business terms',
        category: 'pronunciation',
        difficulty: 'intermediate',
        duration: 20,
        points: 150,
        completed: false
      },
      {
        id: '6',
        title: 'Small Talk Mastery',
        description: 'Navigate casual conversations in professional settings',
        category: 'fluency',
        difficulty: 'beginner',
        duration: 15,
        points: 100,
        completed: false
      },
      {
        id: '7',
        title: 'Advanced Grammar for Reports',
        description: 'Polish your grammar for professional report writing',
        category: 'grammar',
        difficulty: 'advanced',
        duration: 25,
        points: 200,
        completed: false
      }
    ];
  }

  getChatScenarios(): ChatScenario[] {
    return [
      {
        id: '1',
        title: 'Job Interview Preparation',
        description: 'Practice answering common job interview questions',
        context: 'You are interviewing for a senior position at a multinational company',
        difficulty: 'advanced',
        category: 'interview'
      },
      {
        id: '2',
        title: 'Client Negotiation',
        description: 'Practice negotiating contract terms with a client',
        context: 'You need to negotiate pricing and delivery terms with an important client',
        difficulty: 'advanced',
        category: 'negotiation'
      },
      {
        id: '3',
        title: 'Daily Stand-up Meeting',
        description: 'Practice participating in an agile team stand-up',
        context: 'Share your progress, plans, and blockers in a daily team meeting',
        difficulty: 'intermediate',
        category: 'meeting'
      },
      {
        id: '4',
        title: 'Networking at a Conference',
        description: 'Practice introducing yourself and making connections',
        context: 'You are attending an industry conference and want to expand your professional network',
        difficulty: 'beginner',
        category: 'networking'
      },
      {
        id: '5',
        title: 'Product Presentation',
        description: 'Present a new product to potential customers',
        context: 'You are presenting your company\'s latest product to a group of potential clients',
        difficulty: 'intermediate',
        category: 'presentation'
      }
    ];
  }

  getLessonModules(): LessonModule[] {
    return [
      {
        id: 'email-etiquette',
        title: 'Professional Email Etiquette',
        description: 'Master the art of writing clear, effective business emails',
        category: 'grammar',
        difficulty: 'intermediate',
        duration: 30,
        points: 200,
        image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 25,
        completed: false,
        steps: [
          // ... all the steps for this lesson module
        ]
      },
      {
        id: 'presentation-skills',
        title: 'Presentation Skills Mastery',
        description: 'Learn techniques to deliver compelling business presentations with confidence',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 45,
        points: 250,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
          // ... all the steps for this lesson module
        ]
      },
      {
        id: 'negotiation-fundamentals',
        title: 'Negotiation Fundamentals',
        description: 'Develop essential negotiation skills and vocabulary for business contexts',
        category: 'vocabulary',
        difficulty: 'advanced',
        duration: 40,
        points: 300,
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
          // ... all the steps for this lesson module
        ]
      }
    ];
  }
}
