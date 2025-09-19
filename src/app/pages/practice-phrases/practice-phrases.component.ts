import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { DataService } from '../../core/services/data.service';
import { LessonModule, LessonStep, PhraseModule } from '../../core/models/type';
// Import the video service
import { VideoStorageService, VideoFile } from '../../core/services/video-storage.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Import all the UI components this page uses
import { CardComponent } from '../../components/ui/card/card.component';
import { CardContentComponent } from '../../components/ui/card/card-content/card-content.component';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { ProgressBarComponent } from '../progess-bar/progess-bar.component';
import { BadgeComponent } from '../../components/ui/badge/badge.component';



@Component({
  selector: 'app-practice-phrases',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FeatherModule,
    CardComponent,
    CardContentComponent,
    ButtonComponent,
    ProgressBarComponent,
    BadgeComponent
  ],
  templateUrl: './practice-phrases.component.html',
  styleUrl: './practice-phrases.component.css'
})
export class PracticePhrasesComponent {
  currentPhrase: PhraseModule | null = null;
  isLoading = true; 
  currentStepIndex = 0;
  userAnswers: Record<string, string | string[]> = {};
  isRecording = false;
  recordingComplete = false;
  quizSubmitted = false;
  quizResult: 'correct' | 'incorrect' | null = null;
  textInput = '';



currentStepVideo$: Observable<VideoFile | null> | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private videoService: VideoStorageService // Inject the video service
  ) {}

  ngOnInit(): void {
    const phraseId = this.route.snapshot.paramMap.get('phraseId');
    if (phraseId) {
      const phrase = this.dataService.getPhraseModules().find(module => module.id === phraseId);
      if (phrase) {
        this.currentPhrase = phrase;
        this.loadVideoForCurrentStep(); // Initial video load
      } else {
        this.router.navigate(['/practice']);
      }
    }
    this.isLoading = false;
  }
get currentStep(): LessonStep | null {
    return this.currentPhrase?.steps[this.currentStepIndex] || null;
  }

  get progressPercentage(): number {
    if (!this.currentPhrase) return 0;
    return ((this.currentStepIndex + 1) / this.currentPhrase.steps.length) * 100;
  }
  goToNextStep(): void {
    if (this.currentPhrase && this.currentStepIndex < this.currentPhrase.steps.length - 1) {
      this.currentPhrase.steps[this.currentStepIndex].completed = true;
      this.currentStepIndex++;
      this.resetStepState();
      this.loadVideoForCurrentStep(); // Load video for the new step
    } else if (this.currentPhrase) {
      this.currentPhrase.completed = true;
      this.router.navigate(['/dashboard']);
    }
  }

  goToPreviousStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.resetStepState();
      this.loadVideoForCurrentStep(); // Load video for the previous step
    }
  }

  // New method to fetch video data when the step changes
  private loadVideoForCurrentStep(): void {
    const step = this.currentStep;
    if (step && step.media?.type === 'video') {
      // Use the video name from the step's media URL field
      this.currentStepVideo$ = this.videoService.getVideo(step.media.url);
    } else {
      this.currentStepVideo$ = of(null);
    }
  }

  handleQuizAnswer(answer: string): void {
    if (this.currentStep?.type === 'quiz' && !this.quizSubmitted) {
      this.userAnswers[this.currentStep.id] = answer;
    }
  }

  submitQuiz(): void {
    if (this.currentStep?.type === 'quiz' && this.currentStep.correctAnswer) {
      const userAnswer = this.userAnswers[this.currentStep.id];
      this.quizResult = userAnswer === this.currentStep.correctAnswer ? 'correct' : 'incorrect';
      this.quizSubmitted = true;
    }
  }

  startRecording(): void {
    this.isRecording = true;
    setTimeout(() => this.stopRecording(), 5000);
  }

  stopRecording(): void {
    this.isRecording = false;
    this.recordingComplete = true;
  }

  playRecording(): void {
    console.log('Playing recording...');
  }

  submitTextInput(): void {
    if (this.currentStep && (this.currentStep.type === 'exercise' || this.currentStep.type === 'practice')) {
      this.userAnswers[this.currentStep.id] = this.textInput;
      this.quizSubmitted = true;
    }
  }

  private resetStepState(): void {
    this.quizSubmitted = false;
    this.quizResult = null;
    this.textInput = '';
    this.recordingComplete = false;
  }
}