import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { DataService } from '../../core/services/data.service';
import { LessonModule } from '../../core/models/type';

// Import all the components that make up this page
import { UserProfileComponent } from '../../features/dashboard/user-profile/user-profile.component';
import { ProgressStatsComponent } from '../../features/dashboard/progess-stats/progess-stats.component';
import { RecentLessonsComponent } from '../../features/dashboard/recent-lessons/recent-lessons.component';
import { LeaderboardComponent } from '../../features/dashboard/leaderboard/leaderboard.component';
import { AchievementBadgesComponent } from '../../features/dashboard/achievement-badges/achievement-badges.component';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { CardComponent } from '../../components/ui/card/card.component';
import { CardHeaderComponent } from '../../components/ui/card/card-header/card-header.component';
import { CardContentComponent } from '../../components/ui/card/card-content/card-content.component';
import { CardTitleComponent } from '../../components/ui/card/card-title/card-title.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FeatherModule,
    UserProfileComponent,
    ProgressStatsComponent,
    RecentLessonsComponent,
    LeaderboardComponent,
    AchievementBadgesComponent,
    ButtonComponent,
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardTitleComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  featuredLessons: LessonModule[] = [];

  constructor(private dataService: DataService,private router: Router) {}

  ngOnInit(): void {
    // Get the first 3 lesson modules for the featured lessons section
    this.featuredLessons = this.dataService.getLessonModules().slice(0, 3);
  }

  

  goToLessonsPage(): void {
    // You could add other logic here before navigating
    console.log('Navigating to signup page...');
    this.router.navigate(['/lessons']);
  }
}
