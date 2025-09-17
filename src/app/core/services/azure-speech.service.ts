// src/app/core/services/azure-speech.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // --- CHANGED ---
import { Observable, Subject, BehaviorSubject, lastValueFrom } from 'rxjs'; // --- CHANGED ---
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

import { 
  PronunciationResult, 
  // --- CHANGED ---: Your config no longer needs the subscriptionKey
  SpeechConfig, 
  WordScore
} from '../models/pronunciation-result.interface'; 

@Injectable()
export class AzureSpeechService {
  private speechConfig: sdk.SpeechConfig | null = null;
  private recognizer: sdk.SpeechRecognizer | null = null;
  private isInitialized = false;

  // --- CHANGED ---: Added the URL for your Netlify Function
  private tokenUrl = '/.netlify/functions/get-speech-token';

  // Observables for real-time feedback
  private recordingStateSubject = new BehaviorSubject<'idle' | 'recording' | 'processing'>('idle');
  private audioLevelSubject = new Subject<number>();
  
  public recordingState$ = this.recordingStateSubject.asObservable();
  public audioLevel$ = this.audioLevelSubject.asObservable();

  // --- CHANGED ---: Injected HttpClient to call your backend
  constructor(private http: HttpClient) {}

  /**
   * Initialize the Azure Speech Service by fetching a temporary token
   */
  // --- CHANGED ---: This function is now async and fetches its own token
  async initialize(config: { region: string; language?: string }): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      // 1. Call your Netlify Function to get a token
      const token = await lastValueFrom(
        this.http.get(this.tokenUrl, { responseType: 'text' })
      );

      if (!token) {
        throw new Error('Received an empty token from the server');
      }

      // 2. Initialize the SDK using the *token*, not the secret key
      this.speechConfig = sdk.SpeechConfig.fromAuthorizationToken(
        token,
        config.region
      );
      this.speechConfig.speechRecognitionLanguage = config.language || 'en-US';
      this.isInitialized = true;
      console.log('Azure Speech Service initialized successfully.');

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
  /**
 * Start pronunciation assessment with continuous recording
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

      // Store the resolve/reject functions for manual stop
      (this.recognizer as any)._resolveFunction = resolve;
      (this.recognizer as any)._rejectFunction = reject;

      // Handle intermediate results (real-time feedback)
      this.recognizer.recognizing = (s, e) => {
        console.log('Recognizing:', e.result.text);
      };

      // Handle final results - but don't auto-resolve, wait for manual stop
      this.recognizer.recognized = (s, e) => {
        if (e.result.reason === sdk.ResultReason.RecognizedSpeech && e.result.text.trim()) {
          console.log('Recognized text:', e.result.text);
          // Store the latest result but don't resolve yet
          (this.recognizer as any)._latestResult = e.result;
        }
      };

      // Handle errors
      this.recognizer.canceled = (s, e) => {
        this.recordingStateSubject.next('idle');
        
        if (e.reason === sdk.CancellationReason.Error) {
          reject(new Error(`Recognition failed: ${e.errorDetails}`));
        } else {
          // If cancelled by user (manual stop), process the latest result
          this.processLatestResult(resolve, reject, referenceText, keywords);
        }
      };

      // Handle session events
      this.recognizer.sessionStarted = (s, e) => {
        console.log('Recognition session started - speak now, click stop when finished');
      };

      this.recognizer.sessionStopped = (s, e) => {
        console.log('Recognition session stopped');
        // Process the latest result when session stops
        this.processLatestResult(resolve, reject, referenceText, keywords);
      };

      // Start continuous recognition (not recognizeOnceAsync)
      this.recognizer.startContinuousRecognitionAsync(
        () => {
          console.log('Continuous recognition started');
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
 * Process the latest recognition result
 */
private processLatestResult(
  resolve: (value: PronunciationResult) => void, 
  reject: (reason?: any) => void,
  referenceText: string,
  keywords: string[]
): void {
  try {
    const latestResult = (this.recognizer as any)?._latestResult;
    
    if (latestResult && latestResult.text.trim()) {
      this.recordingStateSubject.next('processing');
      
      const pronunciationResult = sdk.PronunciationAssessmentResult.fromResult(latestResult);
      
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
        wordScores: this.extractWordScores(latestResult),
        suggestions: this.generateSuggestions(pronunciationResult, keywords, latestResult.text),
        recognizedText: latestResult.text
      };

      this.recordingStateSubject.next('idle');
      resolve(result);
    } else {
      this.recordingStateSubject.next('idle');
      reject(new Error('No speech was recognized. Please try again.'));
    }
  } catch (error) {
    this.recordingStateSubject.next('idle');
    reject(new Error('Failed to process pronunciation assessment results'));
  }
}

/**
 * Stop current recording/recognition and process results
 */
stopRecording(): void {
  if (this.recognizer) {
    this.recordingStateSubject.next('processing');
    
    // Stop continuous recognition
    this.recognizer.stopContinuousRecognitionAsync(
      () => {
        console.log('Recording stopped by user');
        // The sessionStopped event will handle result processing
      },
      (error) => {
        console.error('Error stopping recognition:', error);
        this.recordingStateSubject.next('idle');
        
        // Try to reject the promise if it exists
        const rejectFn = (this.recognizer as any)?._rejectFunction;
        if (rejectFn) {
          rejectFn(new Error('Failed to stop recording properly'));
        }
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
      const words = pronunciationResult.detailResult?.Words || [];
      
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
   * (This logic is unchanged)
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