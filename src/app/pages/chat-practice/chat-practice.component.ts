// src/app/pages/ai-conversation/ai-conversation.component.ts
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { Subscription } from 'rxjs';

// Import UI Components
import { ButtonComponent } from '../../components/ui/button/button.component';
import { CardComponent } from '../../components/ui/card/card.component';
import { CardContentComponent } from '../../components/ui/card/card-content/card-content.component';

// Import Services
import { AzureOpenAIService, ChatMessage, ConversationSession, LanguageCorrection } from '../../core/services/azure_openai.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ai-conversation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FeatherModule,
    ButtonComponent,
    CardComponent,
    CardContentComponent
  ],
  templateUrl: './chat-practice.component.html',
  styleUrls: ['./chat-practice.component.css']
})
export class ChatPracticeComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  // Component state
  currentSession: ConversationSession | null = null;
  messages: ChatMessage[] = [];
  isTyping = false;
  messageText = '';
  selectedScenario = '';
  showScenarioSelection = true;
  showCorrections = false;
  corrections: LanguageCorrection[] = [];
  conversationSummary = '';
  showSummary = false;

  // UI state
  hasError = false;
  errorMessage = '';
  isLoading = false;

  private subscriptions = new Subscription();
  private shouldScrollToBottom = false;

  constructor(private openAIService: AzureOpenAIService) {}

  ngOnInit(): void {
    try {
      // Initialize the OpenAI service with configuration
      this.openAIService.initialize({
        endpoint: environment.azureOpenAI.endpoint,
        apiKey: environment.azureOpenAI.apiKey,
        deploymentName: environment.azureOpenAI.deploymentName
      });

      // Subscribe to current session
      this.subscriptions.add(
        this.openAIService.currentSession$.subscribe(session => {
          this.currentSession = session;
          if (session) {
            this.messages = session.messages.filter(msg => msg.role !== 'system');
            this.showScenarioSelection = false;
            this.shouldScrollToBottom = true;
          }
        })
      );

      // Subscribe to typing indicator
      this.subscriptions.add(
        this.openAIService.isTyping$.subscribe(typing => {
          this.isTyping = typing;
          if (typing) {
            this.shouldScrollToBottom = true;
          }
        })
      );

    } catch (error) {
      console.error('Failed to initialize OpenAI service:', error);
      this.showError('Failed to initialize AI conversation service. Please check your configuration.');
    }
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // Scenario selection
  get scenarios() {
    return this.openAIService.scenarios;
  }

  startConversation(scenarioId: string): void {
    try {
      this.clearError();
      this.selectedScenario = scenarioId;
      this.openAIService.startNewSession(scenarioId);
      this.showScenarioSelection = false;
    } catch (error) {
      console.error('Error starting conversation:', error);
      this.showError('Failed to start conversation. Please try again.');
    }
  }

  // Message handling
  async sendMessage(): Promise<void> {
    if (!this.messageText.trim() || this.isTyping) {
      return;
    }

    const message = this.messageText.trim();
    this.messageText = '';

    try {
      this.clearError();
      await this.openAIService.sendMessage(message);
      this.shouldScrollToBottom = true;
      
      // Focus back to input
      setTimeout(() => {
        if (this.messageInput) {
          this.messageInput.nativeElement.focus();
        }
      }, 100);

    } catch (error) {
      console.error('Error sending message:', error);
      this.showError('Failed to send message. Please try again.');
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  // Language corrections
  async getCorrections(message: ChatMessage): Promise<void> {
    if (message.role !== 'user') return;

    try {
      this.isLoading = true;
      this.corrections = await this.openAIService.getLanguageCorrections(message.content);
      this.showCorrections = this.corrections.length > 0;
    } catch (error) {
      console.error('Error getting corrections:', error);
      this.showError('Failed to get language corrections.');
    } finally {
      this.isLoading = false;
    }
  }

  // Conversation management
  async endConversation(): Promise<void> {
    if (!this.currentSession) return;

    try {
      this.isLoading = true;
      this.conversationSummary = await this.openAIService.getConversationSummary();
      this.showSummary = true;
    } catch (error) {
      console.error('Error getting summary:', error);
      this.showError('Failed to generate conversation summary.');
    } finally {
      this.isLoading = false;
    }
  }

  startNewConversation(): void {
    this.openAIService.clearSession();
    this.resetComponent();
  }

  private resetComponent(): void {
    this.messages = [];
    this.messageText = '';
    this.selectedScenario = '';
    this.showScenarioSelection = true;
    this.showCorrections = false;
    this.showSummary = false;
    this.corrections = [];
    this.conversationSummary = '';
    this.clearError();
  }

  // Utility methods
  private scrollToBottom(): void {
    if (this.messagesContainer) {
      const container = this.messagesContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }

  getCorrectionTypeColor(type: string): string {
    switch (type) {
      case 'grammar': return 'text-blue-600 bg-blue-100';
      case 'vocabulary': return 'text-purple-600 bg-purple-100';
      case 'pronunciation': return 'text-orange-600 bg-orange-100';
      case 'style': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
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

  // Chat helpers
  get canSendMessage(): boolean {
    return this.messageText.trim().length > 0 && !this.isTyping && this.currentSession !== null;
  }

  get conversationDuration(): string {
    if (!this.currentSession) return '';
    
    const duration = Date.now() - this.currentSession.startTime.getTime();
    const minutes = Math.floor(duration / 60000);
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }

  getScenarioIcon(scenarioId: string): string {
    const icons: { [key: string]: string } = {
      'job-interview': 'briefcase',
      'restaurant': 'coffee',
      'business-meeting': 'users',
      'casual-chat': 'message-circle',
      'travel': 'map-pin'
    };
    return icons[scenarioId] || 'message-square';
  }
}