// src/app/pages/language-translator/language-translator.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { Subscription } from 'rxjs';

// Import UI Components
import { ButtonComponent } from '../../components/ui/button/button.component';
import { CardComponent } from '../../components/ui/card/card.component';
import { CardContentComponent } from '../../components/ui/card/card-content/card-content.component';

// Import Services
import { AzureSpeechTranslatorService, TranslationResult, SupportedLanguage } from '../../core/services/azure-speech-translator.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-language-translator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FeatherModule,
    ButtonComponent,
    CardComponent,
    CardContentComponent
  ],
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class LanguageTranslatorComponent implements OnInit, OnDestroy {
  // Component state
  selectedLanguage: string = ''; // Default to empty (no language selected)
  recordingState: 'idle' | 'recording' | 'processing' | 'speaking' = 'idle';
  translationResult: TranslationResult | null = null;
  supportedLanguages: SupportedLanguage[] = [];
  
  // UI state
  showLanguageDropdown = false;
  hasError = false;
  errorMessage = '';
  
  private subscriptions = new Subscription();

  constructor(private translatorService: AzureSpeechTranslatorService) {}

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdownContainer = target.closest('.dropdown-container');
    if (!dropdownContainer) {
      this.showLanguageDropdown = false;
    }
  }

  ngOnInit(): void {
    try {
      // Initialize the translation service
      this.translatorService.initialize({
        subscriptionKey: environment.azureSpeech.subscriptionKey,
        region: environment.azureSpeech.region,
        language: 'en-US'
      });

      // Get supported languages
      this.supportedLanguages = this.translatorService.supportedLanguages;

      // Subscribe to recording state changes
      this.subscriptions.add(
        this.translatorService.recordingState$.subscribe(state => {
          this.recordingState = state;
        })
      );

      // Subscribe to translation results
      this.subscriptions.add(
        this.translatorService.translationResult$.subscribe(result => {
          this.translationResult = result;
          if (result) {
            this.hasError = false;
          }
        })
      );

    } catch (error) {
      console.error('Failed to initialize translator:', error);
      this.showError('Failed to initialize speech translation service. Please check your configuration.');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.translatorService.dispose();
  }

  // Getters for template
  get isRecording(): boolean {
    return this.recordingState === 'recording';
  }

  get isProcessing(): boolean {
    return this.recordingState === 'processing';
  }

  get isSpeaking(): boolean {
    return this.recordingState === 'speaking';
  }

  get isIdle(): boolean {
    return this.recordingState === 'idle';
  }

  get selectedLanguageName(): string {
    if (!this.selectedLanguage) {
      return 'Select your native language';
    }
    return this.translatorService.getLanguageName(this.selectedLanguage);
  }

  get hasLanguageSelected(): boolean {
    return this.selectedLanguage !== '';
  }

  // Recording methods
  async startRecording(): Promise<void> {
    if (!this.hasLanguageSelected) {
      this.showError('Please select your native language first.');
      return;
    }

    if (!this.translatorService.isServiceReady()) {
      this.showError('Translation service not ready. Please refresh and try again.');
      return;
    }

    try {
      this.clearError();
      await this.translatorService.startTranslation(this.selectedLanguage);
    } catch (error) {
      console.error('Failed to start recording:', error);
      this.showError('Failed to start recording. Please check your microphone permissions.');
    }
  }

  stopRecording(): void {
    this.translatorService.stopRecording();
  }

  // Translation methods
  async repeatTranslation(): Promise<void> {
    try {
      await this.translatorService.repeatLastTranslation();
    } catch (error) {
      console.error('Failed to repeat translation:', error);
      this.showError('Failed to play translation audio.');
    }
  }

  clearResults(): void {
    this.translatorService.clearResults();
    this.translationResult = null;
    this.clearError();
  }

  // Language selection methods
  selectLanguage(languageCode: string): void {
    this.selectedLanguage = languageCode;
    this.showLanguageDropdown = false;
    this.clearResults(); // Clear previous results when language changes
    this.clearError();
    console.log('Selected language:', languageCode);
  }

  toggleLanguageDropdown(): void {
    if (this.isIdle) {
      this.showLanguageDropdown = !this.showLanguageDropdown;
    }
  }

  // Error handling
  private showError(message: string): void {
    this.hasError = true;
    this.errorMessage = message;
  }

  private clearError(): void {
    this.hasError = false;
    this.errorMessage = '';
  }

  // Utility methods
  getRecordingStatusText(): string {
    if (!this.hasLanguageSelected) {
      return 'Please select your native language to start';
    }

    switch (this.recordingState) {
      case 'recording':
        return `Recording in ${this.selectedLanguageName}...`;
      case 'processing':
        return 'Translating to English...';
      case 'speaking':
        return 'Playing English translation...';
      default:
        return `Ready to record in ${this.selectedLanguageName.split('(')[0].trim()}`;
    }
  }

  getRecordingStatusClass(): string {
    if (!this.hasLanguageSelected) {
      return 'text-gray-400';
    }

    switch (this.recordingState) {
      case 'recording':
        return 'text-red-600';
      case 'processing':
        return 'text-yellow-600';
      case 'speaking':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  }

  // TrackBy function for better performance with ngFor
  trackByLanguageCode(index: number, language: SupportedLanguage): string {
    return language.code;
  }
}