import { Routes } from '@angular/router';

// Import all your page components
import { HomePageComponent } from './pages/home/home.component';
import { SolutionsPageComponent } from './pages/solutions/solutions.component';
import { CollaborationPageComponent } from './pages/collaoration/collaoration.component';
import { AboutPageComponent } from './pages/about/about.component';
import { PricingPageComponent } from './pages/pricing/pricing.component';
import { LoginPageComponent } from './pages/login/login.component';
import { SignupPageComponent } from './pages/signup/signup.component';
import { OnboardingPageComponent } from './pages/onboarding/onboarding.component';
import { LessonsPageComponent } from './pages/lessons/lessons.component';
import { LessonPageComponent } from './pages/lesson/lesson.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { FluentFrontierPageComponent } from './pages/fluent-frontier/fluent-frontier.component';
import { LayoutComponent } from './components/layout/layout/layout.component'; 
import { FooterComponent } from './components/layout/footer/footer.component';
import { StudentsComponent } from './pages/student/student.component';
import { ProgressBarComponent } from './pages/progess-bar/progess-bar.component';
import { ProgressStatsComponent } from './features/dashboard/progess-stats/progess-stats.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UserProfilePageComponent } from './pages/userprofile/userprofile.component';
import { LanguageTranslatorComponent } from './pages/translate/translate.component';
//import {ChatPracticeComponent} from './pages/chat-practice/chat-practice.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';
import { FeaturesComponent} from './pages/features/features.component';

export const routes: Routes = [
  // Public routes that don't use the main layout
  { path: '', component: HomePageComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'solutions', component: SolutionsPageComponent },
  { path: 'collaboration', component: CollaborationPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'pricing', component: PricingPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'onboarding', component: OnboardingPageComponent },
  { path: 'student', component: StudentsComponent },
  {path : 'privacypolicy', component: PrivacyPolicyComponent},
  {path: 'termsofservices', component: TermsOfServiceComponent},
  {path: 'features',component:FeaturesComponent},
  


  // Protected routes that are nested within the main LayoutComponent
  // In a real app, you would add a guard here: canActivate: [AuthGuard]
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'fluent-frontier', component: FluentFrontierPageComponent },
      { path: 'lessons', component: LessonsPageComponent },
      { path: 'lessons/:lessonId', component: LessonPageComponent },
      { path: 'progressbar', component: ProgressStatsComponent },
      { path: 'settings', component : SettingsComponent},
      { path: 'userprofile', component: UserProfilePageComponent },
      { path: 'translate', component: LanguageTranslatorComponent },
     // { path: 'chat' , component: ChatPracticeComponent }
    ]
  },
  

  // Wildcard route for a 404 page
  { path: '**', redirectTo: '/home' }
];