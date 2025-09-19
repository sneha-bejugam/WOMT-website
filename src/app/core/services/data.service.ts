import { Injectable } from '@angular/core';
import { User, Lesson, Badge, ChatScenario, LessonModule, PhraseModule } from '../models/type'; // Path to your type definitions

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
        completed: false
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
        completed: false
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
                  url: 'P1_Long.mp4' // The exact filename from Azure
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
                  url: 'P2_Long.mp4' // The exact filename from Azure
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
                  url: 'P3_Long.mp4' // The exact filename from Azure
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
                  url: 'P4_Long.mp4' // The exact filename from Azure
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
                  url: 'P5_Long.mp4' // The exact filename from Azure
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
                  url: 'P6_Long.mp4' // The exact filename from Azure
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
                  url: 'P7_Long.mp4' // The exact filename from Azure
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
                  url: 'P8_Long.mp4' // The exact filename from Azure
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
                  url: 'P9_Long.mp4' // The exact filename from Azure
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
                  url: 'P10_Long.mp4' // The exact filename from Azure
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
                  url: 'P11_Long.mp4' // The exact filename from Azure
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
                  url: 'P12_Long.mp4' // The exact filename from Azure
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
                  url: 'P13_Long.mp4' // The exact filename from Azure
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
                  url: 'P14_Long.mp4' // The exact filename from Azure
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
                  url: 'P15_Long.mp4' // The exact filename from Azure
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
                  url: 'P16_Long.mp4' // The exact filename from Azure
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
                  url: 'P17_Long.mp4' // The exact filename from Azure
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
                  url: 'P18_Long.mp4' // The exact filename from Azure
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
                  url: 'P19_Long.mp4' // The exact filename from Azure
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
                  url: 'P20_Long.mp4' // The exact filename from Azure
                },
                completed: false
              },
        ]
      },
    ];
  }
  getPhraseModules(): PhraseModule[] {
    return [
      {
        id: 'p1_only',
        title: 'Escalate the issue',
        description: 'Common Practice phrases',
        category: 'pronunciation',
        difficulty: 'beginner',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 25,
        completed: false,
        steps: [
         {
                id: 'P1_onlyphrase',
                type: 'introduction',
                title: 'Escalate the issue',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P1_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P1_silent',
                type: 'introduction',
                title: 'Escalate the issue',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P1_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
              
        ]
      },
      {
        id: 'p2_only',
        title: 'Let me check with my team',
        description: 'Common Practice phrases',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P2_onlyphrase',
                type: 'introduction',
                title: 'Let me check with my team',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P2_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P2_silent',
                type: 'introduction',
                title: "Let me check with my team",
                content: 'Common Practice phrases',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P2_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
             
        ]
      },
      {
        id: 'p3_only',
        title: 'That’s outside my scope',
        description: 'Common Practice phrases',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P3_onlyphrase',
                type: 'introduction',
                title: 'That’s outside my scope',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P3_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P3_silent',
                type: 'introduction',
                title: "That’s outside my scope",
                content: 'Common Practice phrases',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P3_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
             
        ]
      },
      {
        id: 'p4_only',
        title: 'Can you clarify your request',
        description: 'Common Practice phrases',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P4_onlyphrase',
                type: 'introduction',
                title: 'Can you clarify your request',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P4_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P4_silent',
                type: 'introduction',
                title: "Can you clarify your request",
                content: 'Common Practice phrases',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P4_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
             
        ]
      },
      {
        id: 'p5_only',
        title: 'I’ll follow up by email',
        description: 'Common Practice phrases',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P5_onlyphrase',
                type: 'introduction',
                title: 'I’ll follow up by email',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P5_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P5_silent',
                type: 'introduction',
                title: "I’ll follow up by email",
                content: 'Common Practice phrases',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P5_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
             
        ]
      },
      {
        id: 'p6_only',
        title: 'That’s not my area of expertise',
        description: 'Common Practice phrases',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P6_onlyphrase',
                type: 'introduction',
                title: 'That’s not my area of expertise',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P6_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P6_silent',
                type: 'introduction',
                title: "That’s not my area of expertise",
                content: 'Common Practice phrases',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P6_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
             
        ]
      },
      {
        id: 'p7_only',
        title: 'I’ll loop in a colleague',
        description: 'Common Practice phrases',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P7_onlyphrase',
                type: 'introduction',
                title: 'I’ll loop in a colleague',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P7_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P7_silent',
                type: 'introduction',
                title: "I’ll loop in a colleague",
                content: 'Common Practice phrases',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P7_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
             
        ]
      },
      {
        id: 'p8_only',
        title: 'I’m not authorized to approve that',
        description: 'Common Practice phrases',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P8_onlyphrase',
                type: 'introduction',
                title: 'I’m not authorized to approve that',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P8_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P8_silent',
                type: 'introduction',
                title: "I’m not authorized to approve that",
                content: 'Common Practice phrases',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P8_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
             
        ]
      },
      {
        id: 'p9_only',
        title: 'Let’s revisit this tomorrow',
        description: 'Common Practice phrases',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P9_onlyphrase',
                type: 'introduction',
                title: 'Let’s revisit this tomorrow',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P9_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P9_silent',
                type: 'introduction',
                title: "Let’s revisit this tomorrow",
                content: 'Common Practice phrases',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P9_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
             
        ]
      },
      {
        id: 'p10_only',
        title: 'I’ll send a summary after this',
        description: 'Common Practice phrases',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P10_onlyphrase',
                type: 'introduction',
                title: 'I’ll send a summary after this',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P10_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P10_silent',
                type: 'introduction',
                title: "I’ll send a summary after this",
                content: 'Common Practice phrases',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P10_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
             
        ]
      },
      {
        id: 'p11_only',
        title: 'That’s a great question',
        description: 'Common Practice phrases',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P11_onlyphrase',
                type: 'introduction',
                title: 'That’s a great question',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P11_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P11_silent',
                type: 'introduction',
                title: "That’s a great question",
                content: 'Common Practice phrases',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P11_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
             
        ]
      },
      {
        id: 'p12_only',
        title: 'I’ll need more context',
        description: 'Common Practice phrases',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P12_onlyphrase',
                type: 'introduction',
                title: 'I’ll need more context',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P12_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P12_silent',
                type: 'introduction',
                title: "I’ll need more context",
                content: 'Common Practice phrases',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P12_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
             
        ]
      },
      {
        id: 'p13_only',
        title: 'Let me check with my team',
        description: 'Common Practice phrases',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P13_onlyphrase',
                type: 'introduction',
                title: 'Let me rephrase that',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P13_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P13_silent',
                type: 'introduction',
                title: "Let me rephrase that",
                content: 'Common Practice phrases',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P13_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
             
        ]
      },
      {
        id: 'p14_only',
        title: 'I’ll defer to the team',
        description: 'Common Practice phrases',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P14_onlyphrase',
                type: 'introduction',
                title: 'I’ll defer to the team',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P14_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P14_silent',
                type: 'introduction',
                title: "I’ll defer to the team",
                content: 'Common Practice phrases',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P14_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
             
        ]
      },
      {
        id: 'p15_only',
        title: 'Can you expand on that',
        description: 'Common Practice phrases',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P15_onlyphrase',
                type: 'introduction',
                title: 'Can you expand on that',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P15_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P15_silent',
                type: 'introduction',
                title: "Can you expand on that",
                content: 'Common Practice phrases',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P15_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
             
        ]
      },
      {
        id: 'p16_only',
        title: 'Let me check with my team',
        description: 'Common Practice phrases',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P16_onlyphrase',
                type: 'introduction',
                title: 'I’ll take that offline',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P16_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P16_silent',
                type: 'introduction',
                title: "I’ll take that offline",
                content: 'Common Practice phrases',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P16_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
             
        ]
      },
      {
        id: 'p17_only',
        title: 'That’s a valid concern',
        description: 'Common Practice phrases',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P17_onlyphrase',
                type: 'introduction',
                title: 'That’s a valid concern',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P17_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P17_silent',
                type: 'introduction',
                title: "That’s a valid concern",
                content: 'Common Practice phrases',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P17_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
             
        ]
      },
      {
        id: 'p18_only',
        title: 'I’ll flag that for review',
        description: 'Common Practice phrases',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P18_onlyphrase',
                type: 'introduction',
                title: 'I’ll flag that for review',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P18_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P18_silent',
                type: 'introduction',
                title: "I’ll flag that for review",
                content: 'Common Practice phrases',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P18_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
             
        ]
      },
      {
        id: 'p19_only',
        title: 'Let’s align on next steps',
        description: 'Common Practice phrases',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P19_onlyphrase',
                type: 'introduction',
                title: 'Let’s align on next steps',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P19_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P19_silent',
                type: 'introduction',
                title: "Let’s align on next steps",
                content: 'Common Practice phrases',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P19_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
             
        ]
      },
      {
        id: 'p20_only',
        title: 'I’ll get back to you soon',
        description: 'Common Practice phrases',
        category: 'fluency',
        difficulty: 'intermediate',
        duration: 10,
        points: 50,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        progress: 0,
        completed: false,
        steps: [
         {
                id: 'P20_onlyphrase',
                type: 'introduction',
                title: 'I’ll get back to you soon',
                content: "Common Practice phrases",
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P20_model.mp4' // The exact filename from Azure
                },
                completed: false
              },
              {
                id: 'P20_silent',
                type: 'introduction',
                title: "I’ll get back to you soon",
                content: 'Common Practice phrases',
                // ✅ THIS IS THE CONNECTION
                media: {
                  type: 'video',
                  url: 'P20_silent.mp4' // The exact filename from Azure
                },
                completed: false
              },
             
        ]
      },
      
    ];
  }
}
