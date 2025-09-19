import { Component, OnInit, inject, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';

// ✅ Import Firebase services
import { Auth, authState, User as FirebaseUser } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

import { User } from '../../../core/models/type'; // Your application's User interface
import { AvatarComponent } from '../../ui/avatar/avatar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FeatherModule,
    AvatarComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidebarToggled = new EventEmitter<void>();

  // ✅ Inject Firebase Auth and Firestore directly
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  
  // This will hold the complete user profile from Firestore and Auth
  currentUser: User | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ✅ Listen for real-time authentication state changes
    authState(this.auth).subscribe(async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // User is logged in, fetch their profile from Firestore
        const userDocRef = doc(this.firestore, `users/${firebaseUser.uid}`);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          // Combine auth data and Firestore data into one object
          const profileData = docSnap.data();
          this.currentUser = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'User',
            email: firebaseUser.email || '',
            avatar: firebaseUser.photoURL || '',
            // Spread the rest of the profile data from Firestore
            ...profileData
          } as User;
        } else {
          // Handle case where user exists in Auth but not in Firestore
          console.error("User profile not found in Firestore.");
          this.currentUser = null;
        }
      } else {
        // User is logged out
        this.currentUser = null;
      }
    });
  }

  onToggleSidebar(): void {
    this.sidebarToggled.emit();
  }

  gotouserprofile(): void {
    this.router.navigate(['/userprofile']);
  }
}