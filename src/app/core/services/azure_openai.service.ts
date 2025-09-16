// src/app/core/services/azure-openai.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

// Define interfaces in the same file to avoid import issues
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface ConversationSession {
  id: string;
  title: string;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  scenario: string;
  messages: ChatMessage[];
  startTime: Date;
  lastActivity: Date;
}

export interface LanguageCorrection {
  original: string;
  corrected: string;
  explanation: string;
  type: 'grammar' | 'vocabulary' | 'pronunciation' | 'style';
}

@Injectable({
  providedIn: 'root'
})
export class AzureOpenAIService {
  // Use inject() function instead of constructor injection to avoid circular deps
  private http = inject(HttpClient);

  // Configuration - will be set via initialize method
  private apiUrl = '';
  private apiKey = '';
  private deploymentName = '';
  private readonly apiVersion = '2024-02-15-preview';

  // State management
  private currentSessionSubject = new BehaviorSubject<ConversationSession | null>(null);
  private isTypingSubject = new BehaviorSubject<boolean>(false);
  
  public currentSession$ = this.currentSessionSubject.asObservable();
  public isTyping$ = this.isTypingSubject.asObservable();

  // Conversation scenarios
  public scenarios = [
    {
      id: 'job-interview',
      title: 'Job Interview',
      description: 'Practice professional interview conversations',
      difficulty: 'intermediate' as const,
      systemPrompt: 'You are a friendly HR interviewer conducting a job interview. Ask relevant questions about the candidate\'s experience, skills, and motivations. Provide helpful feedback on their English usage and suggest improvements in a supportive way.'
    },
    {
      id: 'restaurant',
      title: 'Restaurant Ordering',
      description: 'Learn to order food and interact with restaurant staff',
      difficulty: 'beginner' as const,
      systemPrompt: 'You are a friendly restaurant server. Help the customer order food, answer questions about the menu, and make recommendations. Gently correct any English mistakes and teach useful restaurant vocabulary.'
    },
    {
      id: 'business-meeting',
      title: 'Business Meeting',
      description: 'Participate in professional business discussions',
      difficulty: 'advanced' as const,
      systemPrompt: 'You are a business colleague in a professional meeting. Discuss projects, share ideas, and collaborate on solutions. Provide feedback on business English usage and suggest more professional expressions when appropriate.'
    },
    {
      id: 'casual-chat',
      title: 'Casual Conversation',
      description: 'Have everyday conversations about various topics',
      difficulty: 'beginner' as const,
      systemPrompt: 'You are a friendly conversation partner. Chat about everyday topics like hobbies, weather, family, and interests. Help improve conversational English by gently correcting mistakes and teaching common expressions.'
    },
    {
      id: 'travel',
      title: 'Travel Scenarios',
      description: 'Navigate travel situations like airports, hotels, and tourism',
      difficulty: 'intermediate' as const,
      systemPrompt: 'You are helping someone navigate travel situations. Role-play as hotel staff, airport personnel, or tour guides. Teach travel-related vocabulary and help with practical English for travelers.'
    }
  ];

  /**
   * Initialize the service with configuration
   */
  initialize(config: { endpoint: string; apiKey: string; deploymentName: string }): void {
    this.apiUrl = config.endpoint;
    this.apiKey = config.apiKey;
    this.deploymentName = config.deploymentName;
  }

  /**
   * Start a new conversation session
   */
  startNewSession(scenarioId: string, userLanguage: string = 'English'): ConversationSession {
    const scenario = this.scenarios.find(s => s.id === scenarioId);
    if (!scenario) {
      throw new Error('Scenario not found');
    }

    const session: ConversationSession = {
      id: this.generateId(),
      title: scenario.title,
      language: userLanguage,
      difficulty: scenario.difficulty,
      scenario: scenarioId,
      messages: [],
      startTime: new Date(),
      lastActivity: new Date()
    };

    // Add system message
    const systemMessage: ChatMessage = {
      id: this.generateId(),
      role: 'system',
      content: scenario.systemPrompt + ` The user is learning English and their native language is ${userLanguage}. Be patient, encouraging, and provide gentle corrections when needed.`,
      timestamp: new Date()
    };

    session.messages.push(systemMessage);

    // Add welcome message
    const welcomeMessage: ChatMessage = {
      id: this.generateId(),
      role: 'assistant',
      content: this.getWelcomeMessage(scenario),
      timestamp: new Date()
    };

    session.messages.push(welcomeMessage);
    this.currentSessionSubject.next(session);
    
    return session;
  }

