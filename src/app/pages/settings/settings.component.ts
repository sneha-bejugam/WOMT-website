import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';

// --- Firebase Imports ---
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
// Import setDoc instead of updateDoc
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

// --- UI Component Imports ---
import { CardComponent } from '../../components/ui/card/card.component';
import { CardContentComponent } from '../../components/ui/card/card-content/card-content.component';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FeatherModule,
    CardComponent,
    CardContentComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  // --- State Management ---
  isLoading = true;
  errorMessage: string | null = null;
  private userId: string | null = null;

  // --- Form Data Properties ---
  userInfo = { name: '', email: '', profession: '' };
  selectedDialect: string | null = null;
  dialectInput = '';
  selectedLanguage: string | null = null;
  otherLanguage = '';
  proficiencyLevel: string | null = null;
  goals: string[] = [];

  // --- Static Data for Options ---
  professions = ['Software Engineer', 'Business Analyst', 'Project Manager', 'Marketing Professional', 'Sales Executive', 'Financial Analyst', 'Healthcare Professional', 'Legal Professional', 'Human Resources', 'Operations Manager', 'Research Scientist', 'Education Professional', 'Other'];
  dialects = [{ id: 'east-asian', label: 'East Asian', needsInput: true }, { id: 'south-asian', label: 'South Asian', needsInput: true }, { id: 'african', label: 'African', needsInput: true }, { id: 'spanish-hispanic', label: 'Spanish/Hispanic', needsInput: true }, { id: 'european', label: 'European', needsInput: true }, { id: 'arab', label: 'Arab', needsInput: true }];
  languages = [{ code: 'en', name: 'English' }, { code: 'es', name: 'Spanish' }, { code: 'fr', name: 'French' }, { code: 'zh', name: 'Chinese (Mandarin)' }, { code: 'ar', name: 'Arabic' }, { code: 'ru', name: 'Russian' }, { code: 'pt', name: 'Portuguese' }, { code: 'ja', name: 'Japanese' }, { code: 'de', name: 'German' }, { code: 'hi', name: 'Hindi' }, { code: 'ko', name: 'Korean' }, { code: 'other', name: 'Other' }];
  proficiencyLevels = [{ id: 'beginner', label: 'Beginner', description: 'I know a few words and phrases' }, { id: 'elementary', label: 'Elementary', description: 'I can communicate in simple situations' }, { id: 'intermediate', label: 'Intermediate', description: 'I can have conversations on familiar topics' }, { id: 'advanced', label: 'Advanced', description: 'I can express myself fluently with occasional errors' }, { id: 'proficient', label: 'Proficient', description: 'I can use English effectively in most contexts' }];
  goalOptions = [{ id: 'business', label: 'Business Communication' }, { id: 'interviews', label: 'Job Interviews' }, { id: 'presentations', label: 'Presentations & Public Speaking' }, { id: 'networking', label: 'Professional Networking' }, { id: 'meetings', label: 'Meetings & Discussions' }, { id: 'writing', label: 'Business Writing' }, { id: 'cultural', label: 'Cultural Understanding' }, { id: 'accent', label: 'Accent Reduction' }];

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userId = user.uid;
        this.loadUserProfile();
      } else {
        this.errorMessage = "You must be logged in to view settings.";
        this.isLoading = false;
        this.router.navigate(['/login']);
      }
    });
  }

  async loadUserProfile(): Promise<void> {
    if (!this.userId) return;

    try {
      const userDocRef = doc(this.firestore, `users/${this.userId}`);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        this.userInfo = {
          name: data['fullName'] || '',
          email: data['email'] || '',
          profession: data['profession'] || '',
        };
        this.selectedDialect = data['accent']?.dialect || null;
        this.dialectInput = data['accent']?.specifics || '';
        this.selectedLanguage = data['nativeLanguage'] || null;
        this.otherLanguage = data['nativeLanguageOther'] || '';
        this.proficiencyLevel = data['proficiencyLevel'] || null;
        this.goals = data['learningGoals'] || [];
      } else {
        this.errorMessage = "No profile data found. Please complete the onboarding process.";
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
      this.errorMessage = "Failed to load your profile data.";
    } finally {
      this.isLoading = false;
    }
  }

  // --- Reused functions from Onboarding ---
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
    this.goals = this.goals.includes(goalId)
      ? this.goals.filter(g => g !== goalId)
      : [...this.goals, goalId];
  }

  // --- Save Functions for Each Section (Now using setDoc) ---
  async saveUserInfo(): Promise<void> {
    if (!this.userId) return;
    const userDocRef = doc(this.firestore, `users/${this.userId}`);
    try {
      await setDoc(userDocRef, {
        fullName: this.userInfo.name,
        email: this.userInfo.email,
        profession: this.userInfo.profession,
      }, { merge: true }); // Use merge: true to update fields without overwriting the whole doc
      alert('User information saved!');
    } catch (error) {
      alert('Failed to save user information.');
      console.error("Firestore save error:", error);
    }
  }

  async saveAccentInfo(): Promise<void> {
    if (!this.userId) return;
    const userDocRef = doc(this.firestore, `users/${this.userId}`);
    try {
      await setDoc(userDocRef, {
        accent: {
          dialect: this.selectedDialect,
          specifics: this.dialectInput,
        },
      }, { merge: true });
      alert('Accent information saved!');
    } catch (error) {
      alert('Failed to save accent information.');
      console.error("Firestore save error:", error);
    }
  }

  async saveLanguageInfo(): Promise<void> {
    if (!this.userId) return;
    const userDocRef = doc(this.firestore, `users/${this.userId}`);
    try {
      await setDoc(userDocRef, {
        nativeLanguage: this.selectedLanguage,
        nativeLanguageOther: this.otherLanguage,
      }, { merge: true });
      alert('Language information saved!');
    } catch (error) {
      alert('Failed to save language information.');
      console.error("Firestore save error:", error);
    }
  }

  async saveProficiencyInfo(): Promise<void> {
    if (!this.userId) return;
    const userDocRef = doc(this.firestore, `users/${this.userId}`);
    try {
      await setDoc(userDocRef, {
        proficiencyLevel: this.proficiencyLevel,
      }, { merge: true });
      alert('Proficiency level saved!');
    } catch (error) {
      alert('Failed to save proficiency level.');
      console.error("Firestore save error:", error);
    }
  }

  async saveGoals(): Promise<void> {
    if (!this.userId) return;
    const userDocRef = doc(this.firestore, `users/${this.userId}`);
    try {
      await setDoc(userDocRef, {
        learningGoals: this.goals,
      }, { merge: true });
      alert('Learning goals saved!');
    } catch (error) {
      alert('Failed to save learning goals.');
      console.error("Firestore save error:", error);
    }
  }

  get isAccentSaveDisabled(): boolean {
    const selected = this.dialects.find(d => d.id === this.selectedDialect);
    return !this.selectedDialect || (!!selected?.needsInput && !this.dialectInput);
  }
}

