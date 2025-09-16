// src/app/core/services/azure-speech-translator.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { SpeechConfig } from '../models/pronunciation-result.interface';

export interface TranslationResult {
  originalText: string;
  originalLanguage: string;
  translatedText: string;
  targetLanguage: string;
  confidence: number;
}

export interface SupportedLanguage {
  code: string;
  name: string;
  displayName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AzureSpeechTranslatorService {
  private speechConfig: sdk.SpeechTranslationConfig | null = null;
  private translationRecognizer: sdk.TranslationRecognizer | null = null;
  private speechSynthesizer: sdk.SpeechSynthesizer | null = null;
  private isInitialized = false;

  // State management
  private recordingStateSubject = new BehaviorSubject<'idle' | 'recording' | 'processing' | 'speaking'>('idle');
  private translationResultSubject = new BehaviorSubject<TranslationResult | null>(null);
  
  public recordingState$ = this.recordingStateSubject.asObservable();
  public translationResult$ = this.translationResultSubject.asObservable();

  // Supported languages for translation
  public supportedLanguages: SupportedLanguage[] = [
    { code: 'hi-IN', name: 'Hindi', displayName: 'हिन्दी (Hindi)' },
    { code: 'es-ES', name: 'Spanish', displayName: 'Español (Spanish)' },
    { code: 'fr-FR', name: 'French', displayName: 'Français (French)' },
    { code: 'de-DE', name: 'German', displayName: 'Deutsch (German)' },
    { code: 'it-IT', name: 'Italian', displayName: 'Italiano (Italian)' },
    { code: 'pt-BR', name: 'Portuguese', displayName: 'Português (Portuguese)' },
    { code: 'ru-RU', name: 'Russian', displayName: 'Русский (Russian)' },
    { code: 'ja-JP', name: 'Japanese', displayName: '日本語 (Japanese)' },
    { code: 'ko-KR', name: 'Korean', displayName: '한국어 (Korean)' },
    { code: 'zh-CN', name: 'Chinese', displayName: '中文 (Chinese)' },
    { code: 'ar-SA', name: 'Arabic', displayName: 'العربية (Arabic)' },
    { code: 'th-TH', name: 'Thai', displayName: 'ไทย (Thai)' },
    { code: 'vi-VN', name: 'Vietnamese', displayName: 'Tiếng Việt (Vietnamese)' },
    { code: 'nl-NL', name: 'Dutch', displayName: 'Nederlands (Dutch)' },
    { code: 'sv-SE', name: 'Swedish', displayName: 'Svenska (Swedish)' }
  ];

  constructor() {}

  /**
   * Initialize the Azure Speech Translation Service
   */
  initialize(config: SpeechConfig): void {
    try {
      // Initialize translation config
      this.speechConfig = sdk.SpeechTranslationConfig.fromSubscription(
        config.subscriptionKey,
        config.region
      );

      // Set default source language (will be changed dynamically)
      this.speechConfig.speechRecognitionLanguage = 'hi-IN'; // Default to Hindi
      
      // Add English as target language
      this.speechConfig.addTargetLanguage('en');

      // Initialize speech synthesis config for English TTS
      const synthConfig = sdk.SpeechConfig.fromSubscription(
        config.subscriptionKey,
        config.region
      );
      synthConfig.speechSynthesisLanguage = 'en-US';
      synthConfig.speechSynthesisVoiceName = 'en-US-JennyNeural'; // High-quality neural voice
      
      const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
      this.speechSynthesizer = new sdk.SpeechSynthesizer(synthConfig, audioConfig);

      this.isInitialized = true;
      console.log('Azure Speech Translation Service initialized successfully');

    } catch (error) {
      console.error('Failed to initialize Azure Speech Translation Service:', error);
      throw new Error('Azure Speech Translation Service initialization failed');
    }
  }

  /**
   * Check if the service is ready
   */
  isServiceReady(): boolean {
    return this.isInitialized && this.speechConfig !== null;
  }

  /**
   * Start recording and translating speech
   */
  async startTranslation(sourceLanguage: string): Promise<void> {
    if (!this.isServiceReady()) {
      throw new Error('Translation service not initialized');
    }

    try {
      this.recordingStateSubject.next('recording');
      
      // Update source language
      this.speechConfig!.speechRecognitionLanguage = sourceLanguage;
      
      // Configure audio input
      const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
      
      // Create translation recognizer
      this.translationRecognizer = new sdk.TranslationRecognizer(this.speechConfig!, audioConfig);

      // Handle translation results
      this.translationRecognizer.recognized = (s, e) => {
        if (e.result.reason === sdk.ResultReason.TranslatedSpeech) {
          const originalText = e.result.text;
          const translatedText = e.result.translations.get('en') || '';
          
          if (originalText && translatedText) {
            const result: TranslationResult = {
              originalText,
              originalLanguage: sourceLanguage,
              translatedText,
              targetLanguage: 'en-US',
              confidence: 0.95 // Azure doesn't provide confidence for translation
            };

            this.translationResultSubject.next(result);
            this.recordingStateSubject.next('processing');
            
            // Auto-speak the translation
            this.speakTranslation(translatedText);
          }
        } else if (e.result.reason === sdk.ResultReason.NoMatch) {
          console.log('No speech was recognized');
          this.recordingStateSubject.next('idle');
        }
      };

      // Handle errors
      this.translationRecognizer.canceled = (s, e) => {
        console.error(`Translation canceled: ${e.errorDetails}`);
        this.recordingStateSubject.next('idle');
        
        if (e.reason === sdk.CancellationReason.Error) {
          throw new Error(`Translation failed: ${e.errorDetails}`);
        }
      };

      // Start continuous recognition
      this.translationRecognizer.startContinuousRecognitionAsync(
        () => {
          console.log('Translation recognition started');
        },
        (error) => {
          console.error('Failed to start translation:', error);
          this.recordingStateSubject.next('idle');
          throw new Error(`Failed to start translation: ${error}`);
        }
      );

    } catch (error) {
      this.recordingStateSubject.next('idle');
      throw error;
    }
  }

  /**
   * Stop recording
   */
  stopRecording(): void {
    if (this.translationRecognizer) {
      this.translationRecognizer.stopContinuousRecognitionAsync(
        () => {
          this.translationRecognizer?.close();
          this.translationRecognizer = null;
          this.recordingStateSubject.next('idle');
          console.log('Translation recording stopped');
        },
        (error) => {
          console.error('Error stopping translation:', error);
          this.recordingStateSubject.next('idle');
        }
      );
    }
  }

  /**
   * Speak the translated text using text-to-speech
   */
  async speakTranslation(text: string): Promise<void> {
    if (!this.speechSynthesizer || !text) {
      return;
    }

    try {
      this.recordingStateSubject.next('speaking');

      return new Promise((resolve, reject) => {
        this.speechSynthesizer!.speakTextAsync(
          text,
          (result) => {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
              console.log('Speech synthesis completed');
              this.recordingStateSubject.next('idle');
              resolve();
            } else {
              console.error('Speech synthesis failed:', result.errorDetails);
              this.recordingStateSubject.next('idle');
              reject(new Error(result.errorDetails));
            }
          },
          (error) => {
            console.error('Speech synthesis error:', error);
            this.recordingStateSubject.next('idle');
            reject(error);
          }
        );
      });

    } catch (error) {
      console.error('Error in text-to-speech:', error);
      this.recordingStateSubject.next('idle');
      throw error;
    }
  }

  /**
   * Repeat the last translation audio
   */
  async repeatLastTranslation(): Promise<void> {
    const lastResult = this.translationResultSubject.value;
    if (lastResult?.translatedText) {
      await this.speakTranslation(lastResult.translatedText);
    }
  }

  /**
   * Clear translation results
   */
  clearResults(): void {
    this.translationResultSubject.next(null);
  }

  /**
   * Get current recording state
   */
  getCurrentState(): 'idle' | 'recording' | 'processing' | 'speaking' {
    return this.recordingStateSubject.value;
  }

  /**
   * Get language name by code
   */
  getLanguageName(code: string): string {
    const lang = this.supportedLanguages.find(l => l.code === code);
    return lang ? lang.displayName : code;
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    this.stopRecording();
    
    if (this.speechSynthesizer) {
      this.speechSynthesizer.close();
      this.speechSynthesizer = null;
    }
    
    this.recordingStateSubject.complete();
    this.translationResultSubject.complete();
  }
  
}