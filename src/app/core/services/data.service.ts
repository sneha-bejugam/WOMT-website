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

  

  getLessonModules(): LessonModule[] {
    return [
      {
        id: 'Indian_phrases',
        title: 'Indian common workspace phrases',
        description: 'Phrases that are most commonly used and in Indian workspace',
        category: 'grammar',
        difficulty: 'intermediate',
        duration: 15,
        points: 200,
        image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 25,
        completed: false,
        steps: [
         {
                id: 'P1',
                type: 'introduction',
                title: 'Escalate the issue',
                content: "If this keeps happening, I'll need to escalate the issue to my supervisor.",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P1.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P2',
                type: 'introduction',
                title: ' Let me check with my team',
                content: 'That’s a great question—let me check with my team and get back to you.',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P2.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P3',
                type: 'introduction',
                title: 'That’s outside my scope',
                content: 'I understand your concern, but that’s outside my scope of responsibility.',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P3.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P4',
                type: 'introduction',
                title: 'Can you clarify your request',
                content: 'I want to make sure I understand—can you clarify your request a bit?',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P4.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P5',
                type: 'introduction',
                title: ' I’ll follow up by email',
                content: 'Thanks for the update—I’ll follow up by email with the next steps.',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P5.mp4' // The exact filename from Azure
                },
                completed: false
              },
        ]
      },
      {
        id: 'American_phrases',
        title: 'American common workspace phrases',
        description: 'Phrases that are most commonly used and in American workspace',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 15,
        points: 250,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P6',
                type: 'introduction',
                title: 'That’s not my area of expertise',
                content: "I’d love to help, but that’s not my area of expertise.",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P6.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P7',
                type: 'introduction',
                title: "I’ll loop in a colleague",
                content: 'Let me loop in a colleague who’s better equipped to answer that.',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P7.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P8',
                type: 'introduction',
                title: ' I’m not authorized to approve that',
                content: 'I understand your concern, but that’s outside my scope of responsibility.',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P8.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P9',
                type: 'introduction',
                title: 'Can you clarify your request',
                content: 'I want to make sure I understand—can you clarify your request a bit?',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P9.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P10',
                type: 'introduction',
                title: 'I’ll send a summary after this',
                content: 'I’ll send a quick summary after this call so we’re all aligned.',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P10.mp4' // The exact filename from Azure
                },
                completed: false
              },
        ]
      },
      {
        id: 'French_phrases',
        title: 'French common workspace phrases',
        description: 'Phrases that are most commonly used and in French workspace',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 15,
        points: 250,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P11',
                type: 'introduction',
                title: 'That’s a great question',
                content: "That’s a great question—thanks for bringing it up.",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P11.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P12',
                type: 'introduction',
                title: "I’ll need more context",
                content: 'I’ll need a bit more context before I can give a clear answer.',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P12.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P13',
                type: 'introduction',
                title: 'Let me rephrase that',
                content: 'Let me rephrase that to make it clearer.',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P13.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P14',
                type: 'introduction',
                title: 'I’ll defer to the team',
                content: 'I’ll defer to the team on that decision.',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P14.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P15',
                type: 'introduction',
                title: 'Can you expand on that',
                content: 'Can you expand on that a little so I understand your angle?',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P15.mp4' // The exact filename from Azure
                },
                completed: false
              },
        ]
      },
      {
        id: 'French_phrases',
        title: 'French common workspace phrases',
        description: 'Phrases that are most commonly used and in French workspace',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 15,
        points: 250,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P16',
                type: 'introduction',
                title: 'I’ll take that offline',
                content: "Let’s take that offline and follow up separately.",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P16.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P17',
                type: 'introduction',
                title: "That’s a valid concern",
                content: 'That’s a valid concern—we’ll make sure it’s addressed.',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P17.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
               id: 'P18',
                type: 'introduction',
                title: 'I’ll flag that for review',
                content: 'I’ll flag that for review and loop in the right folks.',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P18.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P19',
                type: 'introduction',
                title: 'Let’s align on next steps',
                content: 'Let’s align on next steps before we wrap up.',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P19.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P20',
                type: 'introduction',
                title: 'I’ll get back to you soon',
                content: 'I’ll get back to you soon once I’ve checked with the team.',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P20.mp4' // The exact filename from Azure
                },
                completed: false
              },
        ]
      },
    ];
  }
}
