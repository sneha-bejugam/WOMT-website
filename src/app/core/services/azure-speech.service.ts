// src/app/core/services/azure-speech.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { 
  PronunciationResult, 
  SpeechConfig, 
  WordScore
} from '../models/pronunciation-result.interface';

@Injectable({
  providedIn: 'root'
})
export class AzureSpeechService {
  private speechConfig: sdk.SpeechConfig | null = null; // Fix: Initialize as null
  private recognizer: sdk.SpeechRecognizer | null = null;
  private isInitialized = false;

  // Observables for real-time feedback
  private recordingStateSubject = new BehaviorSubject<'idle' | 'recording' | 'processing'>('idle');
  private audioLevelSubject = new Subject<number>();
  
  public recordingState$ = this.recordingStateSubject.asObservable();
  public audioLevel$ = this.audioLevelSubject.asObservable();

  constructor() {}

  /**
   * Initialize the Azure Speech Service with credentials
   */
  initialize(config: SpeechConfig): void {
    try {
      this.speechConfig = sdk.SpeechConfig.fromSubscription(
        config.subscriptionKey,
        config.region
      );
      this.speechConfig.speechRecognitionLanguage = config.language || 'en-US';
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Azure Speech Service:', error);
      throw new Error('Azure Speech Service initialization failed');
    }
  }

  /**
   * Check if the service is properly initialized
   */
  isServiceReady(): boolean {
    return this.isInitialized && this.speechConfig !== null;
  }