  /**
   * Send a message to Azure OpenAI and get response
   */
  async sendMessage(content: string): Promise<ChatMessage> {
    const currentSession = this.currentSessionSubject.value;
    if (!currentSession) {
      throw new Error('No active session');
    }

    if (!this.apiUrl || !this.apiKey || !this.deploymentName) {
      throw new Error('Service not initialized. Call initialize() first.');
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: this.generateId(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    currentSession.messages.push(userMessage);
    currentSession.lastActivity = new Date();
    this.currentSessionSubject.next(currentSession);

    // Show typing indicator
    this.isTypingSubject.next(true);

    try {
      // Prepare messages for API call (exclude system message from API call)
      const apiMessages = currentSession.messages
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      // Add system message for context
      const systemPrompt = currentSession.messages.find(msg => msg.role === 'system')?.content || '';
      
      const requestBody = {
        messages: [
          { role: 'system', content: systemPrompt },
          ...apiMessages
        ],
        max_tokens: 500,
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.3,
        presence_penalty: 0.3
      };

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'api-key': this.apiKey
      });

      const response = await this.http.post<any>(
        `${this.apiUrl}/openai/deployments/${this.deploymentName}/chat/completions?api-version=${this.apiVersion}`,
        requestBody,
        { headers }
      ).toPromise();

      // Create assistant message
      const assistantMessage: ChatMessage = {
        id: this.generateId(),
        role: 'assistant',
        content: response.choices[0].message.content,
        timestamp: new Date()
      };

      // Update session
      currentSession.messages.push(assistantMessage);
      currentSession.lastActivity = new Date();
      this.currentSessionSubject.next(currentSession);

      this.isTypingSubject.next(false);
      return assistantMessage;

    } catch (error) {
      this.isTypingSubject.next(false);
      console.error('Error sending message:', error);
      throw new Error('Failed to send message. Please try again.');
    }
  }

  /**
   * Get language corrections and suggestions
   */
  async getLanguageCorrections(text: string): Promise<LanguageCorrection[]> {
    if (!this.apiUrl || !this.apiKey || !this.deploymentName) {
      throw new Error('Service not initialized');
    }

    try {
      const correctionPrompt = `
        Analyze the following English text for grammar, vocabulary, and style improvements. 
        Provide specific corrections in JSON format with the following structure:
        [
          {
            "original": "original text",
            "corrected": "corrected text", 
            "explanation": "explanation of the correction",
            "type": "grammar|vocabulary|pronunciation|style"
          }
        ]
        
        Text to analyze: "${text}"
        
        Only provide corrections if there are actual errors or significant improvements to be made.
      `;

      const requestBody = {
        messages: [
          { role: 'user', content: correctionPrompt }
        ],
        max_tokens: 400,
        temperature: 0.3
      };

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'api-key': this.apiKey
      });

      const response = await this.http.post<any>(
        `${this.apiUrl}/openai/deployments/${this.deploymentName}/chat/completions?api-version=${this.apiVersion}`,
        requestBody,
        { headers }
      ).toPromise();

      try {
        const corrections = JSON.parse(response.choices[0].message.content);
        return Array.isArray(corrections) ? corrections : [];
      } catch (parseError) {
        console.error('Error parsing corrections:', parseError);
        return [];
      }

    } catch (error) {
      console.error('Error getting corrections:', error);
      return [];
    }
  }

  /**
   * Get conversation summary and feedback
   */
  async getConversationSummary(): Promise<string> {
    const currentSession = this.currentSessionSubject.value;
    if (!currentSession) {
      return '';
    }

    if (!this.apiUrl || !this.apiKey || !this.deploymentName) {
      return 'Service not initialized';
    }

    const conversationText = currentSession.messages
      .filter(msg => msg.role !== 'system')
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');

    const summaryPrompt = `
      Provide a helpful summary of this English conversation practice session. Include:
      1. Main topics discussed
      2. Language skills demonstrated
      3. Areas for improvement
      4. Positive feedback and encouragement
      5. Suggestions for future practice
      
      Conversation:
      ${conversationText}
    `;

    try {
      const requestBody = {
        messages: [
          { role: 'user', content: summaryPrompt }
        ],
        max_tokens: 300,
        temperature: 0.5
      };

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'api-key': this.apiKey
      });

      const response = await this.http.post<any>(
        `${this.apiUrl}/openai/deployments/${this.deploymentName}/chat/completions?api-version=${this.apiVersion}`,
        requestBody,
        { headers }
      ).toPromise();

      return response.choices[0].message.content;

    } catch (error) {
      console.error('Error getting summary:', error);
      return 'Unable to generate conversation summary.';
    }
  }

  /**
   * Clear current session
   */
  clearSession(): void {
    this.currentSessionSubject.next(null);
    this.isTypingSubject.next(false);
  }

  /**
   * Get current session
   */
  getCurrentSession(): ConversationSession | null {
    return this.currentSessionSubject.value;
  }

  /**
   * Generate welcome message based on scenario
   */
  private getWelcomeMessage(scenario: any): string {
    const welcomeMessages: { [key: string]: string } = {
      'job-interview': "Hello! I'm excited to interview you today. Please tell me a bit about yourself and why you're interested in this position.",
      'restaurant': "Welcome to our restaurant! I'm your server today. Would you like to see our menu, or do you have any questions about our dishes?",
      'business-meeting': "Good morning! Thank you for joining today's meeting. Let's start by discussing our current project status. What updates do you have?",
      'casual-chat': "Hi there! It's nice to meet you. How are you doing today? What would you like to chat about?",
      'travel': "Welcome! I'm here to help you with your travel needs. Are you looking for information about flights, accommodations, or local attractions?"
    };

    return welcomeMessages[scenario.id] || "Hello! I'm here to help you practice your English. What would you like to talk about?";
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}