import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';

// Import UI Components
import { ButtonComponent } from '../../components/ui/button/button.component';
import { CardComponent } from '../../components/ui/card/card.component';
import { CardContentComponent } from '../../components/ui/card/card-content/card-content.component';

@Component({
  selector: 'app-tech-trek-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FeatherModule,
    ButtonComponent,
    CardComponent,
    CardContentComponent
  ],
  templateUrl: './tech-trek-page.component.html',
  styleUrls: ['./tech-trek-page.component.css']
})
export class TechTrekPageComponent {
  selectedLocationId: string | null = null;
  gameState: 'selection' | 'challenge' | 'feedback' = 'selection';
  isRecording = false;
  recordingComplete = false;
  feedback: {
    pronunciation: number;
    fluency: number;
    grammar: number;
    suggestions: string[];
  } | null = null;

  // Data for the different locations
  locations = [
    {
      id: 'office',
      name: 'Corporate Office',
      icon: 'briefcase',
      description: 'Practice formal business language in a corporate setting',
      scenarios: ['Client meeting', 'Presentation to executives', 'Job interview'],
      difficulty: 'Advanced',
      points: 200,
      time: '20-30 min',
      challenge: {
        type: 'presentation',
        prompt: 'Present a quarterly report to the board of directors, highlighting key achievements and future strategies.',
        keywords: ['revenue growth', 'market expansion', 'strategic initiatives', 'quarterly performance']
      }
    },
    {
      id: 'conference',
      name: 'Conference Center',
      icon: 'airplay',
      description: 'Present your ideas and network with professionals',
      scenarios: ['Product presentation', 'Panel discussion', 'Networking event'],
      difficulty: 'Intermediate',
      points: 150,
      time: '15-20 min',
      challenge: {
        type: 'networking',
        prompt: 'Introduce yourself and your company at an industry conference, then engage in a discussion about current market trends.',
        keywords: ['industry expertise', 'value proposition', 'collaboration opportunities', 'market insights']
      }
    },
    {
      id: 'coworking',
      name: 'Coworking Space',
      icon: 'users',
      description: 'Casual professional conversations with colleagues',
      scenarios: ['Team meeting', 'Project collaboration', 'Casual networking'],
      difficulty: 'Beginner',
      points: 100,
      time: '10-15 min',
      challenge: {
        type: 'collaboration',
        prompt: 'Participate in a team brainstorming session about improving workplace productivity.',
        keywords: ['team collaboration', 'innovative solutions', 'workflow optimization', 'best practices']
      }
    },
    {
      id: 'cafe',
      name: 'Business Café',
      icon: 'coffee',
      description: 'Informal business discussions in a relaxed setting',
      scenarios: ['Informal client meeting', 'Mentorship conversation', 'Business lunch'],
      difficulty: 'Beginner',
      points: 80,
      time: '10-15 min',
      challenge: {
        type: 'conversation',
        prompt: 'Have an informal discussion about potential business opportunities over coffee.',
        keywords: ['mutual benefits', 'partnership potential', 'market opportunities', 'next steps']
      }
    }
  ];

  // A getter to easily access the currently selected location object
  get selectedLocation() {
    return this.locations.find(loc => loc.id === this.selectedLocationId);
  }

  // Game logic methods
  startRecording(): void {
    this.isRecording = true;
    setTimeout(() => this.stopRecording(), 5000); // Simulate recording for 5 seconds
  }

  stopRecording(): void {
    this.isRecording = false;
    this.recordingComplete = true;
  }

  playRecording(): void {
    // In a real app, you would play the actual recorded audio
    console.log('Playing recorded audio...');
  }

  startChallenge(): void {
    if (this.selectedLocationId) {
      this.gameState = 'challenge';
    }
  }

  completeChallenge(): void {
    // Simulate getting feedback
    setTimeout(() => {
      this.feedback = {
        pronunciation: 85,
        fluency: 78,
        grammar: 92,
        suggestions: [
          'Try emphasizing key terms more clearly',
          'Maintain a steady pace throughout',
          'Consider using more industry-specific vocabulary'
        ]
      };
      this.gameState = 'feedback';
    }, 1500);
  }

  resetGame(): void {
    this.gameState = 'selection';
    this.selectedLocationId = null;
    this.recordingComplete = false;
    this.feedback = null;
  }

  retryChallenge(): void {
    this.gameState = 'challenge';
    this.recordingComplete = false;
    this.feedback = null;
  }
}