  /**
   * Start pronunciation assessment
   */
  async startPronunciationAssessment(
    referenceText: string,
    keywords: string[] = []
  ): Promise<PronunciationResult> {
    if (!this.isInitialized || !this.speechConfig) {
      throw new Error('Azure Speech Service not initialized');
    }

    return new Promise((resolve, reject) => {
      try {
        this.recordingStateSubject.next('recording');

        // Configure audio input
        const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
        
        // Configure pronunciation assessment
        const pronunciationConfig = new sdk.PronunciationAssessmentConfig(
          referenceText,
          sdk.PronunciationAssessmentGradingSystem.HundredMark,
          sdk.PronunciationAssessmentGranularity.Phoneme,
          true // Enable miscue assessment
        );

        // Create speech recognizer
        this.recognizer = new sdk.SpeechRecognizer(this.speechConfig!, audioConfig);
        
        // Apply pronunciation assessment configuration
        pronunciationConfig.applyTo(this.recognizer);

        // Handle intermediate results (real-time feedback)
        this.recognizer.recognizing = (s, e) => {
          // You can provide real-time feedback here if needed
          console.log('Recognizing:', e.result.text);
        };

        // Handle final results
        this.recognizer.recognized = (s, e) => {
          this.recordingStateSubject.next('processing');
          
          if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
            try {
              const pronunciationResult = sdk.PronunciationAssessmentResult.fromResult(e.result);
              
              const result: PronunciationResult = {
                accuracy: Math.round(pronunciationResult.accuracyScore || 0),
                fluency: Math.round(pronunciationResult.fluencyScore || 0),
                completeness: Math.round(pronunciationResult.completenessScore || 0),
                pronunciation: Math.round(pronunciationResult.pronunciationScore || 0),
                overallScore: Math.round(
                  ((pronunciationResult.accuracyScore || 0) + 
                   (pronunciationResult.fluencyScore || 0) + 
                   (pronunciationResult.pronunciationScore || 0)) / 3
                ),
                wordScores: this.extractWordScores(e.result),
                suggestions: this.generateSuggestions(pronunciationResult, keywords, e.result.text),
                recognizedText: e.result.text
              };

              this.recordingStateSubject.next('idle');
              resolve(result);
            } catch (error) {
              this.recordingStateSubject.next('idle');
              reject(new Error('Failed to process pronunciation assessment results'));
            }
          } else {
            this.recordingStateSubject.next('idle');
            reject(new Error('Speech not recognized clearly. Please try again.'));
          }
        };

        // Handle errors
        this.recognizer.canceled = (s, e) => {
          this.recordingStateSubject.next('idle');
          
          if (e.reason === sdk.CancellationReason.Error) {
            reject(new Error(`Recognition failed: ${e.errorDetails}`));
          } else {
            reject(new Error('Recognition was canceled'));
          }
        };

        // Handle session events
        this.recognizer.sessionStarted = (s, e) => {
          console.log('Recognition session started');
        };

        this.recognizer.sessionStopped = (s, e) => {
          console.log('Recognition session stopped');
          this.recordingStateSubject.next('idle');
        };

        // Start recognition
        this.recognizer.recognizeOnceAsync(
          (result) => {
            // This callback is also called, but we handle results in the 'recognized' event
          },
          (error) => {
            this.recordingStateSubject.next('idle');
            reject(new Error(`Recognition failed: ${error}`));
          }
        );

      } catch (error) {
        this.recordingStateSubject.next('idle');
        reject(error);
      }
    });
  }

  /**
   * Stop current recording/recognition
   */
  stopRecording(): void {
    if (this.recognizer) {
      this.recognizer.stopContinuousRecognitionAsync(
        () => {
          this.recognizer?.close();
          this.recognizer = null;
          this.recordingStateSubject.next('idle');
        },
        (error) => {
          console.error('Error stopping recognition:', error);
          this.recordingStateSubject.next('idle');
        }
      );
    }
  }

  /**
   * Extract word-level scores from recognition result
   */
  private extractWordScores(result: sdk.SpeechRecognitionResult): WordScore[] {
    const wordScores: WordScore[] = [];
    
    try {
      const pronunciationResult = sdk.PronunciationAssessmentResult.fromResult(result);
      // Fix: Use 'Words' instead of 'words' (capital W)
      const words = pronunciationResult.detailResult?.Words || [];
      
      // Fix: Add proper typing for word parameter
      words.forEach((word: any) => {
        let errorType: 'none' | 'omission' | 'insertion' | 'mispronunciation' = 'none';
        
        // Map Azure error types to our interface
        if (word.errorType) {
          switch (word.errorType.toLowerCase()) {
            case 'omission':
              errorType = 'omission';
              break;
            case 'insertion':
              errorType = 'insertion';
              break;
            case 'mispronunciation':
              errorType = 'mispronunciation';
              break;
            default:
              errorType = 'none';
          }
        }

        wordScores.push({
          word: word.Word || '',
          accuracy: Math.round(word.AccuracyScore || 0),
          errorType
        });
      });
    } catch (error) {
      console.warn('Could not extract detailed word scores:', error);
    }

    return wordScores;
  }

  /**
   * Generate improvement suggestions based on assessment results
   */
  private generateSuggestions(
    result: sdk.PronunciationAssessmentResult,
    keywords: string[],
    recognizedText: string
  ): string[] {
    const suggestions: string[] = [];

    // Accuracy-based suggestions
    if ((result.accuracyScore || 0) < 70) {
      suggestions.push('Focus on clearer articulation of consonants and vowels');
    }

    // Fluency-based suggestions
    if ((result.fluencyScore || 0) < 70) {
      suggestions.push('Try to maintain a steady pace and reduce hesitations');
      suggestions.push('Practice speaking in longer phrases without pauses');
    }

    // Completeness-based suggestions
    if ((result.completenessScore || 0) < 80) {
      suggestions.push('Include more content and speak for a longer duration');
    }

    // Overall pronunciation suggestions
    if ((result.pronunciationScore || 0) < 75) {
      suggestions.push('Practice pronunciation of business terminology');
      suggestions.push('Consider using pronunciation training apps for difficult sounds');
    }

    // Keyword usage analysis
    if (keywords.length > 0 && recognizedText) {
      const recognizedLower = recognizedText.toLowerCase();
      const missingKeywords = keywords.filter(keyword => 
        !recognizedLower.includes(keyword.toLowerCase())
      );

      if (missingKeywords.length > 0) {
        suggestions.push(`Try to include these key terms: ${missingKeywords.join(', ')}`);
      }

      // Check if keywords were used naturally
      const usedKeywords = keywords.filter(keyword => 
        recognizedLower.includes(keyword.toLowerCase())
      );
      
      if (usedKeywords.length > 0 && usedKeywords.length === keywords.length) {
        suggestions.push('Great job including all key terms! Focus on using them more naturally in context.');
      }
    }

    // If no specific issues found, provide general encouragement
    if (suggestions.length === 0) {
      suggestions.push('Excellent pronunciation! Keep practicing to maintain your skills.');
    }

    return suggestions;
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    this.stopRecording();
    this.recordingStateSubject.complete();
    this.audioLevelSubject.complete();
  }
}
