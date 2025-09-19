import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';

// Import Firebase services
import { Auth, authState, User as FirebaseUser } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

import { User } from '../../../core/models/type';
import { CardComponent } from '../../../components/ui/card/card.component';
import { CardContentComponent } from '../../../components/ui/card/card-content/card-content.component';
import { AvatarComponent } from '../../../components/ui/avatar/avatar.component';
import { ProgressBarComponent } from '../../../pages/progess-bar/progess-bar.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    FeatherModule,
    CardComponent,
    CardContentComponent,
    AvatarComponent,
    ProgressBarComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);

  currentUser: User | null = null;
  nextLevelXP: number = 0;
  xpProgress: number = 0;

  constructor() {}

  ngOnInit(): void {
    authState(this.auth).subscribe(async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userDocRef = doc(this.firestore, `users/${firebaseUser.uid}`);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const profileData = docSnap.data();
          this.currentUser = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'User',
            avatar: firebaseUser.photoURL || '',
            ...profileData,
            // ✅ SET DEFAULTS: Use ?? to provide a default value if the property is null or undefined
            level: profileData['level'] ?? 1,
            points: profileData['points'] ?? 0,
          } as User;
          
          this.calculateXP();
        }
      } else {
        this.currentUser = null;
      }
    });
  }

  /**
   * ✅ MODIFIED: Calculates the user's progress towards the next level
   * based on a 3000 XP per level system.
   */
  private calculateXP(): void {
    if (!this.currentUser) return;

    const xpPerLevel = 3000;
    const currentLevelBaseXP = (this.currentUser.level - 1) * xpPerLevel;
    
    this.nextLevelXP = this.currentUser.level * xpPerLevel;
    
    const progressIntoCurrentLevel = this.currentUser.points - currentLevelBaseXP;
    const requiredForNextLevel = this.nextLevelXP - currentLevelBaseXP;
    
    // Ensure progress is not negative or over 100%
    this.xpProgress = Math.max(0, Math.min(100, (progressIntoCurrentLevel / requiredForNextLevel) * 100));
  }
}