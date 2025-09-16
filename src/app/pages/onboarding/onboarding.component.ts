// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { FeatherModule } from 'angular-feather';

// // Import UI Components
// //import { ButtonComponent } from '../../components/ui/button/button.component';
// import { CardComponent } from '../../components/ui/card/card.component';
// import { CardContentComponent } from '../../components/ui/card/card-content/card-content.component';
// import { ProgressBarComponent } from '../progess-bar/progess-bar.component';

// @Component({
//   selector: 'app-onboarding-page',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterModule,
//     FormsModule,
//     FeatherModule,
//    // ButtonComponent,
//     CardComponent,
//     CardContentComponent,
//     ProgressBarComponent
//   ],
//   templateUrl: './onboarding.component.html',
//   styleUrls: ['./onboarding.component.css']
// })
// export class OnboardingPageComponent {
//   step = 1;
//   isRecording = false;
//   recordingComplete = false;
//   selectedLanguage: string | null = null;
//   otherLanguage = '';
//   selectedDialect: string | null = null;
//   dialectInput = '';
//   proficiencyLevel: string | null = null;
//   goals: string[] = [];
//   processingAudio = false;
//   audioResults: { pronunciation: number; fluency: number; grammar: number; overall: number } | null = null;
//   userInfo = { fullName: '', email: '', phone: '', profession: '' };

//   professions = ['Software Engineer', 'Business Analyst', 'Project Manager', 'Marketing Professional', 'Sales Executive', 'Financial Analyst', 'Healthcare Professional', 'Legal Professional', 'Human Resources', 'Operations Manager', 'Research Scientist', 'Education Professional', 'Other'];
//   dialects = [{ id: 'east-asian', label: 'East Asian', needsInput: true }, { id: 'south-asian', label: 'South Asian', needsInput: true }, { id: 'african', label: 'African', needsInput: true }, { id: 'spanish-hispanic', label: 'Spanish/Hispanic', needsInput: true }, { id: 'european', label: 'European', needsInput: true }, { id: 'arab', label: 'Arab', needsInput: true }];
//   languages = [{ code: 'en', name: 'English' }, { code: 'es', name: 'Spanish' }, { code: 'fr', name: 'French' }, { code: 'zh', name: 'Chinese (Mandarin)' }, { code: 'ar', name: 'Arabic' }, { code: 'ru', name: 'Russian' }, { code: 'pt', name: 'Portuguese' }, { code: 'ja', name: 'Japanese' }, { code: 'de', name: 'German' }, { code: 'hi', name: 'Hindi' }, { code: 'ko', name: 'Korean' }, { code: 'other', name: 'Other' }];
//   proficiencyLevels = [{ id: 'beginner', label: 'Beginner', description: 'I know a few words and phrases' }, { id: 'elementary', label: 'Elementary', description: 'I can communicate in simple situations' }, { id: 'intermediate', label: 'Intermediate', description: 'I can have conversations on familiar topics' }, { id: 'advanced', label: 'Advanced', description: 'I can express myself fluently with occasional errors' }, { id: 'proficient', label: 'Proficient', description: 'I can use English effectively in most contexts' }];
//   goalOptions = [{ id: 'business', label: 'Business Communication' }, { id: 'interviews', label: 'Job Interviews' }, { id: 'presentations', label: 'Presentations & Public Speaking' }, { id: 'networking', label: 'Professional Networking' }, { id: 'meetings', label: 'Meetings & Discussions' }, { id: 'writing', label: 'Business Writing' }, { id: 'cultural', label: 'Cultural Understanding' }, { id: 'accent', label: 'Accent Reduction' }];

//   constructor(private router: Router) {}

//   nextStep(): void {
//     if (this.step === 6) {
//       this.router.navigate(['/dashboard']);
//     } else {
//       this.step++;
//     }
//   }

//   handleDialectSelect(dialectId: string): void {
//     this.selectedDialect = dialectId;
//     this.dialectInput = '';
//   }

//   handleLanguageSelect(code: string): void {
//     this.selectedLanguage = code;
//     if (code !== 'other') {
//       this.otherLanguage = '';
//     }
//   }

//   toggleGoal(goalId: string): void {
//     if (this.goals.includes(goalId)) {
//       this.goals = this.goals.filter(g => g !== goalId);
//     } else {
//       this.goals = [...this.goals, goalId];
//     }
//   }

//   startRecording(): void {
//     this.isRecording = true;
//     setTimeout(() => this.stopRecording(), 10000);
//   }

//   stopRecording(): void {
//     this.isRecording = false;
//     this.recordingComplete = true;
//   }

//   playRecording(): void {
//     console.log('Playing recording...');
//   }

//   analyzeRecording(): void {
//     this.processingAudio = true;
//     setTimeout(() => {
//       this.processingAudio = false;
//       this.audioResults = { pronunciation: 68, fluency: 72, grammar: 81, overall: 74 };
//     }, 3000);
//   }

//   get isStep2Disabled(): boolean {
//     const selected = this.dialects.find(d => d.id === this.selectedDialect);
//     return !this.selectedDialect || (!!selected?.needsInput && !this.dialectInput);
//   }
// }
import { Component, inject } from '@angular/core'; // Import inject
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';

// 1. Import only the necessary Firebase types and functions
import { Auth } from '@angular/fire/auth';
import { doc, setDoc, Firestore } from '@angular/fire/firestore';

// Import UI Components
import { CardComponent } from '../../components/ui/card/card.component';
import { CardContentComponent } from '../../components/ui/card/card-content/card-content.component';
import { ProgressBarComponent } from '../progess-bar/progess-bar.component';

