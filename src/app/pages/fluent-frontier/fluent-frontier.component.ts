import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { Subscription } from 'rxjs';

// Import UI Components
import { ButtonComponent } from '../../components/ui/button/button.component';
import { CardComponent } from '../../components/ui/card/card.component';
import { CardContentComponent } from '../../components/ui/card/card-content/card-content.component';

// Import Services and Models
import { AzureSpeechService } from '../../core/services/azure-speech.service';
import { PronunciationResult } from '../../core/models/pronunciation-result.interface';
// import { environment } from '../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fluent-frontier-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FeatherModule,
    ButtonComponent,
    CardComponent,
    CardContentComponent,
    
  ],
  providers: [AzureSpeechService
  ],
  templateUrl: './fluent-frontier.component.html',
  styleUrls: ['./fluent-frontier.component.css']
})
export class FluentFrontierPageComponent implements OnInit, OnDestroy {
  selectedLocationId: string | null = null;
  gameState: 'selection' | 'challenge' | 'feedback' | 'recording' = 'selection';
  recordingState: 'idle' | 'recording' | 'processing' = 'idle';
  recordingComplete = false;
  feedback: PronunciationResult | null = null;
  
  private subscriptions = new Subscription();

  // Your existing locations data with referenceText added
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
        keywords: ['revenue growth', 'market expansion', 'strategic initiatives', 'quarterly performance'],
        referenceText: 'I would like to present our quarterly performance showing significant revenue growth through market expansion and strategic initiatives that have positioned us well for future success.'
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
        keywords: ['industry expertise', 'value proposition', 'collaboration opportunities', 'market insights'],
        referenceText: 'I represent a company with strong industry expertise and a clear value proposition, seeking collaboration opportunities and market insights to drive innovation.'
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
        keywords: ['team collaboration', 'innovative solutions', 'workflow optimization', 'best practices'],
        referenceText: 'Team collaboration is essential for innovative solutions and workflow optimization using best practices that improve overall productivity.'
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
        keywords: ['mutual benefits', 'partnership potential', 'market opportunities', 'next steps'],
        referenceText: 'Let us discuss mutual benefits and partnership potential for market opportunities and determine our next steps for collaboration.'
      }
    },
    {
    id: 'boardroom',
    name: 'Executive Boardroom',
    icon: 'tv',
    description: 'High-stakes presentations to senior leadership and investors',
    scenarios: ['Board presentation', 'Investor pitch', 'Strategic planning'],
    difficulty: 'Expert',
    points: 300,
    time: '30-45 min',
    challenge: {
      type: 'executive-presentation',
      prompt: 'Present a new business strategy to the board of directors, including market analysis, competitive positioning, and expected ROI.',
      keywords: ['market analysis', 'competitive advantage', 'return on investment', 'strategic roadmap', 'stakeholder value'],
      referenceText: 'Our comprehensive market analysis reveals significant competitive advantage opportunities that will deliver exceptional return on investment through our strategic roadmap, creating substantial stakeholder value.'
    }
  },
  {
    id: 'sales-floor',
    name: 'Sales Department',
    icon: 'trending-up',
    description: 'Client pitches and sales presentations in a dynamic environment',
    scenarios: ['Product demo', 'Sales pitch', 'Client negotiation'],
    difficulty: 'Advanced',
    points: 250,
    time: '25-35 min',
    challenge: {
      type: 'sales-pitch',
      prompt: 'Deliver a compelling sales presentation to a potential client, highlighting your product benefits and addressing their specific business needs.',
      keywords: ['value proposition', 'cost savings', 'ROI calculation', 'implementation timeline', 'competitive pricing'],
      referenceText: 'Our solution offers an compelling value proposition with significant cost savings and measurable ROI calculation, featuring a streamlined implementation timeline at competitive pricing that exceeds market standards.'
    }
  },
  {
    id: 'training-room',
    name: 'Training Center',
    icon: 'book-open',
    description: 'Educational presentations and knowledge sharing sessions',
    scenarios: ['Workshop facilitation', 'Training delivery', 'Knowledge transfer'],
    difficulty: 'Intermediate',
    points: 180,
    time: '20-30 min',
    challenge: {
      type: 'training-session',
      prompt: 'Conduct a professional development workshop on effective communication skills for your team members.',
      keywords: ['learning objectives', 'skill development', 'practical application', 'performance metrics', 'continuous improvement'],
      referenceText: 'Today we will focus on clear learning objectives for skill development through practical application, measuring success with performance metrics and fostering continuous improvement in our communication abilities.'
    }
  },
  {
    id: 'client-lounge',
    name: 'Client Reception',
    icon: 'slack',
    description: 'Relationship building and client service interactions',
    scenarios: ['Client onboarding', 'Relationship management', 'Service consultation'],
    difficulty: 'Beginner',
    points: 120,
    time: '15-20 min',
    challenge: {
      type: 'client-service',
      prompt: 'Welcome a new client and explain your company services while building rapport and understanding their business requirements.',
      keywords: ['client satisfaction', 'service excellence', 'business requirements', 'long-term partnership', 'customized solutions'],
      referenceText: 'We prioritize client satisfaction through service excellence by understanding your unique business requirements and building long-term partnerships with customized solutions tailored to your success.'
    }
  }
];
 

  constructor(private azureSpeechService: AzureSpeechService) {}

  ngOnInit(): void {
    // Initialize Azure Speech Service
    // try {
    //    this.azureSpeechService.initialize({
    //     region: environment.azureSpeech.region,
    //     language: environment.azureSpeech.language
    //   });

    //   // Subscribe to recording state changes
    //   this.subscriptions.add(
    //     this.azureSpeechService.recordingState$.subscribe(state => {
    //       this.recordingState = state;
    //       this.updateGameState(state);
    //     })
    //   );

    // } catch (error) {
    //   console.error('Failed to initialize speech service:', error);
    //   alert('Failed to initialize speech recognition. Please check your configuration.');
    // }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.azureSpeechService.dispose();
  }

  private updateGameState(recordingState: 'idle' | 'recording' | 'processing'): void {
    switch (recordingState) {
      case 'recording':
        this.gameState = 'recording';
        break;
      case 'processing':
        // Stay in current state while processing
        break;
      case 'idle':
        if (this.gameState === 'recording') {
          this.gameState = 'challenge';
        }
        break;
    }
  }

  get selectedLocation() {
    return this.locations.find(loc => loc.id === this.selectedLocationId);
  }

  get isRecording(): boolean {
    return this.recordingState === 'recording';
  }

  get isProcessing(): boolean {
    return this.recordingState === 'processing';
  }

  // Fix: Add the missing playRecording method
  playRecording(): void {
    // In a real app, you would play the actual recorded audio
    console.log('Playing recorded audio...');
    alert('Audio playback feature would be implemented here with actual audio storage and playback functionality.');
  }

  async startRecording(): Promise<void> {
    if (!this.selectedLocation || !this.azureSpeechService.isServiceReady()) {
      alert('Speech service not ready. Please refresh and try again.');
      return;
    }

    try {
      this.recordingComplete = false;
      this.feedback = null;

      const result = await this.azureSpeechService.startPronunciationAssessment(
        this.selectedLocation.challenge.referenceText,
        this.selectedLocation.challenge.keywords
      );

      this.processPronunciationResult(result);

    } catch (error) {
      console.error('Recording failed:', error);
      
      let errorMessage = 'Recording failed. ';
      if (error instanceof Error) {
        if (error.message.includes('microphone')) {
          errorMessage += 'Please check your microphone permissions.';
        } else if (error.message.includes('network') || error.message.includes('subscription')) {
          errorMessage += 'Please check your internet connection and Azure configuration.';
        } else {
          errorMessage += 'Please try again.';
        }
      }
      
      alert(errorMessage);
      this.resetRecording();
    }
  }

  stopRecording(): void {
    this.azureSpeechService.stopRecording();
  }

  private processPronunciationResult(result: PronunciationResult): void {
    this.recordingComplete = true;
    this.feedback = result;
    this.gameState = 'feedback';
  }

  private resetRecording(): void {
    this.recordingComplete = false;
    this.gameState = 'challenge';
  }

  startChallenge(): void {
    if (this.selectedLocationId) {
      this.gameState = 'challenge';
    }
  }

  completeChallenge(): void {
    if (this.recordingComplete && this.feedback) {
      this.gameState = 'feedback';
    }
  }

  resetGame(): void {
    this.gameState = 'selection';
    this.selectedLocationId = null;
    this.recordingComplete = false;
    this.feedback = null;
    this.azureSpeechService.stopRecording();
  }

  retryChallenge(): void {
    this.gameState = 'challenge';
    this.recordingComplete = false;
    this.feedback = null;
  }

  // Helper methods for styling
  getScoreColor(score: number): string {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  }

  getProgressBarColor(score: number): string {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  getOverallRating(score: number): string {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    if (score >= 60) return 'Needs Improvement';
    return 'Poor';
  }
}

