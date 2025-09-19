import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';

// Import Firebase services and functions
import { Auth } from '@angular/fire/auth';
import { doc, getDoc, Firestore } from '@angular/fire/firestore';

// Import UI Components
import { CardComponent } from '../../components/ui/card/card.component';
import { CardContentComponent } from '../../components/ui/card/card-content/card-content.component';
import { BadgeComponent } from '../../components/ui/badge/badge.component';
import { ProgressBarComponent } from '../progess-bar/progess-bar.component';

// Define an interface for the user's profile data
interface UserProfile {
  fullName: string;
  profession: string;
  email?: string;
  accent: {
    dialect: string;
    specifics: string;
  };
  nativeLanguage: string;
  proficiencyLevel: string;
  learningGoals: string[];
  // ✅ ADD THIS PROPERTY TO HOLD PROGRESS DATA
  progress?: {
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    fluency: number;
  };
  baselineAssessment?: {
    pronunciation: number;
    fluency: number;
    grammar: number;
    overall: number;
  };
}

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    FeatherModule,
    CardComponent,
    CardContentComponent,
    ProgressBarComponent,
    BadgeComponent
  ],
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserProfilePageComponent implements OnInit {
  // Inject Firebase services
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);

  // Component state properties
  userProfile: UserProfile | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  async ngOnInit(): Promise<void> {
    const user = this.auth.currentUser;

    if (!user) {
      this.errorMessage = "You must be logged in to view your profile.";
      this.isLoading = false;
      return;
    }

    try {
      // Create a reference to the user's document in the 'users' collection
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        // If the document exists, cast its data to our UserProfile interface
        this.userProfile = docSnap.data() as UserProfile;
        // Add the user's email from the auth object for display
        this.userProfile.email = user.email || 'No email provided';
      } else {
        // Handle the case where the user has authenticated but has no profile data
        this.errorMessage = "Could not find your profile data. Please complete the onboarding process.";
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      this.errorMessage = "There was an error loading your profile. Please try again later.";
    } finally {
      this.isLoading = false;
    }
  }

  // Helper to format proficiency level for display
  formatProficiency(levelId: string | undefined): string {
    if (!levelId) return 'Not set';
    return levelId.charAt(0).toUpperCase() + levelId.slice(1);
  }
}