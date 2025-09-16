import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { DataService } from '../../core/services/data.service';
import { LessonModule, LessonStep } from '../../core/models/type';

// Import all the UI components this page uses
import { CardComponent } from '../../components/ui/card/card.component';
import { CardContentComponent } from '../../components/ui/card/card-content/card-content.component';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { ProgressBarComponent } from '../progess-bar/progess-bar.component';
import { BadgeComponent } from '../../components/ui/badge/badge.component';

@Component({
  selector: 'app-lesson-page',
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
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonPageComponent implements OnInit {
  currentLesson: LessonModule | null = null;
  currentStepIndex = 0;
  userAnswers: Record<string, string | string[]> = {};
  isRecording = false;
  recordingComplete = false;
  quizSubmitted = false;
  quizResult: 'correct' | 'incorrect' | null = null;
  textInput = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const lessonId = this.route.snapshot.paramMap.get('lessonId');
    if (lessonId) {
      const lesson = this.dataService.getLessonModules().find(module => module.id === lessonId);
      if (lesson) {
        this.currentLesson = lesson;
      } else {
        this.router.navigate(['/lessons']);
      }
    }
  }

  get currentStep(): LessonStep | null {
    return this.currentLesson?.steps[this.currentStepIndex] || null;
  }

  get progressPercentage(): number {
    if (!this.currentLesson) return 0;
    return ((this.currentStepIndex + 1) / this.currentLesson.steps.length) * 100;
  }

  goToNextStep(): void {
    if (this.currentLesson && this.currentStepIndex < this.currentLesson.steps.length - 1) {
      this.currentLesson.steps[this.currentStepIndex].completed = true;
      this.currentStepIndex++;
      this.resetStepState();
    } else if (this.currentLesson) {
      this.currentLesson.completed = true;
      this.router.navigate(['/dashboard']);
    }
  }

  goToPreviousStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.resetStepState();
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
      this.quizSubmitted = true; // Use this to show submission confirmation
    }
  }

  private resetStepState(): void {
    this.quizSubmitted = false;
    this.quizResult = null;
    this.textInput = '';
    this.recordingComplete = false;
  }
}
