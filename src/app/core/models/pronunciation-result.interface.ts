// src/app/core/models/pronunciation-result.interface.ts
export interface PronunciationResult {
  accuracy: number;
  fluency: number;
  completeness: number;
  pronunciation: number;
  wordScores: WordScore[];
  suggestions: string[];
  overallScore: number;
  recognizedText?: string;
}

export interface WordScore {
  word: string;
  accuracy: number;
  errorType: 'none' | 'omission' | 'insertion' | 'mispronunciation';
  phonemeScores?: PhonemeScore[];
}


export interface PhonemeScore {
  phoneme: string;
  accuracy: number;
}

// src/app/core/models/speech-config.interface.ts
export interface SpeechConfig {
  subscriptionKey: string;
  region: string;
  language: string;
  pronunciationAssessmentConfig?: PronunciationAssessmentConfig;
}

export interface PronunciationAssessmentConfig {
  referenceText: string;
  gradingSystem: 'FivePoint' | 'HundredMark';
  granularity: 'Phoneme' | 'Word' | 'FullText';
  enableMiscue: boolean;
}

export interface AudioConfig {
  sampleRate?: number;
  channels?: number;
  bitsPerSample?: number;
}

// src/app/core/models/challenge.interface.ts
export interface Challenge {
  id: string;
  type: 'presentation' | 'networking' | 'collaboration' | 'conversation';
  prompt: string;
  keywords: string[];
  referenceText: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  expectedDuration: number; // in seconds
  minScore?: number;
}

export interface Location {
  id: string;
  name: string;
  icon: string;
  description: string;
  scenarios: string[];
  difficulty: string;
  points: number;
  time: string;
  challenge: Challenge;
}