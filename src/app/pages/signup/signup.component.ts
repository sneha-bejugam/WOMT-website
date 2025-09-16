// import { Component , inject} from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { FeatherModule } from 'angular-feather';

// // Import all the UI components this page uses
// import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
// import { Firestore, doc, setDoc } from '@angular/fire/firestore';

// import { ButtonComponent } from '../../components/ui/button/button.component';

// @Component({
//   selector: 'app-signup-page',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterModule,
//     FormsModule,
//     FeatherModule,
//     ButtonComponent
//   ],
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupPageComponent {
//   email = '';
//   password = '';
//   name = '';
//   isLoading = false;
//   errorMessage: string | null = null; // To display errors to the user

//   // Inject Firebase services and Angular's Router
//   private auth: Auth = inject(Auth);
//   private firestore: Firestore = inject(Firestore);
//   private router: Router = inject(Router);

//   // Method to handle form submission
//   async handleSubmit(): Promise<void> {
//     if (!this.name || !this.email || !this.password) {
//       this.errorMessage = "Please fill in all fields.";
//       return;
//     }

//     this.isLoading = true;
//     this.errorMessage = null;

//     try {
//       // 1. Create the user in Firebase Auth
//       const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
//       const user = userCredential.user;

//       // 2. Update the user's profile with their name
//       await updateProfile(user, { displayName: this.name });

//       // 3. Create a document in the 'users' collection in Firestore
//       const userDocRef = doc(this.firestore, `users/${user.uid}`);
//       await setDoc(userDocRef, {
//         uid: user.uid,
//         email: user.email,
//         displayName: this.name,
//         createdAt: new Date() // Good practice to store a timestamp
//       });

//       // 4. Navigate to the onboarding page on success
//       this.router.navigate(['/onboarding']);

//     } catch (error: any) {
//       // Handle different Firebase auth errors
//       switch (error.code) {
//         case 'auth/email-already-in-use':
//           this.errorMessage = 'This email address is already in use.';
//           break;
//         case 'auth/weak-password':
//           this.errorMessage = 'The password is too weak. It must be at least 6 characters long.';
//           break;
//         case 'auth/invalid-email':
//           this.errorMessage = 'The email address is not valid.';
//           break;
//         default:
//           this.errorMessage = 'An unexpected error occurred. Please try again.';
//           break;
//       }
//       console.error('Signup failed:', error);
//     } finally {
//       this.isLoading = false;
//     }
//   }
// }


import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';


import { Auth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

import { ButtonComponent } from '../../components/ui/button/button.component';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FeatherModule,
    ButtonComponent
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupPageComponent {
  email = '';
  password = '';
  name = '';
  terms = false;
  isLoading = false;
  errorMessage: string | null = null;

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private router: Router = inject(Router);


  async handleSubmit(): Promise<void> {
    if (!this.name || !this.email || !this.password || !this.terms) {
      this.errorMessage = "Please fill in all fields and agree to the terms.";
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    try {
      
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      const user = userCredential.user;

      
      await updateProfile(user, { displayName: this.name });

    
      await this.createUserDocument(user);

      this.router.navigate(['/onboarding']);

    } catch (error: any) {
      this.handleAuthError(error);
    } finally {
      this.isLoading = false;
    }
  }

  
  async signInWithGoogle(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = null;
    const provider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(this.auth, provider);
      const user = userCredential.user;
      
      
      await this.createUserDocument(user);

      this.router.navigate(['/onboarding']);

    } catch (error: any) {
      this.handleAuthError(error);
    } finally {
      this.isLoading = false;
    }
  }


  private async createUserDocument(user: User): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: new Date()
    }, { merge: true }); 
  }

  
  private handleAuthError(error: any): void {
    switch (error.code) {
      case 'auth/email-already-in-use':
        this.errorMessage = 'This email address is already in use.';
        break;
      case 'auth/weak-password':
        this.errorMessage = 'The password is too weak. It must be at least 6 characters long.';
        break;
      case 'auth/invalid-email':
        this.errorMessage = 'The email address is not valid.';
        break;
      case 'auth/popup-closed-by-user':
        this.errorMessage = 'Sign-in process was cancelled.';
        break;
      default:
        this.errorMessage = 'An unexpected error occurred. Please try again.';
        break;
    }
    console.error('Authentication failed:', error);
  }
}