@Component({
  selector: 'app-onboarding-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FeatherModule,
    CardComponent,
    CardContentComponent,
    ProgressBarComponent
  ],
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingPageComponent {
  // --- All your existing properties remain the same ---
  step = 1;
  isRecording = false;
  recordingComplete = false;
  selectedLanguage: string | null = null;
  otherLanguage = '';
  selectedDialect: string | null = null;
  dialectInput = '';
  proficiencyLevel: string | null = null;
  goals: string[] = [];
  processingAudio = false;
  audioResults: { pronunciation: number; fluency: number; grammar: number; overall: number } | null = null;
  userInfo = { fullName: '', email: '', phone: '', profession: '' };
  isSaving = false;

  professions = ['Software Engineer', 'Business Analyst', 'Project Manager', 'Marketing Professional', 'Sales Executive', 'Financial Analyst', 'Healthcare Professional', 'Legal Professional', 'Human Resources', 'Operations Manager', 'Research Scientist', 'Education Professional', 'Other'];
  dialects = [{ id: 'east-asian', label: 'East Asian', needsInput: true }, { id: 'south-asian', label: 'South Asian', needsInput: true }, { id: 'african', label: 'African', needsInput: true }, { id: 'spanish-hispanic', label: 'Spanish/Hispanic', needsInput: true }, { id: 'european', label: 'European', needsInput: true }, { id: 'arab', label: 'Arab', needsInput: true }];
  languages = [{ code: 'en', name: 'English' }, { code: 'es', name: 'Spanish' }, { code: 'fr', name: 'French' }, { code: 'zh', name: 'Chinese (Mandarin)' }, { code: 'ar', name: 'Arabic' }, { code: 'ru', name: 'Russian' }, { code: 'pt', name: 'Portuguese' }, { code: 'ja', name: 'Japanese' }, { code: 'de', name: 'German' }, { code: 'hi', name: 'Hindi' }, { code: 'ko', name: 'Korean' }, { code: 'other', name: 'Other' }];
  proficiencyLevels = [{ id: 'beginner', label: 'Beginner', description: 'I know a few words and phrases' }, { id: 'elementary', label: 'Elementary', description: 'I can communicate in simple situations' }, { id: 'intermediate', label: 'Intermediate', description: 'I can have conversations on familiar topics' }, { id: 'advanced', label: 'Advanced', description: 'I can express myself fluently with occasional errors' }, { id: 'proficient', label: 'Proficient', description: 'I can use English effectively in most contexts' }];
  goalOptions = [{ id: 'business', label: 'Business Communication' }, { id: 'interviews', label: 'Job Interviews' }, { id: 'presentations', label: 'Presentations & Public Speaking' }, { id: 'networking', label: 'Professional Networking' }, { id: 'meetings', label: 'Meetings & Discussions' }, { id: 'writing', label: 'Business Writing' }, { id: 'cultural', label: 'Cultural Understanding' }, { id: 'accent', label: 'Accent Reduction' }];

  // --- 2. Inject Firestore and Auth directly ---
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);

  constructor(private router: Router) {
    // The constructor is now much cleaner!
  }

  // --- All your other methods remain the same ---
  nextStep(): void {
    if (this.step < 6) {
      this.step++;
    }
  }

  handleDialectSelect(dialectId: string): void {
    this.selectedDialect = dialectId;
    this.dialectInput = '';
  }

  handleLanguageSelect(code: string): void {
    this.selectedLanguage = code;
    if (code !== 'other') {
      this.otherLanguage = '';
    }
  }

  toggleGoal(goalId: string): void {
    if (this.goals.includes(goalId)) {
      this.goals = this.goals.filter(g => g !== goalId);
    } else {
      this.goals = [...this.goals, goalId];
    }
  }

  startRecording(): void {
    this.isRecording = true;
    setTimeout(() => this.stopRecording(), 10000);
  }

  stopRecording(): void {
    this.isRecording = false;
    this.recordingComplete = true;
  }

  playRecording(): void {
    console.log('Playing recording...');
  }

  analyzeRecording(): void {
    this.processingAudio = true;
    setTimeout(() => {
      this.processingAudio = false;
      this.audioResults = { pronunciation: 68, fluency: 72, grammar: 81, overall: 74 };
    }, 3000);
  }

  get isStep2Disabled(): boolean {
    const selected = this.dialects.find(d => d.id === this.selectedDialect);
    return !this.selectedDialect || (!!selected?.needsInput && !this.dialectInput);
  }

  async completeOnboarding(): Promise<void> {
    if (this.isSaving) return;

    // This method works exactly as before, using the injected this.auth and this.firestore
    const user = this.auth.currentUser;
    if (!user) {
      console.error("No user is currently signed in!");
      this.router.navigate(['/login']);
      return;
    }

    this.isSaving = true;

    const onboardingData = {
      fullName: this.userInfo.fullName,
      profession: this.userInfo.profession,
      phone: this.userInfo.phone,
      accent: {
        dialect: this.selectedDialect,
        specifics: this.dialectInput
      },
      nativeLanguage: this.selectedLanguage === 'other' ? this.otherLanguage : this.selectedLanguage,
      proficiencyLevel: this.proficiencyLevel,
      learningGoals: this.goals,
      baselineAssessment: this.audioResults,
      onboardingCompleted: true,
      onboardingCompletedAt: new Date()
    };

    try {
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, onboardingData, { merge: true });
      console.log("Onboarding data saved successfully!");
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error("Error saving onboarding data: ", error);
      alert("There was an error saving your profile. Please try again.");
    } finally {
      this.isSaving = false;
    }
  }
}

